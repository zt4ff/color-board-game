import http from "http";
import { io as clientIO, Socket as ClientSocket } from "socket.io-client";
import { socketListener } from "../../game_websocket";
import { Room } from "../../game_websocket/room";

let httpServer: http.Server;
let clientSocket: ClientSocket;
let room: Room;
const PORT = process.env.DEVELOPMENT_SERVER_PORT || 4400;

describe("Socket test", () => {
  beforeAll(() => {
    room = new Room();
    httpServer = http.createServer();

    socketListener(httpServer, room);

    httpServer.listen(4400);
    clientSocket = clientIO(`http://localhost:${PORT}`);
  });

  afterAll(() => {
    httpServer.close((err) => {
      if (err) {
        process.exit(0);
      }
      socketListener.close();
    });
  });

  test("client is connected to server", (done) => {
    const hexRegex = /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/;

    clientSocket.on("connect", () => {
      // board is emmited from the server
      clientSocket.on("board", (board) => {
        expect(board.length).toBe(20);
      });

      // assert that the list of users is sent on connection
      clientSocket.on("users", (users) => {
        expect(users[0].color).toMatch(hexRegex);
        expect(users.length).toBe(1);

        expect(room.getOnlineRooms()).toBe(1);
        expect(room.getOnlineUsers()).toBe(1);
        done();
      });
    });
  }, 20000);
});
