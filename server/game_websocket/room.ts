// this is where the rooms are managed and created
import { v4 as uuidv4 } from "uuid";
type Rooms = {
  users: Array<{ username: string; color: string }>;
  id: string;
  board: Board;
};
import { Board } from "./board";
import { RandomUser } from "./user";

export class Room {
  // contains the state of the rooms (number of users, id)
  private roomState: Array<Rooms>;
  // keeps tab of users added in new rooms
  // private roomsState: {
  //   [key: string]: Array<{ username: string; color: string }>;
  // };

  private onlineUsers: number;

  constructor() {
    // TODO merge data structures into one optimal solution
    // no of users in room,
    this.roomState = [];
    // list of actual users in a room
    this.onlineUsers = 0;
  }

  public joinRoom(user: User) {
    return new Promise<{ id: string; board: Board }>((resolve) => {
      for (let i = 0; i < this.roomState.length; i++) {
        if (this.roomState[i].users.length < 3) {
          this.roomState[i].users.push({
            username: user.username,
            color: user.color,
          });
          this.onlineUsers++;
          return resolve({
            id: this.roomState[i].id,
            board: this.roomState[i].board,
          });
        }
      }

      const newID = uuidv4();
      const board = new Board(20);
      this.roomState.push({
        id: newID,
        users: [{ username: user.username, color: user.color }],
        board,
      });
      this.onlineUsers++;
      return resolve({
        id: newID,
        board,
      });
    });
  }

  public getUsersInRoom(user: User) {
    // return this.roomsState[user.roomID];
    const room = this.roomState.filter((room) => {
      if (room.id === user.roomID) return true;
    });
    return room[0].users;
    console.log(room[0].users);
  }

  public leaveRoom(user: User) {
    this.onlineUsers--;
    this.roomState = this.roomState.filter((room) => {
      if (room.id === user.roomID) {
        if (room.users.length === 1) {
          return false;
        } else {
          room.users.filter((usr) => usr.username != user.username);
        }
      }
      return true;
    });
  }

  public getOnlineUsers() {
    return this.onlineUsers;
  }

  // TODO - fix this later
  public getOnlineRooms() {
    return this.roomState.length;
  }
}
