import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SessionStatus from "./SessionStatus";

function GetYarns(props) {
  const navigate = useNavigate();
  const [priceSelect, setPriceSelect] = useState("");
  const [yarns, setYarns] = useState(props.yarns);

  if (yarns === undefined) {
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarns(yarnData.yarns);
        console.log(yarnData.yarns);
        // const lowToHighYarns = Object.values(yarnData.yarns).sort((a, b) => a.yarn_price - b.yarn_price)
        // setYarns(lowToHighYarns)
      });
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
  console.log(`runs every render`, yarns);
  return (
    <>
      {yarns === undefined ? (
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
          <Yarns yarns={yarns} />{" "}
        </>
      )}
    </>
  );
}

function Yarns(props) {
  const { yarns } = props;
  const sessionStatus = SessionStatus()
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
      {yarns === null ? <div>Loading...</div> : <div>{yarnCards}</div>}
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
    if (fav === false) {
      setFav(true);
      fetch(`/api/likes/${yarnId}`, {
        method: "POST",
        body: JSON.stringify({ like: true }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status === true) {
            if (responseJSON.user !== null) {
              setMessage("Liked!");
            } else {
              {
                setMessage("Not logged in!");
              }
            }
          }
        });
    }
    if (fav === true) {
      setFav(false);
      fetch(`/api/likes/${yarnId}`, {
        method: "POST",
        body: JSON.stringify({ like: false }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status === false) {
            if (responseJSON.user !== null) {
              setMessage("Unliked");
            } else {
              {
                setMessage("Not logged in!");
              }
            }
          }
        });
    }
  };
  // console.log(props)
  return (
    <Card key={props.yarnId}>
      <Card.Title>
        <Link to={`/yarns/${yarnId}`}> {yarnName}</Link>
      </Card.Title>
      <Card.Subtitle>${yarnPrice}</Card.Subtitle>
      <Card.Img src={`${yarnPhoto}`} />
      <Card.Body>
        {sessionStatus !== null 
       ?<Button onClick={handleLiking}>Like</Button>
      : <Link to = {"/login"}>Login to like</Link>}
      </Card.Body>
      <div>{message}</div>
    </Card>
  );
}
export default GetYarns;
export { Yarns };
