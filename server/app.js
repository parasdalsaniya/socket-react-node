const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");
const cors = require("cors");
const { default: axios } = require("axios");

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

  socket.on("join_room", (data) => {
    console.log('data of room', data)
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log("data of send msg", data);
    // socket.broadcast.emit("receive_message", data)
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("set_orerId", (data) => {
    console.log("data of set_orerId", data);
    socket.join(data)
  })

  socket.on("send_status", (data) => {
    console.log('data of send_status', data)
    
    socket.to(data.orderId).emit("receive_status", 'updated status')

  })

})


server.listen(8001, () => {
  console.log("App run on 8001");
})

// let interval;

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

// const getApiAndEmit = socket => {
//     const response = new Date();
//     socket.emit("FromAPI", response);
// };



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
