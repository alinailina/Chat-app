const express = require("express");
const socketio = require("socket.io");
const http = require("http");

// Get user helper functions
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

// Speficy port
const PORT = process.env.PORT || 5000;

// Bring in router
const router = require("./router");

// Init app
const app = express();
// Create server, pass app
const server = http.createServer(app);
// Create instance of socket.io, pass server
const io = socketio(server);

io.on("connect", (socket) => {
  console.log("New connection established!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    // const error = true;
    // if (error) {
    //   callback({ error: "error" });
    // }
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    // If no errors
    // Send admin generated messages:
    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to ${room}!`,
    });
    // ---> sends welcome message to a new user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    // ---> informs all other users a new user has joined

    socket.join(user.room);

    callback();
  });

  // Send user generated messages
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} left`,
      });
    }
  });
});

// Call router as middleware
app.use(router);

// Run server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
