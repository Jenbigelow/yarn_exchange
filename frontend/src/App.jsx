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
    {yarns === null ? (
    <div>Loading...</div>
  ) :(

  <div>
  <Routes>
  <Route path = "" element = {<Layout />}/><Route/>
  <Route path="About" element={<About />} /><Route/>
  <Route path="Yarns" element ={<Yarns yarns = {yarns}/>}/> <Route/>
    <Route path="/yarns/:yarnId" element={<Yarn yarns = {yarns}/>} />
 
  </Routes>
  </div>

  )}
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
    <h1>Yarns</h1>
    <div>
  
      </div>
    {yarns === null ? (
      <div>Loading...</div>
    ) :(<div>{yarnCards}</div>)}
    <Outlet />
    </>
    
  )
}


function Yarn(props) {
  const { yarns } = props
// const params = useParams()
// const yarnId = params.yarnId
  const {yarnId} = useParams();
  const index = Number(yarnId)-1
  const yarn_object = Object.values(yarns)
  const yarn = yarn_object[index]

  console.log(yarn.seller_name)

  
  
return (
  <>
  <div>{yarn.yarn_name}
  <div>
    ${yarn.yarn_price}
    </div>
  <div>
  <img src={`${yarn.yarn_photo}`}/>
  </div>
  <div>
    {yarn.seller_name}
  </div>
  <div>
      <Link to="/yarns">Back to Yarns</Link>
  </div>
  </div>
  </>

)
}

function YarnCard(props){
  const {yarnId, yarnName, yarnPrice, yarnPhoto} = props
  // console.log(props)
  return(
    <div>
    <div>
  <Link to={`/yarns/${yarnId}`}> {yarnName}</Link>
  </div>
  ${yarnPrice}
    <div>
    <img src={`${yarnPhoto}`}/>
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