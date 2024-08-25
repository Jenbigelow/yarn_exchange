import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


function SessionStatus() {
  const [userId, setUserId]= useState("")
  useEffect(() => {
    fetch(`/api/sessionstatus`)
      .then((response) => response.json())
      .then((responseJSON) => {
        // console.log(responseJSON);
        setUserId(responseJSON.user)
        
      })
  }, []);
  // console.log(userId)

  return userId;
}

export default SessionStatus;
