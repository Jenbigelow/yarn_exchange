import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SessionStatus from "./SessionStatus";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import FavoriteContext from "./FavoriteContext";
import heart from "./heart.svg";

function Yarn() {
  const [yarn, setYarn] = useState({});
  const [fav, setFav] = useState(false);
  const [message, setMessage] = useState("");
  const { yarnId } = useParams();
  const [user, setUser] = useContext(SessionStatus);
  const [favorites, setFavorites] = useContext(FavoriteContext);
  console.log(favorites);
  console.log(`${Number(yarnId)}***`);
  // if (favorites.has(yarnId)){
  //   console.log(true)
  // }
  // else{console.log(false)}

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
      body: JSON.stringify({ user: user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.status === true) {
          setMessage("Liked!");
          setFav(true);
          setFavorites(favorites.add(Number(yarnId)));
        } else {
          setMessage("Unliked");
          setFav(false);
          favorites.delete(Number(yarnId));
          setFavorites(favorites);
        }
      });
  };

  console.log(user);

  return (
    <>
      <Container id="yarnPage">
        <Row>
          <Col>
            <div>
              <img src={`${yarn.yarn_photo}`} />
            </div>
          </Col>
          <Col id="yarnPageCol">
            <div>{yarn.yarn_name}</div>
            <div>${yarn.yarn_price}</div>

            <div>{yarn.yarn_weight}</div>
            <div>{yarn.skeins}</div>

            <div>
              Ravelry seller:{" "}
              <Link to={`/seller/${yarn.seller_id}`}>{yarn.seller_name}</Link>
            </div>
            <div>Location: {yarn.seller_location}</div>
            {favorites !== null ? (
              <>
                {favorites.has(Number(yarnId)) ? (
                  <Button variant="secondary" onClick={handleLiking}>
                    Unlike
                  </Button>
                ) : (
                  <Button onClick={handleLiking}>
                    Like <img src={heart} />
                  </Button>
                )}
              </>
            ) : (
              <Link to={"/login"}>Login to like</Link>
            )}
            <div>{message}</div>
            <div>
              <Link to="/yarns">Back to Yarns</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Yarn;
