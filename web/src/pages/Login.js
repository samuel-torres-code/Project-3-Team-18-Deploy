import bootstrap from "bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  //initialize necessary settings for useState functions
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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

  //In the event we need to immediately clear for some reason
  const clearValues = () => {
    setEmail('');
    setPass('');
    setUser('');
  };

  //cancel default login button function and handle it ourself
  const registerLogin = (event) => {
    event.preventDefault();

    //create json here

    clearValues();
  };

  //need the user onChange to call multiple functions
  const multiSet = (event) => {
    this.setEmail(event);
    this.setUser(event);
  }

  return(
    <Form>

      <Form.Group className="mt-3 mx-auto" controlId="loginUser" style={{width: '50%'}}>
        <Form.Label>Email or Username</Form.Label>
        <Form.Control type="email" placeholder="Email or Username" value={{user, email}} onChange={(this.multiSet(user))}/>
      </Form.Group>

      <Form.Group className="mt-3 mx-auto" controlId="loginPass" style={{width: '50%'}}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={pass} onChange={this.changePass(pass)}/>
      </Form.Group>

      <Link to={'/Home'}>
        <Button className="btn btn-primary mx-3 mt-3" variant="primary" type="submit" style={{width: '20%'}} onClick={() => this.registerLogin}>Login</Button>
      </Link>

      <Link to={'/Register'}><Button className="btn btn-primary mx-3 mt-3" type="button" style={{width: '20%'}}>Register</Button></Link>

    </Form>
  );
  
};
  


  export default Login;