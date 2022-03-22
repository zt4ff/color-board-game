// all unit test as partain how the game_websocket works
import { Board } from "../../game_websocket/board";
import { Room } from "../../game_websocket/room";
import { RandomUser } from "../../game_websocket/user";

describe("User", () => {
  let room: Room;
  const users: Array<RandomUser> = [];
  const noOfUsers = 5;

  beforeAll(async () => {
    room = new Room();
    for (let i = 0; i < noOfUsers; i++) {
      users[i] = await new RandomUser().join(room);
    }
  });

  it("creates a new random user", () => {
    expect(users[0].username.length).toBeGreaterThan(0);
    expect(users[0].roomID.length).toBeGreaterThan(5);
    expect(users[0].color).toMatch(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/);
    expect(users[0].board).toBeInstanceOf(Board);
  });

  it("confirms that the number of rooms created", () => {
    expect(room.getOnlineUsers()).toBe(5);
    expect(room.getOnlineRooms()).toBe(2);
    expect(room.getUsersInRoom(users[0]).length).toBe(3);
    expect(room.getUsersInRoom(users[noOfUsers - 1]).length).toBe(2);
  });

  it("confirms a single user leaves the room", () => {
    room.leaveRoom(users[noOfUsers - 1]);
    expect(room.getUsersInRoom(users[noOfUsers - 2]).length).toBe(1);
  });

  it("leaves rooms to the last user", () => {
    for (let i = 3; i >= 0; i--) {
      room.leaveRoom(users[i]);
    }
    expect(room.getUsersInRoom(users[0]).length).toBe(0);
  });
});
