import { useEffect, useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
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

function About(){

  return(
<div>
  <h1>About</h1>
  </div>
  )
}

function Yarns() {
  const [yarns, setYarns] = useState(null);
  useEffect(() => {
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns);
      });
  }, []);

  return (
    
    <>
    <h1>Yarn</h1>
    <div>

      </div>
    {yarns === null ? (
      <div>Loading...</div>
    ) : (
      yarns.map((yarn) => <div key={yarn.yarn_id}>{yarn.yarn_name}${yarn.yarn_price}
      <div>
      <img src={`${yarn.yarn_photo}`}/>
      </div>
      <div>
  <Link to={`/${yarn.yarn_name}`}>{yarn.yarn_name}</Link>
  </div>

    </div>




  )
    )}
  </>
  );

}

function YarnPage(props){
  const yarn_name = props;
return (
  <p>Hello {props.yarn_name}!</p>
)
}
  
function App() {

  return(
  <>
  <div>
  <Routes>
  <Route path = "" element = {<Layout />}/><Route/>
  <Route path="About" element={<About />} /><Route/>
  <Route path="Yarns" element={<Yarns />} />
  <Route path="YarnPage" element={<YarnPage />} />
  <Route/>
  </Routes>
  </div>
  </>
  )
}


export default App
