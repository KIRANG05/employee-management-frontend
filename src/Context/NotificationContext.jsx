import { createContext, useContext, useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "../Websocket/Websocket.jsx";
import api from "../Services/api";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, totalPages: 1 });
  const [updateCounter, setUpdateCounter] = useState(0);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // Load paginated notifications
 const loadNotifications = async (page = 0, size = 10) => {
  try {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId || !role) return; // prevent API call if not ready

    const res = await api.get(`/notification/fetch-paged`, {
      params: { id: userId, role, page, size }
    });

    if (res.data.isSuccess) {
      setNotifications(
        res.data.data.content.map(n => ({ ...n, read: n.isRead }))
      );
      setPageInfo({
        pageNumber: res.data.data.pageNumber,
        totalPages: res.data.data.totalPages,
      });
    }
  } catch (e) {
    console.error("Error loading notifications", e);
  }
};


  // Add WebSocket notification
const addNotification = (notification) => {
  setNotifications(prev => [
    { ...notification, read: false },
    ...prev
  ]);
};


const markLocalRead = (id) => {
  setNotifications(prev =>
    prev.map(n => (n.id === id ? { ...n, read: true } : n))
  );
  setUpdateCounter(c => c + 1);
};


  const markAllAsRead = async () => {
    await api.put(`/notification/read-all`, null, { params: { userId, role } });

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
     setUpdateCounter(c => c + 1);
  };

  useEffect(() => {
    if (!token || !userId || !role) return;

    loadNotifications(0, 10); // initial fetch

    connectWebSocket(token, userId, role, addNotification);

    return () => disconnectWebSocket();
  }, [token, userId, role]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,   // 🔥 added
        pageInfo,
        loadNotifications,
        addNotification,
        markLocalRead,
        markAllAsRead,
        updateCounter,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
