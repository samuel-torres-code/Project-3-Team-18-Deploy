import bootstrap from "bootstrap";
import { useState, useEffect } from "react";
import { Link, useAsyncError } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL } from "../API";

var reg = "a";

const Register = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [registered, setIsRegistered] = useState('');
  const client = axios.create({
    baseURL: API_URL
  })

  //login persistency
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setIsRegistered(loggedInUser);
    }
  }, []);

  /** Set the reg component for the system, allows us to check for registration statuses
   *  @returns
   */
  function setReg(){
    reg = "a";
  }

  /** Ensure that the username, email, password, and confirmation password have actually been filled
   *  @returns bool with the above state
   */
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

  /**
   * Take care of the user registration - new account if email not in use, otherwise flag the customer they already have an account
   * @param {event} event 
   * @returns
   */
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
      localStorage.setItem('log', 'b');
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
    window.location.reload();
  };


  return(
    <div>
      {((localStorage.getItem('isLoggedIn') === 'false') || (localStorage.getItem('isLoggedIn') === null)) && 
        <Form>

        <Form.Group className="mt-3 mx-auto" controlId="registerEmail" style={{width: '50%'}}>
            <Form.Label><span className='translate'>Email</span></Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={changeEmail} />
        </Form.Group>
  
        <Form.Group className="mt-3 mx-auto" controlId="registerUser" style={{width: '50%'}}>
            <Form.Label><span className='translate'>Username</span></Form.Label>
            <Form.Control type="username" placeholder="Username" value={user} onChange={changeUser} />
        </Form.Group>
  
        <Form.Group className="mt-3 mx-auto" controlId="registerPass" style={{width: '50%'}}>
            <Form.Label><span className='translate'>Password</span></Form.Label>
            <Form.Control type="password" placeholder="Password" value={pass} onChange={changePass} />
        </Form.Group>
  
        <Form.Group className="mt-3 mx-auto" controlId="registerConfirmPass" style={{width: '50%'}}>
            {confPass.length === 0 &&
              <Form.Label><span className='translate'>Confirm Password</span></Form.Label>
            }
            {!(confPass === pass) && pass.length > 0 && confPass.length > 0 &&
              <Form.Label style={{color: 'red',}}><span className='translate'>Passwords Do Not Match</span></Form.Label>
            }
            {(confPass === pass) && pass.length > 0 && confPass.length > 0 &&
              <Form.Label style={{color: 'blue',}}><span className='translate'>Passwords Match</span></Form.Label>
            }
            <Form.Control type="password" placeholder="Password" value={confPass} onChange={changeConfPass} />
            
        </Form.Group>
  
        {(!registered) && (reg === "b") &&
          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <Form.Group className="mt-3 mx-auto" controlId="emailUsage">
              <Form.Label style={{color: 'red',}}><span className='translate'>Email Already in Use</span></Form.Label>
            </Form.Group>
          </div>
        }
        <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
          <Link to={'/Home'}><Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '100%'}} disabled={!infoCompleted()} onClick={registerRegistration}><span className='translate'>Register</span></Button></Link>
          <Link to={'/Login'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '100%'}} onClick={setReg}><span className='translate'>Back to Login</span></Button></Link>
        </div>
        </Form>
      }
      {(localStorage.getItem('isLoggedIn') === 'true') && 
        <Form>
          <div className="mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <div style={{color: 'blue', fontSize: '40'}}><span className='translate'>Thanks For Signing Up!</span></div>
          </div> 
          <div className="mt-3 mx-auto d-flex align-self-center" style={{justifyContent:'center', alignItems:'center'}}>
            <Form.Group>
              <Link to={'/Home'}>
                <Button className="btn btn-primary" variant="primary" type="button" style={{width: '100%'}}><span className='translate'>Back To Home</span></Button>
              </Link>
            </Form.Group>
          </div>
        </Form>
      }
    </div>
  );
};
    
  export default Register;