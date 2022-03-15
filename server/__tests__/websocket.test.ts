// all unit test as partain how the game_websocket works
import { Board } from "../game_websocket/board";
import { Room } from "../game_websocket/room";
import { RandomUser } from "../game_websocket/user";

describe("User", () => {
  let room: Room;
  let user: RandomUser;

  beforeAll(async () => {
    room = new Room();
    user = await new RandomUser().join(room);
  });

  it("creates a new random user", async () => {
    expect(user.username.length).toBeGreaterThan(0);
    expect(user.roomID.length).toBeGreaterThan(5);
    expect(user.color).toMatch(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/);
    expect(user.board).toBeInstanceOf(Board);
  });

  it("add single user to list of players in a room", async () => {
    room.addUserToRoom(user);
    expect(room.getUsersInRoom(user).length).toBe(1);
  });

  it("removes a single user from list of playing users", async () => {
    room.removeUserFromRoom(user);
    expect(room.getUsersInRoom(user).length).toBe(0);
  });

  it("confirms that the number of rooms created is one", () => {
    expect(room.getOnlineRooms()).toBe(1);
  });
});

// TODO - test in sync of multple user
// TODO - mock many contrustors and function calls with jest
describe("User", () => {
  const users: Array<RandomUser> = [];
  let room: Room;

  beforeAll(async () => {
    room = new Room();
    // creates four users
    for (let i = 0; i <= 3; i++) {
      users[i] = await new RandomUser().join(room);
      console.log(users[i]);
    }
  });

  it("confirms the number of users created", () => {
    expect(room.getOnlineUsers()).toBe(4);
  });

  it("add all users to list of players in a room", async () => {
    for (let i = 0; i < users.length; i++) {
      room.addUserToRoom(users[i]);
    }
    expect(room.getUsersInRoom(users[0]).length).toBe(3);
    expect(room.getUsersInRoom(users[3]).length).toBe(1);
  });
});
