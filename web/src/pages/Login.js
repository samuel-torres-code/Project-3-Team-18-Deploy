import bootstrap from "bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  return(
    <Form>

      <Form.Group className="mt-3 mx-auto" controlId="loginUser" style={{width: '50%'}}>
        <Form.Label>Email or Username</Form.Label>
        <Form.Control type="email" placeholder="Email or Username" />
      </Form.Group>

      <Form.Group className="mt-3 mx-auto" controlId="loginPass" style={{width: '50%'}}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Link to={'/Home'}><Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '20%'}}>Login</Button></Link>
      <Link to={'/Register'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '20%'}}>Register</Button></Link>

    </Form>
  );
};
  


  export default Login;