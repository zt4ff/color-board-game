import http from "http";
import { io as clientIO, Socket as ClientSocket } from "socket.io-client";
import { socketListener } from "../../game_websocket";
import { Room } from "../../game_websocket/room";

let httpServer: http.Server;
let clientSocket: ClientSocket;

const PORT = process.env.DEVELOPMENT_SERVER_PORT || 4400;

describe("Socket test", () => {
  beforeAll(async () => {
    const room = new Room();
    httpServer = http.createServer();

    await socketListener(httpServer, room);

    await httpServer.listen(4400);
    clientSocket = await clientIO(`http://localhost:${PORT}`);
  });

  afterAll((done) => {
    httpServer.close(async (err) => {
      if (err) {
        process.exit(1);
      }

      await socketListener.close();
      done();
    });
  });

  test("client is connected to server", (done) => {
    clientSocket.on("connect", () => {
      clientSocket.on("board", (board) => {
        expect(board.length).toBe(20);
        done();
      });
    });
  });
});
