import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import CreateRouter from "./routers/router.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import 'flowbite/dist/flowbite.min.css';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"
import firebase from "firebase/compat/app"

const firebaseConfig = {
  apiKey: "AIzaSyBmWoi4-ePux64gFfxws6lhaoVHvXy71xg",
  authDomain: "healthcard-3ff2d.firebaseapp.com",
  projectId: "healthcard-3ff2d",
  storageBucket: "healthcard-3ff2d.appspot.com",
  messagingSenderId: "1062602341194",
  appId: "1:1062602341194:web:98183b7f1e8b3bc11b1fb3"
};

firebase.initializeApp(firebaseConfig)

const router = CreateRouter(); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthContextProvider>
  </React.StrictMode>
);
