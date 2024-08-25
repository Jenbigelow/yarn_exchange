import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SessionStatus from "./SessionStatus";
import Container from "react-bootstrap/Container";
import yarn_ball from "./yarn_ball.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Search from "./Search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion"


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
    // if (evt.target.value === "under5") {
    //   const copyOfYarns = { ...yarns };
    //   const under5Yarns = []
    //   for (const copyOfYarn of Object.values(copyOfYarns)){
    //     if (copyOfYarn.yarn_price <= 5) {
    //     under5Yarns.push(copyOfYarn)
    //     console.log("here",under5Yarns)

    //     }
    // }
    // const sortedunder5Yarns = Object.values(under5Yarns).sort(
    //   (a, b) => (a.yarn_price - b.yarn_price )
    // )
      
    //   console.log(`sorted`,sortedunder5Yarns);
    //   setYarns(sortedunder5Yarns);

    // }

    // if (evt.target.value === "under10") {
    //   const copyOfYarns = { ...yarns };
    //   const under10Yarns = []
    //   for (const copyOfYarn of Object.values(copyOfYarns)){
    //     if (copyOfYarn.yarn_price <= 10) {
    //     under10Yarns.push(copyOfYarn)
    //     console.log("here",under10Yarns)

    //     }
    // }
    // const sortedunder10Yarns = Object.values(under10Yarns).sort(
    //   (a, b) => (a.yarn_price - b.yarn_price )
    // )
      
    //   console.log(`sorted`,sortedunder10Yarns);
    //   setYarns(sortedunder10Yarns);

    // }
  };

  const handleSelection = (evt) =>{
    console.log(evt.target.value)
    setYarnSelect(evt.target.value)
  }
  const handleSearch = (evt) => {
    evt.preventDefault()
    console.log("Form submitting")
    console.log(yarnSelect)
    console.log(allYarns)
    const copyOfYarns = { ...allYarns };
    const yarnSelectYarnsList = []
  for (const copyOfYarn of Object.values(copyOfYarns)){
    if (copyOfYarn.yarn_weight === yarnSelect) {
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
          <select onChange={handlePricing}>
            <option value="">--Please choose an option--</option>
            <option value="lowToHigh">Sort Price Low to High</option>
            <option value="highToLow">Sort Price High to Low</option>
            {/* <option value="under5">Under $5</option>
            <option value="under10">Under $10</option>
            <option value="under20">Under $20</option>
            <option value="under30">Under $30</option> */}
          </select>
          <div>
          <Accordion>
          <Accordion.Item eventKey="0">
          <Accordion.Header>Filter</Accordion.Header>
          <Accordion.Body>
          <form onSubmit={handleSearch}>

<div className="YarnWeights" onChange={handleSelection}>
       <p>{"Cobweb"}
        <input
        type = "radio"
        value = {"Cobweb"}
        checked = {yarnSelect === "CobWeb"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Lace"}
        <input
        type = "radio"
        value = {"Lace"}
        checked = {yarnSelect === "Lace"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Light Fingering"}
        <input
        type = "radio"
        value = {"Light Fingering"}
        checked = {yarnSelect === "Light Fingering"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Fingering"}
        <input
        type = "radio"
        value = {"Fingering"}
        checked = {yarnSelect === "Fingering"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Sport"}
        <input
        type = "radio"
        value = {"Sport"}
        checked = {yarnSelect === "Sport"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"DK"}
        <input
        type = "radio"
        value = {"DK"}
        checked = {yarnSelect === "DK"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Worsted"}
        <input
        type = "radio"
        value = {"Worsted"}
        checked = {yarnSelect === "Worsted"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Aran"}
        <input
        type = "radio"
        value = {"Aran"}
        checked = {yarnSelect === "Aran"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Bulky"}
        <input
        type = "radio"
        value = {"Bulky"}
        checked = {yarnSelect === "Bulky"}
        onChange = {handleSelection}

        />
       </p>
       <p>{"Super Bulky"}
        <input
        type = "radio"
        value = {"Super Bulky"}
        checked = {yarnSelect === "Super Bulky"}
        onChange = {handleSelection}

        />
       </p>
</div>
<p>

</p>
 </form>

            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            <Button type="submit">Filter</Button>
          
          </div>
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
        <Row xs={1} sm={2} md={3} lg={4}>
          
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
    <Col key={props.yarnId} className="mb-auto">
    <Card key={props.yarnId}>
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

        {sessionStatus !== null 
       ?<Button onClick={handleLiking}>Like</Button>
      : <Link to = {"/login"}>Login to like</Link>}
      </Card.Body>
      <div>{message}</div>
      {/* </Container> */}
    </Card>
    </Col>
  );
}
export default GetYarns;
export { Yarns };
