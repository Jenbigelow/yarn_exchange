import { useEffect, useState } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
import SessionStatus from './SessionStatus';
import { Button } from 'react-bootstrap';

  
  
  function Yarn() {
    const [yarn, setYarn] = useState({});
    const [fav, setFav] = useState(false)
    const [message, setMessage] = useState ('')
    const {yarnId} = useParams();
    const sessionStatus = SessionStatus()

    useEffect(() => {
      fetch(`/api/yarns/${yarnId}`)
        .then((response) => response.json())
        .then((yarnData) => {
          setYarn(yarnData);
        });
    }, []);


    const handleLiking = (evt) => {
      evt.preventDefault();
      console.log("button pressed");
      fetch(`/api/likes/${yarnId}`, {
        method: "POST",
        body: JSON.stringify({ user: sessionStatus}),
        headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log(responseJSON);
            if (responseJSON.status === true) {
              setMessage("Liked!");
              setFav[true]
            }
            else{
              setMessage("Unliked")
              setFav[false]
  
            }
            })
      }



  return (
    <>
    <div>{yarn.yarn_name} ({yarn.dyelot} company: {yarn.yarn_company})
    </div>
    <div>
      ${yarn.yarn_price}
    </div>
    <div>
    <img src={`${yarn.yarn_photo}`}/>
    </div>
    <div>
      {yarn.yarn_weight}
    </div>
    <div>
      {yarn.skeins}
    </div>
    <div>
      Ravelry seller:  <Link to ={`/seller/${yarn.seller_id}`}>{yarn.seller_name}</Link>
    </div>
    <div>
      Location: {yarn.seller_location}
    </div>
    {sessionStatus !== null 
       ?<Button onClick={handleLiking}>Like</Button>
      : <Link to = {"/login"}>Login to like</Link>}
    <div>{message}</div>
    <div>
        <Link to="/yarns">Back to Yarns</Link>
    </div>
    </>
  
  )
  }
  


export default Yarn