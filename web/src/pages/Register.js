import bootstrap from "bootstrap";
import { useState, useEffect } from "react";
import { Link, useAsyncError } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

var reg = "a";

const Register = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [registered, setIsRegistered] = useState('');
  const client = axios.create({
    baseURL: "http://localhost:2000"
  })

  //login persistency
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setIsRegistered(loggedInUser);
    }
  }, []);

  function setReg(){
    reg = "a";
  }

  //confirm that infomation is entered and passwords match
  function infoCompleted() {
    return user.length > 0 && pass.length > 0 && email.length > 0 && confPass.length > 0 && confPass === pass;
  }

  //update the user to the given user
  const changeUser = (event) => {
    setUser(event.target.value);
    reg = "a";
  };

  //update email to the given email
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  //update the password to the given password
  const changePass = (event) => {
    setPass(event.target.value);
  };

  //update confirmation password to the given password
  const changeConfPass = (event) => {
    setConfPass(event.target.value);
  }

  //change the value of registration confirmation
  const changeIsRegistered = (event) => {
    setIsRegistered(event);
  }

  //In the event we need to immediately clear for some reason
  const clearValues = () => {
    setEmail('');
    setPass('');
    setUser('');
    setConfPass('');
  };

  //take care of the registration
  const registerRegistration = async (event) => {
    event.preventDefault();
    const registerData = await client.post('/api/register',{
        user: user,
        email: email,
        pass: pass
    }).then(res => {
      changeIsRegistered(res.data);
      localStorage.setItem('isLoggedIn', res.data);
      localStorage.setItem('user', user);
      localStorage.setItem('email', email);
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
    reg = "b";
    //clearValues();
  };


  return(
    <div>
      {(!registered) && 
        <Form>

        <Form.Group className="mt-3 mx-auto" controlId="registerEmail" style={{width: '50%'}}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={changeEmail} />
        </Form.Group>
  
        <Form.Group className="mt-3 mx-auto" controlId="registerUser" style={{width: '50%'}}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Username" value={user} onChange={changeUser} />
        </Form.Group>
  
        <Form.Group className="mt-3 mx-auto" controlId="registerPass" style={{width: '50%'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={pass} onChange={changePass} />
        </Form.Group>
  
        <Form.Group className="mt-3 mx-auto" controlId="registerConfirmPass" style={{width: '50%'}}>
            {confPass.length === 0 &&
              <Form.Label>Confirm Password</Form.Label>
            }
            {!(confPass === pass) && pass.length > 0 && confPass.length > 0 &&
              <Form.Label style={{color: 'red',}}>Passwords Do Not Match</Form.Label>
            }
            {(confPass === pass) && pass.length > 0 && confPass.length > 0 &&
              <Form.Label style={{color: 'blue',}}>Passwords Match</Form.Label>
            }
            <Form.Control type="password" placeholder="Password" value={confPass} onChange={changeConfPass} />
            
        </Form.Group>
  
        {(!registered) && (reg === "b") &&
          <Form.Group className="mt-3 mx-auto" controlId="emailUsage">
            <Form.Label style={{color: 'red',}}>Email Already in Use</Form.Label>
          </Form.Group>
        }
  
        <Link to={'/Home'}><Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '20%'}} disabled={!infoCompleted()} onClick={registerRegistration}>Register</Button></Link>
        <Link to={'/Login'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '20%'}} onClick={setReg}>Back to Login</Button></Link>
  
        </Form>
      }
      {(registered) && 
        <Form>

          <div style={{color: 'blue', fontSize: '40'}}>Thanks For Signing Up!</div>
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-3 mt-3" variant="primary" type="button" style={{width: '40%'}}>Back To Home</Button>
          </Link>

        </Form>
      }
    </div>
  );
};
    
  export default Register;