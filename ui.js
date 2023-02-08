export class ChatUI {
  constructor(l) {
    this.list = l;
  }
  // List GET/SET
  get list() {
    return this._list;
  }
  set list(l) {
    this._list = l;
  }
  // METHOD templateLi
  templateLI(metadata) {
    let data = metadata.data();
    let id = metadata.id;
    let date = data.created_at.toDate();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    day = String(day).padStart(2, "0");
    month = String(month).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    let currDate = new Date();
    let currDay = currDate.getDate();
    let writeDate;
    if (day != currDay) {
      writeDate = `${day}.${month}.${year}. - ${hours}:${minutes}`;
    } else {
      writeDate = `${hours}:${minutes}`;
    }
    let htmlLI;
    if (data.username == localStorage.user) {
      htmlLI = `<li class="right-messages" id="${id}">
            <span class="username">${data.username}: </span>
            <span class="message">${data.message}</span>
            <div class="date">${writeDate}</div>
            <i class="bin">🥫</i>
        </li>`;
      this.list.innerHTML += htmlLI;
    } else {
      htmlLI = `<li class="left-messages" id="${id}">
            <span class="username">${data.username}: </span>
            <span class="message">${data.message}</span>
            <div class="date">${writeDate}</div>
            <i class="bin">🥫</i>
        </li>`;
      this.list.innerHTML += htmlLI;
    }
  }
  // METHOD clearUL
  clearUL() {
    this.list.innerHTML = "";
  }
}
