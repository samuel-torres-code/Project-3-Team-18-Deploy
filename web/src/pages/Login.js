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
  const [isEmployee, setEmployee] = useState(false);
  const [isManager, setManager] = useState('');
  const client = axios.create({
    baseURL: "http://localhost:2000"
  })

  //login persistency
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setLoggedIn(loggedInUser);
    }
  }, []);

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

  //determine if user login was successful
  const changeLoggedIn = (event) => {
    setLoggedIn(event);
  }

  //set the employee is user is an employee
  const changeEmployee = (event) => {
    setEmployee(event);
  }

  //update the manager value is necessary
  const changeManager = (event) => {
    setManager(event);
  };

  //In the event we need to immediately clear for some reason
  const clearValues = () => {
    setEmail('');
    setPass('');
    setUser('');
  };

  function changeLog(){
    log = "a";
  }

  function logOut(){
    localStorage.clear();
    log = "a";
  }

  //cancel default login button function and handle it ourself
  const registerLogin = async (event) => {
    event.preventDefault();
    const loginData = await client.post('/api/login',{
        user: user,
        email: email,
        password: pass,
        emp: (isEmployee) ? "true" : "false"
    }).then(res => {
      if(!isEmployee){
        changeLoggedIn(res.data);
        localStorage.setItem('isLoggedIn', res.data);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
      }
      else{
        changeLoggedIn(res.data[0]);
        changeManager(res.data[1]);
        localStorage.setItem('isLoggedIn', loggedIn);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        localStorage.setItem('manager', isManager);
        localStorage.setItem('employee', isEmployee);
      }
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

        <Form.Group className="mx-auto" style={{display: 'flex', align: 'center'}}>
          <Form.Check className="mx-auto" type={"checkbox"} label={"Employee?"} style={{display: 'flex', align: 'center'}} checked={isEmployee} onChange={(e) => setEmployee(e.target.checked)} />
        </Form.Group>

        <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-3 mt-3" style={{width:'100%'}} variant="primary" type="submit" disabled={!infoCompleted()} onClick={registerLogin}>Login</Button>
          </Link>
        

          <Link to={'/Register'}><Button className="btn btn-primary mx-3 mt-3"  style={{width:'90%'}} type="button">Register</Button></Link>
        </div>
        </Form>
      }
      {loggedIn &&
        <Form>
          
          {(!isEmployee) && 
            <div style={{color: 'blue', fontSize: '40'}}>Welcome Back!</div>
          }
          {(isEmployee) && (!isManager) && 
            <div style={{color: 'blue', fontSize: '40'}}>Welcome, Server!</div>
          }
          {(isEmployee) && (isManager) &&
            <div style={{color: 'blue', fontSize: '40'}}>Welcome, Manager!</div>
          }
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-auto mt-1 mb-3" variant="primary" type="button" style={{width: '40%'}} onClick={changeLog}>Back To Home</Button>
          </Link>
          <div style={{color: 'blue', fontSize: '40'}}>Need to Log Out?</div>
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-auto mt-1" variant="primary" type="button" style={{width: '40%'}} onClick={logOut}>Log Out</Button>
          </Link>

        </Form>
      }
    </div>
  );

};
  


  export default Login;