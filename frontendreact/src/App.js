import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './component/Login.js';
import Register from './component/Register.js';
import ChangePassword from './component/Passwordchange.js';

import Dashboard from './component/Dashboard.js'

import Forgatepassword from './component/Forgatepassword.js'

import Forgatepasswordchange from './component/Forgatepasswordchange.js'




function App() {
  return (
     <>


 <BrowserRouter>

             <Routes>

                  <Route path="/" element={<Login/>} exact/>

                  <Route path="/register" element={<Register/>} exact/>

                  <Route path="/password-change" element={<ChangePassword/>} exact/>

                  <Route path="/dashboard" element={<Dashboard/>} exact/>

                  <Route path="/forgate-password" element={<Forgatepassword/>} exact/>

                  ///user/reset/

                  <Route path="/user/reset/:id/:token" element={<Forgatepasswordchange/>} exact/>




             </Routes>


          </BrowserRouter>




     </>
  );
}

export default App;
