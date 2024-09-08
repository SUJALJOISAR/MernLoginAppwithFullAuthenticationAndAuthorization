import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import {Toaster} from 'react-hot-toast';
import axios from "axios";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";

axios.defaults.baseURL="http://localhost:5000/api";
axios.defaults.withCredentials=false;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Toaster position="top-right"/>
      <App />
    </BrowserRouter>
  </AuthProvider>
  </StrictMode>
);
