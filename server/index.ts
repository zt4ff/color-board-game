import express from "express";
import http from "http";
import path from "path";
import { socketListener } from "./game_websocket";
import { Room } from "./game_websocket/room";
import { router } from "./router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);

const room = new Room();

socketListener(server, room);

app.use(router);

server.on("error", () => {
  console.log("error creating server");
});

server.listen(PORT, () => {
  console.log("server connected successfully");
});
