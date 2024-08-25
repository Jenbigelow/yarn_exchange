import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SessionStatus from "./SessionStatus";
import Container from "react-bootstrap/Container";
import yarn_ball from "./yarn_ball.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'


function GetYarns() {
  const [priceSelect, setPriceSelect] = useState("");
  const [yarns, setYarns] = useState({});
  const [yarnWeights, setYarnWeights] = useState('')
  const [yarnSelect, setYarnSelect]= useState('')
  const [allYarns, setAllYarns] = useState({})

  useEffect(() => {
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns)
        setAllYarns(yarnData.yarns);
      });
  }, []);

  const showAllYarns = (evt) => {
    evt.preventDefault();
    setYarns(allYarns)

  }
  const handlePricing = (evt) => {
    evt.preventDefault();
    setPriceSelect(evt.target.value);
    console.log(priceSelect);
    if (evt.target.value === "lowToHigh") {
      const copyOfYarns = { ...yarns };
      const lowToHighYarns = Object.values(copyOfYarns).sort(
        (a, b) => a.yarn_price - b.yarn_price
      );
      console.log(`sorted`, lowToHighYarns);
      setYarns(lowToHighYarns);
    }
    if (evt.target.value === "highToLow") {
      const copyOfYarns = { ...yarns };
      const highToLowYarns = Object.values(copyOfYarns).sort(
        (a, b) => b.yarn_price - a.yarn_price
      );
      console.log(`sorted`, highToLowYarns);
      setYarns(highToLowYarns);
    }
    // consider just conditional rendering
    if (evt.target.value === "under5") {
      const copyOfYarns = { ...yarns };
      const under5Yarns = []
      for (const copyOfYarn of Object.values(copyOfYarns)){
        if (copyOfYarn.yarn_price <= 5) {
        under5Yarns.push(copyOfYarn)
        console.log("here",under5Yarns)

        }
    }
  
    const sortedunder5Yarns = Object.values(under5Yarns).sort(
      (a, b) => (a.yarn_price - b.yarn_price )
    )
      
      console.log(`sorted`,sortedunder5Yarns);
      setYarns(sortedunder5Yarns);

    }

    if (evt.target.value === "under10") {
      const copyOfYarns = { ...yarns };
      const under10Yarns = []
      for (const copyOfYarn of Object.values(copyOfYarns)){
        if (copyOfYarn.yarn_price <= 10) {
        under10Yarns.push(copyOfYarn)
        console.log("here",under10Yarns)

        }
    }
    const sortedunder10Yarns = Object.values(under10Yarns).sort(
      (a, b) => (a.yarn_price - b.yarn_price )
    )
      
      console.log(`sorted`,sortedunder10Yarns);
      setYarns(sortedunder10Yarns);

    }
  };

  const handleSearch = (evt) => {
    evt.preventDefault()
    setYarnSelect(evt.target.value)
    console.log("Form submitting")
    console.log(yarnSelect)
    console.log(allYarns)
    const copyOfYarns = { ...allYarns };
    const yarnSelectYarnsList = []
  for (const copyOfYarn of Object.values(copyOfYarns)){
    if (copyOfYarn.yarn_weight === evt.target.value) {
    yarnSelectYarnsList.push(copyOfYarn)
    console.log("here",yarnSelectYarnsList)}
      setYarns(yarnSelectYarnsList)
      console.log(yarnSelectYarnsList)
    }
  }
    
  console.log(`runs every render`, yarns);
  return (
    <>
      {yarns === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Yarns</h1>
          <DropdownButton
        variant="primary"
        title="Filter by Yarn Weight"
        className = "my-3"
      >
        <Dropdown.Item as="button" onClick={handleSearch} value="Cobweb">Cobweb</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Lace">Lace</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Light Fingering">Light Fingering</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Sport">Sport</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="DK">DK</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Worsted">Worsted</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Aran">Aran</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Bulky">Bulky</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleSearch} value="Super Bulky">Super Bulky</Dropdown.Item>
        </DropdownButton>

          <DropdownButton
        variant="primary"
        title="Sort By Price"
        className = "my-2"
        
      >
        <Dropdown.Item as="button" onClick={handlePricing}value="lowToHigh">Sort Price Low to High</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handlePricing} value="highToLow">Sort Price High to Low</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handlePricing} value="under5">under $5</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handlePricing} value="under10">under $10</Dropdown.Item>
      </DropdownButton>

          <Button onClick={showAllYarns} className = "my-2">Show All Yarns</Button>

          <Yarns yarns={yarns} />
        </>
      )}
    </>
  );
}

function Yarns(props) {
  const { yarns } = props;
  const sessionStatus = SessionStatus()
  console.log(yarns)
  console.log(sessionStatus)

  console.log(`rendering yarns`, yarns)

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
      <div></div>
      {yarns === null ? <div>Loading...</div> :
      
      <Container>
        <Row xs={1} sm={2} md={2} lg={4}>
          
      {yarnCards}
      </Row>
      </Container>}
      
    </>
  );
}

function YarnCard(props) {
  const [fav, setFav] = useState(false);
  const [message, setMessage] = useState("");
  const {yarnId, yarnName, yarnPrice, yarnPhoto } = props;
  const sessionStatus = SessionStatus()


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
  // console.log(props)
  return (
    <Col key={props.yarnId}  >
    <Card key={props.yarnId} style={{ height: '30rem' }}>
      {/* <Container className ="cardContainer"> */}
        {yarnPhoto !== null
            ?<Card.Img className = "cardImage" src={`${yarnPhoto}`} />
            :<Card.Img className = "cardImage" src={yarn_ball} />
        }
      <Card.Body>
      <Card.Title>
        <Link to={`/yarns/${yarnId}`}> {yarnName}</Link>
      </Card.Title>
      <Card.Subtitle>${yarnPrice}</Card.Subtitle>
<Card.Text></Card.Text>
</Card.Body>
<Card.Footer>

        {sessionStatus !== null 
       ?<Button onClick={handleLiking}>Like</Button>
      : <Link to = {"/login"}>Login to like</Link>}
      </Card.Footer>  

      <div>{message}</div>
      {/* </Container> */}
    </Card>
    </Col>
  );
}
export default GetYarns;
export { Yarns };
