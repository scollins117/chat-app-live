// CURRENT
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const cors = require("cors");
const {
  get_Current_User,
  user_Disconnect,
  join_User,
} = require("./socketLogistics");

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
      // socket.on("joinRoom", ({ id, username, roomname }) => {
      //   // PROVIDE USERNAME AND CHAT ID
      //   //* create user
      //   const p_user = join_User(id, username, roomname);
      //   console.log("id", id, "p_user.room", p_user.room);
      //   socket.join(p_user.room);
      //   socketId = id;
      // });

      //user sending message
      socket.on("chat", (data, room) => {
        //gets the room user and the message sent
        // const p_user = get_Current_User(socketId);
        // console.log("chat p_user: ", p_user):
        console.log("DATA MESSAGE RECIEVED FROM CLIENT: ", data);
        // console.log("id 2", socketId, "p_user.room 2", p_user);
        io.to(room).emit("message", {
          data,
        });
      });

      // //when the user exits the room
      // socket.on("leaveRoom", () => {
      //   console.log("USER DISCONNECTED");
      //   // const p_user = get_Current_User(socketId);
      //   socket.leave(room);
      // });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

    });

    

    //     io.on("connection", (socket) => {
    //       console.log("Connected to socket.io");
    //       socket.on("setup", (userId) => {
    //         socket.join(userId);
    //         console.log("SERVER SIDE SOCKET SETUP INIT with id", userId);
    //         socket.emit("connected", userId);
    //       });

    //       socket.on("join chat", (room) => {
    //         socket.join(room);
    //         console.log("User Joined Room: " + room);
    //       });

    //       socket.on("new message", (newMessageRecieved) => {
    //         console.log("newMessageReceived", newMessageRecieved);
    //         var { addMessage } = newMessageRecieved; // get chat data from message
    //         console.log("destruct from message SENDER ID:", addMessage.chat);

    //         if (!addMessage.chat.users)
    //           return console.log("addMessage.chat.users not defined"); //if no users

    //         let chat = addMessage.chat;
    //         console.log("user array", chat);

    //         // chat.users.forEach((user) => {
    //         //   // for each user in the chat, chat.users._id
    //           // if (user._id == addMessage.sender._id) return;

    //           socket.in(chat._id).emit("message recieved", addMessage); //
    //           console.log("MESSAGES EMITTED BACK TO USER", addMessage);
    //           console.log("room ID OF MESSAGE/ USER ID", chat._id);
    //           console.log("MESSAGE RECEIVED ID", addMessage.sender._id);
    //         // });
    //       });

    //       socket.off("setup", () => {
    //         console.log("USER DISCONNECTED");
    //         socket.leave(userData._id);
    //       });
    //     });
  });
};

startServer();
