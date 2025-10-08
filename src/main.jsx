import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AuthProvider } from "./Context/AuthContext"; 
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <App />   {/* App now contains the Router */}
    </AuthProvider>
  </StrictMode>,
)
