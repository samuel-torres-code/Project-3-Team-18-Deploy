import bootstrap from "bootstrap";
import { useState, useEffect } from "react";
import { Link, useAsyncError, useRouteLoaderData } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL } from "../API";

const Login = () => {
  //initialize necessary settings for useState functions
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isManager, setManager] = useState(false);
  const client = axios.create({
    baseURL: API_URL
  })

  //login persistency
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    const manager = localStorage.getItem("manager");
    const employee = localStorage.getItem("employee");
    if (loggedInUser === 'true') {
      setLoggedIn(true);
    }
    else{
      localStorage.setItem("log", "a");
    }
    if(manager === 'true'){
      setManager(true);
    }
    if(employee === 'true'){
      setEmployee(true);
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
    setLoggedIn(event.target.value);
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
    localStorage.setItem("log", "a");
  }

  function logOut(){
    localStorage.clear();
    localStorage.setItem("log", "a");
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
        setLoggedIn(res.data);
        localStorage.setItem('isLoggedIn', res.data);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        localStorage.setItem('employee', false);
      }
      else{
        var b = res.data[0];
        var c = res.data[1];
        setLoggedIn(b);
        setManager(c);
        localStorage.setItem('isLoggedIn', b);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        localStorage.setItem('manager', c);
        localStorage.setItem('employee', true);
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

    if(!loggedIn)
      secondaryLoginVerification();
    localStorage.setItem("log", "b");
    window.location.reload();
    //clearValues();
  };

  const secondaryLoginVerification = (event) =>{
    if(!loggedIn){
      const emailData = client.post('/api/login/email',{
        user: user,
        email: email,
        password: pass,
      }).then(res => {
        if(res.data === true){
          setLoggedIn(true);
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('user', user);
          localStorage.setItem('email', email);
          window.location.reload();
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
    }
  }

  return(
    <div>
      {((localStorage.getItem('isLoggedin') === 'false') || (localStorage.getItem('isLoggedin') === null)) && (loggedIn === false) &&
        (<Form>

          <Form.Group className="mt-3 mx-auto" controlId="loginUser" style={{width: '50%'}}>
            <Form.Label>Email or Username</Form.Label>
            <Form.Control type="email" placeholder="Email or Username" value={user} onChange={changeUser}/>
          </Form.Group>

          <Form.Group className="mt-3 mx-auto" controlId="loginPass" style={{width: '50%'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={pass} onChange={changePass}/>
          </Form.Group>

          {(localStorage.getItem('log') === "b") &&
            (<div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
              <Form.Group className="mt-3 mx-auto" controlId="emailUsage">
                <Form.Label style={{color: 'red',}}>Login Failed. Please Re-enter Credentials</Form.Label>
              </Form.Group>
            </div>)
          }

          <Form.Group className="mx-auto" style={{display: 'flex', align: 'center'}}>
            <Form.Check className="mx-auto" type={"checkbox"} label={"Employee?"} style={{display: 'flex', align: 'center'}} checked={isEmployee} onChange={(e) => setEmployee(e.target.checked)} />
          </Form.Group>

          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <Link to={'/Home'}>
              <Button className="btn btn-primary mx-3 mt-3" style={{width:'100%'}} variant="primary" type="submit" disabled={!infoCompleted()} onClick={registerLogin}>Login</Button>
            </Link>
          
            <Link to={'/Register'}><Button className="mx-3 mt-3"  style={{width:'90%'}} variant="link">Need to Register?</Button></Link>
          </div>
        </Form>)
      }
      {(localStorage.getItem('isLoggedIn') === 'true') &&
        (<Form>
          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
          {(!isEmployee) && 
            <div style={{color: 'blue', fontSize: '40'}}>Welcome Back!</div>
          }
          {(isEmployee) && (!isManager) && 
            <div style={{color: 'blue', fontSize: '40'}}>Welcome, Server!</div>
          }
          {(isEmployee) && (isManager) &&
            <div style={{color: 'blue', fontSize: '40'}}>Welcome, Manager!</div>
          }
          </div>
          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-auto mt-1 mb-3" variant="primary" type="button" style={{width: '100%'}} onClick={changeLog}>Back To Home</Button>
          </Link>
          </div>
          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
          <div style={{color: 'blue', fontSize: '40'}}>Need to Log Out?</div>
          </div>
          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
          <Link to={'/Home'}>
            <Button className="btn btn-primary mx-auto mt-1" variant="primary" type="button" style={{width: '100%'}} onClick={logOut}>Log Out</Button>
          </Link>
          </div>
          
        </Form>)
      }
    </div>
  );

};
  


  export default Login;