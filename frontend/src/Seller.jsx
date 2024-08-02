import { useEffect, useState } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";


function Seller(){
  const [yarns, setYarns] = useState({});
  const {sellerId} = useParams();

  useEffect(() => {
    fetch(`/api/seller/${sellerId}`)
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns);
      });
  }, []);
  console.log(yarns)

  const yarnCards =[]
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
return(    
    <>    
    {yarns[0] === undefined? (
    <div>Loading...</div>
  ) :(
    <div>
   <h1>{yarns[0].seller_name}</h1>
   <h4>{yarns[0].seller_location}</h4>
   <div>{yarnCards}</div>
   <Link to="/yarns">All Yarns</Link>
   </div>
   )
}
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


export default Seller