import { useEffect, useState } from 'react'
import {
    Link,
    Outlet,
  } from "react-router-dom";

function Yarns() {
    const [yarns, setYarns] = useState({});
    useEffect(() => {
      fetch("/api/yarns")
        .then((response) => response.json())
        .then((yarnData) => {
          setYarns(yarnData.yarns);
        });
    }, []);
    const yarnCards =[]
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

      export default Yarns