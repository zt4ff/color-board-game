import { Room } from "../../game_websocket/room";

let room: Room;
const singleUser = { username: "Abel", color: "#ffffff", roomID: "" };
const multlipleUsers = [
  { username: "Abel", color: "#ffffff" },
  { username: "Cain", color: "#121212" },
  { username: "Jake", color: "#333333" },
  { username: "Jane", color: "#12ffee" },
];

describe("Room", () => {
  beforeAll(() => {
    room = new Room();
  });

  test("confirms room creation", () => {
    expect(room).toBeInstanceOf(Room);

    expect(room.getOnlineRooms()).toBe(0);
    expect(room.getOnlineUsers()).toBe(0);
    expect(room.getUsersInRoom(singleUser)).toEqual([]);
  });

  test("makes single user join room a room", async () => {
    singleUser.roomID = (await room.joinRoom(singleUser)).id;

    expect(room.getOnlineRooms()).toBe(1);
    expect(room.getOnlineUsers()).toBe(1);
    expect(room.getUsersInRoom(singleUser)).toEqual([
      { username: singleUser.username, color: singleUser.color },
    ]);
  });

  test("make single player leave the room", () => {
    room.leaveRoom(singleUser);

    expect(room.getOnlineRooms()).toBe(0);
    expect(room.getOnlineUsers()).toBe(0);
    expect(room.getUsersInRoom(singleUser)).toEqual([]);
  });

  test("make multiplayer leaves the room", async () => {
    const usersCopy = [...multlipleUsers];

    // the four users both joins the room
    for (let i = 0; i < usersCopy.length; i++) {
      const newprop = await room.joinRoom({ roomID: "", ...usersCopy[i] });
      const user = { roomID: newprop.id, ...usersCopy[i] };
      if (i == 2) {
        // assertion for users in the first room created
        expect(room.getUsersInRoom(user)).toEqual(multlipleUsers.slice(0, 3));
      } else if (i == 3) {
        // assertion for the number of user in the second room created

        expect(room.getUsersInRoom(user)).toEqual(multlipleUsers.slice(3, 4));
      }
    }
    expect(room.getOnlineRooms()).toBe(2);
    expect(room.getOnlineUsers()).toBe(4);
  });
});
