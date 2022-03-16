// this is where the rooms are managed and created
import { v4 as uuidv4 } from "uuid";
type roomState = {
  users: Array<{ username: string; color: string }>;
  id: string;
  board: Board;
};
import { Board } from "./board";

const ROOM_MAX_CAPACITY = 3;

export class Room {
  // contains the state of the rooms (number of users, id)
  private roomsState: Array<roomState>;

  private onlineUsers: number;

  constructor() {
    // TODO merge data structures into one optimal solution
    // no of users in room,
    this.roomsState = [];
    // list of actual users in a room
    this.onlineUsers = 0;
  }

  public joinRoom(user: User) {
    return new Promise<{ id: string; board: Board }>((resolve) => {
      for (let i = 0; i < this.roomsState.length; i++) {
        if (this.roomsState[i].users.length < ROOM_MAX_CAPACITY) {
          this.roomsState[i].users.push({
            username: user.username,
            color: user.color,
          });
          ++this.onlineUsers;
          return resolve({
            id: this.roomsState[i].id,
            board: this.roomsState[i].board,
          });
        }
      }

      const newID = uuidv4();
      const board = new Board(20);
      this.roomsState.push({
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
    const room = this.roomsState.filter((room) => {
      if (room.id === user.roomID) return true;
    });

    if (room.length >= 1) {
      return room[0].users;
    }
    return [];
  }

  public leaveRoom(user: User) {
    --this.onlineUsers;
    this.roomsState = this.roomsState.filter((room) => {
      if (room.id === user.roomID) {
        if (room.users.length === 1) {
          return false;
        } else {
          room.users = room.users.filter(
            (usr) => usr.username != user.username
          );
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
    return this.roomsState.length;
  }
}
