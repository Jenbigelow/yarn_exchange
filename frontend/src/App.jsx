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

function Layout() {
  return(
<nav>
  <div>
  <Link to="/about">About</Link>
  </div>
  <div>
  <Link to="/yarns">Yarns</Link>
  </div>

</nav>
  )
}


  
function App() {
  // const [yarns, setYarns] = useState({});
  // useEffect(() => {
  //   fetch("/api/yarns")
  //     .then((response) => response.json())
  //     .then((yarnData) => {
  //       setYarns(yarnData.yarns);
  //     });
  // }, []);


  return(
    <> 


  <div>
  <Routes>
  <Route path = "" element = {<Layout />}/><Route/>
  <Route path="About" element={<About />} /><Route/>
  <Route path="Yarns" element ={<Yarns/>}/> <Route/>
    <Route path="/yarns/:yarnId" element={<Yarn />} />
 
  </Routes>
  </div>

  
    </>
)
}


export default App


