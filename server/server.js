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
    io.on("connection", (socket) => {
      // related io code
      console.log("SERVER MESSAGE: CLIENT CONNECTED");
      socket.on('disconnect', () => {
        console.log('CLIENT DISCONNECTED');
      });

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    });
  });
};

startServer();
