import bootstrap from "bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Login = () => {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="loginUser">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control type="email" placeholder="Email or Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginpass">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  };
  
  export default Login;