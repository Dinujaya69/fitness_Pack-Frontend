import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";



const RootComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          
            <App />
          
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
