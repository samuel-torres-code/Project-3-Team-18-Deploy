import bootstrap from "bootstrap";
import { useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');

  //update the user to the given user
  const changeUser = (event) => {
    setUser(event.target.value);
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

  //In the event we need to immediately clear for some reason
  const clearValues = () => {
    setEmail('');
    setPass('');
    setUser('');
    setConfPass('');
  };

  //cancel default login button function and handle it ourself
  const registerLogin = (event) => {
    event.preventDefault();

    //create json here

    clearValues();
  };


  return(
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
            <Form.Label style={{color: 'red'}}>Passwords Do Not Match</Form.Label>
          }
          {(confPass === pass) && pass.length > 0 && confPass.length > 0 &&
            <Form.Label style={{color: 'blue'}}>Passwords Match</Form.Label>
          }
          <Form.Control type="password" placeholder="Password" value={confPass} onChange={changeConfPass} />
          
      </Form.Group>

      <Link to={'/Home'}><Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '20%'}}>Register</Button></Link>
      <Link to={'/Login'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '20%'}}>Back to Login</Button></Link>

      </Form>
  );
};
    


  export default Register;