import { useEffect, useState } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import YarnCard from './YarnCardSm';



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
    <>
   <h1>{yarns[0].seller_name}</h1>
   <h4>{yarns[0].seller_location}</h4>
   <Container>
   <Row className = "mb-auto">
   {yarnCards}
   </Row>
   </Container>
   <Link to="/yarns">All Yarns</Link>
   </>
   )
}
</>
)
}



export default Seller