import { useEffect, useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";
import Yarn from './Yarn'
import Yarns from './Yarns'
import About from './About'
import Login from './Login'
import User from './User'
import CreateAccount from './CreateAccount';

function Layout() {
  return(
<nav>
  <div>
  <Link to="/login">Login</Link>
  </div>
  <div>
  <Link to="/createaccount">Create Account</Link>
  </div>
  <div>
  <Link to="/yarns">Yarns</Link>
  </div>

</nav>
  )
}


  
function App() {

  return(
    <> 


  <div>
  <Routes>
  <Route path = "" element = {<Layout />}/><Route/>
  <Route path = "/user/:userID" element = {<User/>}/><Route/>
  <Route path="CreateAccount" element={<CreateAccount />} /><Route/>
  <Route path="Login" element={<Login />} /><Route/>
  <Route path="Yarns" element ={<Yarns/>}/> <Route/>
    <Route path="/yarns/:yarnId" element={<Yarn />} />
  </Routes>
  </div>

  
    </>
)
}


export default App


