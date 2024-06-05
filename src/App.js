//import Layout from "./components/layouts/Layout";
import './index.css';
import './custom.css';  // Add this line

import Routers from "./router/Routers";

import axios from "axios";
import { ToastContainer,  Bounce } from 'react-toastify'; // Import Bounce transition
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = "http://localhost:5000"; 
axios.defaults.withCredentials = true; 

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Bounce} // Use Bounce transition here
        pauseOnHover
        theme="dark"
      />
       <Routers />
    </div>
  );
}

export default App;
