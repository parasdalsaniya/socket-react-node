const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {

  socket.on("send_message", (data) => {
    // socket.broadcast.emit("receive_message", data)
    socket.to(data.room).emit("receive_message", data)
  })


})
  

let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

server.listen(8000, () => {
    console.log("App run on 8000");
})

// #####################################
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const port = 8000;
// const app = express();
// app.use("/", (res, req) => {
//     res.send("hello")
// });

// const io = socketIo(app); // < Interesting!

// const getApiAndEmit = "TODO";
// app.listen(8000, () => {
//     console.log("App run on 8000");
// })
// const server = http.createServer(app);
