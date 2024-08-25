import { useEffect, useState, useContext } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
import SessionStatus from './SessionStatus';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import YarnCard from './YarnCardSm';


function User(){
  const [yarns, setYarns] = useState({});
  const {userId} = useParams();
  const [user, setUser] = useContext(SessionStatus)

  useEffect(() => {
    fetch(`/api/user/${userId}`)
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
  {user !== null 
 ?<>
   <h3>Your favorites</h3>
   <Container>
   <Row xs={1} sm={2} md={2} lg={3}>
   {yarnCards}
   </Row>
   </Container>
   <Link to="/yarns">All Yarns</Link>
   </>

   : <Link to="/login">Login to see favorites</Link>}
  </>
  )
  
}



export default User