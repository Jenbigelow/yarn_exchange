import { useEffect, useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link,
  Outlet,
  useParams
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


  
function App() {
  const [yarns, setYarns] = useState({});
  useEffect(() => {
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns);
      });
  }, []);


  return(
  <> 
  <div>
  <Routes>
  <Route path = "" element = {<Layout />}/><Route/>
  <Route path="About" element={<About />} /><Route/>
  <Route path="Yarns" element ={<Yarns yarns = {yarns}/>}/> <Route/>
    <Route path="/yarns/:yarnId" element={<Yarn/>} />
 
  </Routes>
  </div>
  </>
  )
}


export default App

function About(){

  return(
<div>
  <h1>About</h1>
  </div>
  )
}

function Yarns(props) {
const { yarns } = props
const yarnCards = [];
// if yarn is null
for (const yarn of Object.values(yarns)) {
  const yarnCard = (
    <YarnCard
      key={yarn.yarn_id}
      yarnId={yarn.yarn_id}
      yarnName={yarn.yarn_name}
      yarnPhoto={yarn.yarn_photo}
      yarnPrice={yarn.yarn_price}
    />
  );

  yarnCards.push(yarnCard);
}

  return (
    <>
    <h1>Yarn</h1>
    <div>
  
      </div>
    {yarns === null ? (
      <div>Loading...</div>
    ) :(<div>{yarnCards}</div>)}
    <Outlet />
    </>
    
  )
}

const Yarn = () => {
// const params = useParams()
// const yarnId = params.yarnId
  const {yarnId} = useParams();

return (
  <>
  <p>Hello {yarnId}!</p>
  <div>
      <Link to="/yarns">Back to Yarns</Link>
  </div>
  </>

)
}

function YarnCard(props){
  const {yarnId, yarnName, yarnPrice, yarnPhoto} = props
  console.log(props)
  return(

    <div>{yarnName}${yarnPrice}
    <div>
    <img src={`${yarnPhoto}`}/>
    </div>
    <div>
<Link to={`/yarns/${yarnName}`}> {yarnName}</Link>
</div>

  </div>

)
}

// function YarnName(props){
//   const { yarns } = props
//   for (const yarn of Object.values(yarns)) {
//     let yarn_name = yarn.yarn_name
//        return(<Route exact path={`/${yarn_name}`} element={<YarnPage/>}/>)
      
  
//   }
//   }