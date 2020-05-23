import React, {Component} from "react";
import MainNavBar from '../components/nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./style";

class LoginScreenContent extends Component {
    

    render() {
        var userInput = React.createRef(); 
        var passInput = React.createRef(); 

        return (
            <Form style={styles.LoginFormPadding} onSubmit={
                e => {
                  e.preventDefault();
                  var user = (userInput.current == null ? '' : userInput.current.value);
                  var pass = (passInput.current == null ? '' : passInput.current.value);
                  console.log(userInput);
                  console.log(user);
                  console.log(pass);
                }
              }>
                <Form.Group controlId="loginFormUser">
                    <Form.Control ref={userInput} type="text" placeholder="Email"/>
                </Form.Group>
                <Form.Group controlId="loginFormPass"> 
                    <Form.Control ref={passInput} type="password" placeholder="Password"/>
                </Form.Group>
                <Button style={styles.LoginFormButton} variant="primary" type="submit">
                    Log In
                </Button>
              </Form>
        )
    }
}

export default LoginScreenContent; 