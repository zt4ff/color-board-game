// this is where the rooms are managed and created
import { v4 as uuidv4 } from "uuid";
type Rooms = { users: number; id: string; board: Board };
import { Board } from "./board";

export class Room {
  // contains the state of the rooms (number of users, id)
  private roomsDetails: Array<Rooms>;
  // keeps tab of users added in new rooms
  private roomsState: {
    [key: string]: Array<{ username: string; color: string }>;
  };

  private onlineUsers: number;

  constructor() {
    // TODO merge data structures into one optimal solution
    // no of users in room,
    this.roomsDetails = [];
    // list of actual users in a room
    this.roomsState = {};
    this.onlineUsers = 0;
  }

  public addUserToRoom(user: User) {
    if (this.roomsState[user.roomID]) {
      this.roomsState[user.roomID].push({
        username: user.username,
        color: user.color,
      });
    } else {
      this.roomsState[user.roomID] = [
        {
          username: user.username,
          color: user.color,
        },
      ];
    }
  }

  public getUsersInRoom(user: User) {
    return this.roomsState[user.roomID];
  }

  public removeUserFromRoom(user: User) {
    this.roomsState[user.roomID] = this.roomsState[user.roomID].filter(
      (usr) => usr.username != user.username
    );
  }

  public joinRoom() {
    return new Promise<{ id: string; board: Board }>((resolve) => {
      for (let i = 0; i < this.roomsDetails.length; i++) {
        if (this.roomsDetails[i].users < 3) {
          this.roomsDetails[i].users++;
          this.onlineUsers++;
          return resolve({
            id: this.roomsDetails[i].id,
            board: this.roomsDetails[i].board,
          });
        }
      }

      const newID = uuidv4();
      const board = new Board(20);
      this.roomsDetails.push({
        id: newID,
        users: 1,
        board,
      });
      this.onlineUsers++;
      return resolve({
        id: newID,
        board,
      });
    });
  }

  public leaveRoom(user: User) {
    this.onlineUsers--;
    this.roomsDetails = this.roomsDetails.filter((room) => {
      if (room.id === user.roomID) {
        if (room.users === 1) {
          return false;
        } else room.users--;
      }
      return true;
    });
  }

  public getOnlineUsers() {
    return this.onlineUsers;
  }

  // TODO - fix this later
  public getOnlineRooms() {
    return this.roomsDetails.length;
  }
}
