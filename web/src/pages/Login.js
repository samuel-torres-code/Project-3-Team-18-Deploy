import bootstrap from "bootstrap";
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import { Link, useAsyncError, useRouteLoaderData } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL } from "../API";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
const clientId = "353017377567-v6vncaa13jatei1ngfk32gg371fgva5b.apps.googleusercontent.com";

const Login = () => {

  //initialize necessary settings for useState functions
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isManager, setManager] = useState(false);
  const [loading, setLoading] = useState('Please Wait.');
  const [logoutFailure, setLogoutFailure] = useState(false);
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
      setUser(localStorage.getItem("user"));
    }
    else{
      //localStorage.setItem("log", "a");
    }
    if(manager === 'true'){
      setManager(true);
    }
    if(employee === 'true'){
      setEmployee(true);
    }
  }, []);

  /* confirm that information is entered
   * @return a bool ensuring username and password were actually input
   */
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

  /* Function to ensure that we change log of the system
   */
  function changeLog(){
    localStorage.setItem("log", "a");
  }

  /* Function to log the user out of the system to allow for logging back in
   */
  function logOut(){
    setLoggedIn(false);
    localStorage.setItem('employee', false);
    localStorage.setItem('manager', false);
    localStorage.clear();
    localStorage.setItem("log", "a");
    window.location.reload();
  }

  /**
   * Cancel the default login button function and handle it ourself, determining employees vs customers
   * @param {event} event
   */
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
        window.location.reload();
      }
      else{
        var b = res.data[0];
        var c = res.data[1];
        var d = res.data[2];
        setLoggedIn(b);
        setManager(c);
        localStorage.setItem('isLoggedIn', b);
        localStorage.setItem('employeeID', d);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        localStorage.setItem('manager', c);
        localStorage.setItem('employee', true);
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
    if(!loggedIn)
      secondaryLoginVerification();
    localStorage.setItem("log", "b");
  };

  /**
   * If primary verification fails then check for email login usage
   * @param {event} event 
   */
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

  /** Take care of the user login if the user signs in with google
   * @param {event} event 
   */
  const registerGoogleLogin = async (event) => {
    const loginData = await client.post('/api/login/google/login',{
        user: event.name,
        email: event.email,
    }).then(res => {
      if(res.data === true){
        setLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', event.name);
        localStorage.setItem('email', event.email);
        localStorage.setItem('employee', false);
        localStorage.setItem("log", "b");
        window.location.reload();
      }
      else{
        registerGoogleLoginSecondary(event);
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
    localStorage.setItem("log", "b");
  };

  /**
   * If user who logged in with Google does not exist, create an account for them and log them in
   * @param {event} event 
   */
  const registerGoogleLoginSecondary = (event) => {
    console.log(event);
    const loginData = client.post('/api/login/google/login/secondary',{
        user: event.name,
        email: event.email,
    }).then(res => {
      if(res.data === true){
        setLoggedIn(true);
        setUser(event.name);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', event.name);
        localStorage.setItem('email', event.email);
        localStorage.setItem('employee', false);
        localStorage.setItem("log", "b");
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
    localStorage.setItem("log", "b");
  };

  /**
   * Google Login Function. We ping Google API and get user information when they try to log in
   * This gives us user's name and email so we may verify they exist in our system or create them an account
   * On a successful login on Google's side, we ping our own database for the user.
   * On a failed login we respond with an error log. This likely means the error happened on Google's end and we can't fix.
   * @param {*} onSuccess determine if the login was a success and call the api to log in user if so
   * @param {*} onError determine if the login failed and log the error to the system
   */
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );

      var data = userInfo.data;
      var username = data.name;
      var email = data.email;
      registerGoogleLogin(data);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return(
      <div>
        <GoogleOAuthProvider clientId="353017377567-v6vncaa13jatei1ngfk32gg371fgva5b.apps.googleusercontent.com">
        {((localStorage.getItem('isLoggedIn') === 'false') || (localStorage.getItem('isLoggedIn') === null)) && (loggedIn === false) &&
          (<Form>
            <Form.Group className="mt-3 mx-auto" controlId="loginUser" style={{width: '50%'}}>
              <Form.Label><span className='translate'>Email or Username</span></Form.Label>
              <Form.Control type="email" placeholder="Email or Username" value={user} onChange={changeUser}/>
            </Form.Group>
            <Form.Group className="mt-3 mx-auto" controlId="loginPass" style={{width: '50%'}}>
              <Form.Label><span className='translate'>Password</span></Form.Label>
              <Form.Control type="password" placeholder={"Password"} value={pass} onChange={changePass}/>
            </Form.Group>
            {(localStorage.getItem('log') === "b") &&
              (<div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
                <Form.Group className="mt-3 mx-auto" controlId="emailUsage">
                  <Form.Label style={{color: 'red',}}><span className='translate'>Login Failed. Please Re-enter Credentials</span></Form.Label>
                </Form.Group>
              </div>)
            }
            <Form.Group className="mx-auto" style={{display: 'flex', align: 'center'}}>
              <Form.Check className="mx-auto" type={"checkbox"} label={<span className='translate'>Employee?</span>} style={{display: 'flex', align: 'center'}} checked={isEmployee} onChange={(e) => setEmployee(e.target.checked)} />
            </Form.Group>
            <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
              <Link to={'/Home'}>
                <Button className="btn btn-primary mx-3 mt-3" style={{width:'100%'}} variant="primary" type="submit" disabled={!infoCompleted()} onClick={registerLogin}><span className='translate'>Login</span></Button>
              </Link>
            
              <Link to={'/Register'}><Button className="mx-3 mt-3"  style={{width:'90%'}} variant="link"><span className='translate'>Need to Register?</span></Button></Link>
            </div>
            <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
                <Button className="btn btn-primary mx-3 mt-3" style={{width:'50%'}} onClick={() => login()}><span className='translate'>Login With Google</span></Button>
            </div>
          </Form>)
        }
        {(localStorage.getItem('isLoggedIn') === 'true') &&
          (<Form>
            <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            {(!isEmployee) && 
              <div style={{color: 'blue', fontSize: '40'}}><span className='translate'>Welcome, {localStorage.getItem('user')}!</span></div>
            }
            {(isEmployee) && (!isManager) && 
              <div style={{color: 'blue', fontSize: '40'}}><span className='translate'>Welcome, Server!</span></div>
            }
            {(isEmployee) && (isManager) &&
              <div style={{color: 'blue', fontSize: '40'}}><span className='translate'>Welcome, Manager!</span></div>
            }
            </div>
            <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <Link to={'/Home'}>
              <Button className="btn btn-primary mx-auto mt-1 mb-3" variant="primary" type="button" style={{width: '100%'}} onClick={changeLog}><span className='translate'>Back To Home</span></Button>
            </Link>
            </div>
            <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <div style={{color: 'blue', fontSize: '40'}}><span className='translate'>Need to Log Out?</span></div>
            </div>
            <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <Link to={'/Login'}>
              <Button className="btn btn-primary mx-auto mt-1" variant="primary" type="button" style={{width: '100%'}} onClick={logOut}><span className='translate'>Log Out</span></Button>
            </Link>
            </div>
            {(logoutFailure) &&
              <Form.Group className="mt-3 mx-auto" controlId="emailUsage">
                <Form.Label style={{color: 'red',}}><span className='translate'>Logout Failed. Perhaps You Signed In Without Google?</span></Form.Label>
              </Form.Group>
            }
            
          </Form>)
        }
      </GoogleOAuthProvider>
      </div>
  );
};
  
  export default Login;