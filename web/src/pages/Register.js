// import bootstrap from "bootstrap";
// import { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  return(
      <Form>

      <Form.Group className="mt-3 mx-auto" controlId="registerEmail" style={{width: '50%'}}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group className="mt-3 mx-auto" controlId="registerUser" style={{width: '50%'}}>
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" />
      </Form.Group>

      <Form.Group className="mt-3 mx-auto" controlId="registerPass" style={{width: '50%'}}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mt-3 mx-auto" controlId="registerConfirmPass" style={{width: '50%'}}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Link to={'/Home'}><Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '20%'}}>Register</Button></Link>
      <Link to={'/Login'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '20%'}}>Back to Login</Button></Link>

      </Form>
  );
};
    


  export default Register;