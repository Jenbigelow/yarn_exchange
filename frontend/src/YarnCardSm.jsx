import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
    Link
  } from "react-router-dom";

function YarnCard(props){
    const {yarnId, yarnName, yarnPrice, yarnPhoto} = props
    // console.log(props)
    return(
      <>
      <Col key={props.yarnId} className="justify-content-center" >
      <Card style={{ height: '25rem' }}>
      <Card.Img className = "cardImage" src={`${yarnPhoto}`}/>
      <Card.Body>
      <Card.Title><Link to={`/yarns/${yarnId}`}> {yarnName}</Link> </Card.Title>
      <Card.Subtitle>${yarnPrice}</Card.Subtitle>
      <Card.Text></Card.Text>  
      
  
    </Card.Body>
      </Card>
    </Col>
    </>
  
  )
  }

  export default YarnCard