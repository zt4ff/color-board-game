// features of the user function
// create random user
// confirm the username, color
// mock the Room and the Board class

import { RandomUser } from "../../game_websocket/user";
import { Room } from "../../game_websocket/room";
import { Board } from "../../game_websocket/board";

const room = new Room();

describe("User", () => {
  let user: RandomUser;
  const BOARD_SIZE = 2;
  const ROOM_ID = "abc-123";

  test("create a random user", async () => {
    // mock the function
    const roomMock = jest.spyOn(room, "joinRoom").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve({ id: ROOM_ID, board: new Board(BOARD_SIZE) });
        })
    );
    user = new RandomUser();
    jest.spyOn(user, "join");
    user = await user.join(room);

    expect(roomMock).toBeCalledTimes(1);
  });

  test("expect user generated color to match Hex color code", () => {
    const hexRegex = /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/;

    expect(user.color).toMatch(hexRegex);
  });

  test("expect board to be create for the user", () => {
    expect(user.board).toBeInstanceOf(Board);
    expect(user.board?.getBoard.length).toBe(BOARD_SIZE);
    expect(user.board?.getBoard[0].length).toBe(BOARD_SIZE);
  });

  test("user to create a room id", () => {
    expect(user.roomID).toBe(ROOM_ID);
  });

  test("expect username length to be greater than 2", () => {
    expect(user.username.length).toBeGreaterThan(2);
  });
});
