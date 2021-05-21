// let socket = new WebSocket("wss://websocket.info");

// socket.onopen = () => {};

// socket.onmessage = (event) => {
//   // event.
// };

// socket.send = () => {};

// export default socket;

import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://wiredbrainchatserver.azurewebsites.net/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default connection;
