// CURRENT
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const cors = require("cors");

const socketio = require("socket.io"); // SOCKET IO

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  // Serve up static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    const http = app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
    });

    // Attach socket.io to the server instance          // SOCKET IO CONFIG
    const io = socketio(http, {
      pingTimeout: 60000,
      cors: {
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    //initializing the socket io connection
    let socketId;
    io.on("connection", (socket) => {
      console.log("SOCKET SERVER IS CONNECTED: SERVER END");
      //for a new user joining the room
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });
    
      socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

       //user sending message
      socket.on("chat", (data, room) => {
        //gets the room user and the message sent
        console.log("DATA MESSAGE RECIEVED FROM CLIENT: ", data);
        io.to(room).emit("message", {
          data,
        });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

    });
  });
};

startServer();
