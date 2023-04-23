const express = require("express");
const { Server } = require("socket.io");

const cors = require("cors");
const http = require("http");

const router = require("./routes.js");

const app = express();
const server = app.listen(5001, () =>
  console.log("Server started on port 5001")
);
const socket = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:3000", // client port
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(cors(corsOptions));

const io = new Server(socket, {
  cors: {
    origin: "*",
    credentials: true,
  },
}).listen(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});
