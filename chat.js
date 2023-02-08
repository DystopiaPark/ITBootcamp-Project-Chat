class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
    this.unsub2;
  }
  // Room GET/SET
  get room() {
    return this._room;
  }
  set room(r) {
    this._room = r;
  }
  // Username GET/SET
  get username() {
    return this._username;
  }
  set username(u) {
    if (u.length >= 2 && u.length <= 10 && u.trim().length != 0) {
      this._username = u;
    } else {
      window.alert(
        "Invalid Username! Username has to be beetween 2 and 10 characters long and can't be only white space."
      );
    }
  }
  // METHOD Update Room
  updateRoom(ur) {
    this.room = ur;
    if (this.unsub) {
      this.unsub();
    }
  }
  // METHOD Update Username
  updateUsername(u) {
    this.username = u;
    if (this.unsub) {
      this.unsub();
    }
  }
  // METHOD addChat
  async addChat(p) {
    let date2 = new Date();
    let docChat = {
      message: p,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(date2),
    };
    let response = await this.chats.add(docChat);
    return response;
  }
  // METHOD getChats
  getChats(cb) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "added") {
            cb(change.doc);
          }
        });
      });
  }
}

export { Chatroom };
