import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

function connectWebSocket(token, userId, role, onNotification) {
  return new Promise((resolve, reject) => {
    const socket = new SockJS(
      `http://localhost:8081/emp/notification/ws?token=${token}`
    );

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("🔗 WebSocket Connected");

        // 1️⃣ User-specific
        stompClient.subscribe(`/topic/user/${userId}`, (msg) => {
          onNotification(JSON.parse(msg.body));
        });

        // 2️⃣ If employee
        if (role === "EMPLOYEE") {
          stompClient.subscribe(`/topic/employee/${userId}`, (msg) => {
            onNotification(JSON.parse(msg.body));
          });
        }

        // 3️⃣ If HR
        if (role === "HR") {
          stompClient.subscribe(`/topic/hr/${userId}`, (msg) => {
            onNotification(JSON.parse(msg.body));
          });
        }

        // 4️⃣ For admin dashboard
        if (role === "ADMIN") {
          stompClient.subscribe(`/topic/admin/notification`, (msg) => {
            onNotification(JSON.parse(msg.body));
          });
        }

        // 5️⃣ Global (optional)
        stompClient.subscribe(`/topic/global`, (msg) => {
          onNotification(JSON.parse(msg.body));
        });

        resolve();
      },

      onStompError: () => {
        console.error("❌ STOMP WebSocket Error");
        reject();
      },
    });

    stompClient.activate();
  });
}

function disconnectWebSocket() {
  if (stompClient) {
    stompClient.deactivate();
    console.log("🔌 WebSocket Disconnected");
  }
}

export { connectWebSocket, disconnectWebSocket };
