import { Board } from "../../game_websocket/board";

describe("Board test", () => {
  let board: Board;

  beforeAll(() => {
    board = new Board(5);
  });

  test("the board is created with the specified size in place", () => {
    expect(board.getBoard.length).toBe(5);
    expect(board.getBoard[0].length).toBe(5);
    expect(board.getBoard[0][0]).toBeNull();
    expect(
      board.getBoard[board.getBoard.length - 1][board.getBoard.length - 1]
    ).toBeNull();
  });

  test("makes turns in board", () => {
    const color = "#ffffff";
    const turns = [
      [0, 0],
      [3, 4],
    ];
    for (let i = 0; i < turns.length; i++) {
      board.makeTurn(turns[i][0], turns[i][1], color);
      expect(board.getBoard[turns[i][1]][turns[i][0]]).toBe(color);
    }
  });

  test("clear board", () => {
    const turns = [
      [0, 0],
      [3, 4],
    ];
    board.clear();
    for (let i = 0; i < turns.length; i++) {
      expect(board.getBoard[turns[i][1]][turns[i][0]]).toBe(null);
    }
  });

  test("remove specific color from board", () => {
    const user1Color = "#121212";
    const user2Color = "#cdcdaa";
    const user1 = [
      [1, 2],
      [3, 4],
    ];
    const user2 = [
      [3, 3],
      [2, 2],
    ];

    for (let i = 0; i < user1.length; i++) {
      board.makeTurn(user1[i][0], user1[i][1], user1Color);
      board.makeTurn(user2[i][0], user2[i][1], user2Color);
    }
    // remove user1 from board
    board.removeDisconnectedUserFromBoard(user1Color);

    // filter through board and make sure the color is not anywhere
    function filter() {
      return board.getBoard.find((x) =>
        x.find((color) => color === user1Color)
      );
    }

    expect(filter()).toBeFalsy();
  });

  test("make wining moves", () => {
    for (let i = 0; i < 5; i++) {
      if (i === 4) {
        expect(board.makeTurn(0, i, "#ffffff")).toBeTruthy();
        break;
      }
      board.makeTurn(0, i, "#ffffff");
    }
  });
});
