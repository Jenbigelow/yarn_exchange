import { useEffect, useState, useContext} from 'react'
import {
  Link,
  useParams,
  useNavigate,
  redirect
} from "react-router-dom";
import User from './User'
import Button from "react-bootstrap/Button";
import SessionStatus from './SessionStatus';

function Login() {
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const [message, setMessage] = useState('')
const [userID, setUserID]= useState('')
const [user, setUser]= useContext(SessionStatus)
const navigate = useNavigate();

const handleLogin = (evt) => {
	evt.preventDefault()
	console.log("Form submitting")
    console.log(email)
    console.log(password)
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({'email': email, 'password': password}),
        headers: {'Content-Type': 'application/json'}
      })
        .then((response) => response.json())
        .then((responseJSON) => 
            {
              if(responseJSON.status == 'true'){
                setUserID(responseJSON.userID)
                setUser(responseJSON.userID)
                navigate(`/user/${responseJSON.userID}`)}
            
            else{{ setMessage(responseJSON.message)}}})
      
    }
const updateEmail = (evt) => {
	setEmail(evt.target.value)

}
const updatePassword = (evt) => {
	setPassword(evt.target.value)

}


  return(
    
    <>
    <form onSubmit={handleLogin}>
  <p>
      Email <input type="text" name="email" onChange={updateEmail}/>
    </p>

    <p>
      Password <input type="password" name="password" onChange={updatePassword}/>
    </p>

    <p>
      <input type="submit" value = "Login"/>
    </p>
    <p>{message}</p>
  </form>
  </>
  )
}

export default Login