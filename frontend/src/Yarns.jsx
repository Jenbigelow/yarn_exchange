import { useEffect, useState } from 'react'
import {
    Link,
    Outlet,
  } from "react-router-dom";

function GetYarns(props){

const [yarns, setYarns] = useState(props.yarns);
if (yarns === undefined){
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns);
        console.log(yarnData.yarns)
      });
    return (
      <>

      {yarns === undefined ? (
        <div>Loading...</div>
      ) : (<Yarns yarns ={yarns}/>)
    }
    </>
      
    )

  }
  else{

  return <Yarns yarns ={yarns}/>
}
}

function Yarns(props) {
  const {yarns} = props

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
  const [fav, setFav] = useState(false)
  const [message, setMessage] = useState ('')
    const {yarnId, yarnName, yarnPrice, yarnPhoto} = props
    const handleLiking = (evt) => {
      evt.preventDefault();
      console.log("button pressed")
      if (fav === false){
        setFav(true)
      fetch(`/api/likes/${yarnId}`, {
      method: "POST",
      body: JSON.stringify({'like': true}),
      headers: {'Content-Type': 'application/json'}
    })
      .then((response) => response.json())
      .then((responseJSON) => 
          {console.log(responseJSON)
            if(responseJSON.status === true){
              if (responseJSON.user !== null){
              setMessage("Liked!")}
          else{{ setMessage("Not logged in!")}}}
            })
          }
          if (fav === true){
            setFav(false)
            fetch(`/api/likes/${yarnId}`, {
              method: "POST",
              body: JSON.stringify({'like': false}),
              headers: {'Content-Type': 'application/json'}
            })
              .then((response) => response.json())
              .then((responseJSON) => 
                  {console.log(responseJSON)
                    if(responseJSON.status === false){
                      if (responseJSON.user !== null){
                      setMessage("Unliked")}
                  
                  else{{ setMessage("Not logged in!")}}}
                    })
                  }
                }
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
    <button onClick ={handleLiking}>Like</button>
    <div>{message}</div>
  
    </div>
  
  )
  }
export default GetYarns
export {Yarns}