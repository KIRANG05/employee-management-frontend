import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AuthProvider } from "./Context/AuthContext"; 
import { NotificationProvider } from "./Context/NotificationContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <NotificationProvider>
        <App />  {/* App now contains the Router */}
      </NotificationProvider>  
    </AuthProvider>
  </StrictMode>,
)
