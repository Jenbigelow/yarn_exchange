import { useEffect, useState } from 'react'
import {
  Link,
  useParams,
  useNavigate,
  redirect
} from "react-router-dom";
import User from './User'


function CreateAccount() {
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const [message, setMessage] = useState('')
// const [status, setStatus] = useState('')
const [userID, setUserID]= useState('')
const navigate = useNavigate();

const handleCreation = (evt) => {
	evt.preventDefault()
	console.log("Form submitting")
    console.log(email)
    console.log(password)
    fetch("/api/createaccount", {
        method: "POST",
        body: JSON.stringify({'email': email, 'password': password}),
        headers: {'Content-Type': 'application/json'}
      })
        .then((response) => response.json())
        .then((responseJSON) => 
            {
              if(responseJSON.status == 'true'){
                setUserID(responseJSON.userID)
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
    <form onSubmit={handleCreation}>
  <p>
      Email <input type="text" name="email" onChange={updateEmail}/>
    </p>

    <p>
      Password <input type="password" name="password" onChange={updatePassword}/>
    </p>

    <p>
      <input type="submit" value = "Create Account"/>
    </p>
    <p>{message}</p>
  </form>
  </>
  )
}

export default CreateAccount