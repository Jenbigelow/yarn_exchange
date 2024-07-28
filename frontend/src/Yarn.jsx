import { useEffect, useState } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
  
  
  function Yarn() {
    const [yarn, setYarn] = useState({});
    const [fav, setFav] = useState(false)
    const [message, setMessage] = useState ('')
    const {yarnId} = useParams();

    useEffect(() => {
      fetch(`/api/yarns/${yarnId}`)
        .then((response) => response.json())
        .then((yarnData) => {
          setYarn(yarnData);
        });
    }, []);


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
      Ravelry seller: {yarn.seller_name}
    </div>
    <div>
      Location: {yarn.seller_location}
    </div>
    <button onClick ={handleLiking}>Like</button>
    <div>{message}</div>
    <div>
        <Link to="/yarns">Back to Yarns</Link>
    </div>
    </>
  
  )
  }
  


export default Yarn