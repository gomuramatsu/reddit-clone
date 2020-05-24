import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./style";
import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';

class SignUpScreenContent extends Component {
    

    render() {
        var userInput = React.createRef(); 
        var passInput = React.createRef(); 
        var passConfirmationInput = React.createRef(); 
        
        // Initialize Firebase
        console.log(firebaseConfig);
        // firebase.initializeApp(firebaseConfig);
        // firebase.analytics();
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }

        return (
            <Form style={styles.LoginFormPadding} onSubmit={
                e => {
                  e.preventDefault();
                  var user = (userInput.current == null ? '' : userInput.current.value);
                  var pass = (passInput.current == null ? '' : passInput.current.value);
                  var passConfirmation = (passConfirmationInput.current == null ? '' : passConfirmationInput.current.value);
                  console.log(userInput);
                  console.log(user);
                  console.log(pass);
                  console.log(passConfirmation);
                  console.log(firebaseConfig);

                  if (pass == passConfirmation)
                  {
                    const auth = firebase.auth();
                    console.log(auth);

                    const promise = auth.createUserWithEmailAndPassword(user, pass);
                    promise.catch(e => console.log(e.message));
                  }
                }
              }>
                <h3 style={styles.LogInFormTitle}>Sign Up</h3>
                <Form.Group controlId="loginFormUser">
                    <Form.Control ref={userInput} type="email" placeholder="Email"/>
                </Form.Group>
                <Form.Group controlId="loginFormPass"> 
                    <Form.Control ref={passInput} type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group controlId="loginFormPassConfirmation"> 
                    <Form.Control ref={passConfirmationInput} type="password" placeholder="Confirm Password"/>
                </Form.Group>
                <Button style={styles.LoginFormButton} variant="primary" type="submit">
                    Log In
                </Button>
                <a href="/login">Log in here</a>
              </Form>
        )
    }
}

export default SignUpScreenContent; 