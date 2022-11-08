import bootstrap from "bootstrap";
import { useState, useEffect } from "react";
import { Link, useAsyncError } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

var log = "a";

const Login = () => {
  //initialize necessary settings for useState functions
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  const client = axios.create({
    baseURL: "http://localhost:2000"
  })

  //confirm that information is entered
  function infoCompleted() {
    return user.length > 0 && pass.length > 0;
  }

  //update the user to the given user
  const changeUser = (event) => {
    setUser(event.target.value);
    changeEmail(event);
  };

  //update email to the given email
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  //update the password to the given password
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const changeLoggedIn = (event) => {
    setLoggedIn(event);
  }

  //In the event we need to immediately clear for some reason
  const clearValues = () => {
    setEmail('');
    setPass('');
    setUser('');
  };

  function changeLog(){
    log = "a";
  }

  //cancel default login button function and handle it ourself
  const registerLogin = async (event) => {
    event.preventDefault();
    const loginData = await client.post('/api/login',{
        user: user,
        email: email,
        password: pass
    }).then(res => {
      changeLoggedIn(res.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("Server responded.");
      } else if (error.request) {
        console.log("Network error.");
      } else {
        console.log("Unknown error type.")
        console.log(error);
      }
    });
    log = "b";
    //clearValues();
  };

  return(
    <div>
      {(!loggedIn) && 
        <Form>

        <Form.Group className="mt-3 mx-auto" controlId="loginUser" style={{width: '50%'}}>
          <Form.Label>Email or Username</Form.Label>
          <Form.Control type="email" placeholder="Email or Username" value={user} onChange={changeUser}/>
        </Form.Group>

        <Form.Group className="mt-3 mx-auto" controlId="loginPass" style={{width: '50%'}}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={pass} onChange={changePass}/>
        </Form.Group>

        {(log === "b") &&
          <Form.Group className="mt-3 mx-auto" controlId="emailUsage">
            <Form.Label style={{color: 'red',}}>Login Failed. Please Re-enter Credentials</Form.Label>
          </Form.Group>
        }

        <Link to={'/Home'}>
          <Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '20%'}} disabled={!infoCompleted()} onClick={registerLogin}>Login</Button>
        </Link>

        <Link to={'/Register'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '20%'}}>Register</Button></Link>

        </Form>
      }
      {loggedIn &&
        <Form>

          <div style={{color: 'blue', fontSize: '40'}}>Welcome Back!</div>
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-3 mt-3" variant="primary" type="button" style={{width: '40%'}} onClick={changeLog}>Back To Home</Button>
          </Link>

        </Form>
      }
    </div>
  );

};
  


  export default Login;