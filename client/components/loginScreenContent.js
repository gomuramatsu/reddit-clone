import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./style";
import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';
import Router from 'next/router'

class LoginScreenContent extends Component {
    

    render() {
        var userInput = React.createRef(); 
        var passInput = React.createRef(); 

        // Initialize Firebase
        console.log(firebaseConfig);
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        return (
            <Form style={styles.LoginFormPadding} onSubmit={
                e => {
                    e.preventDefault();
                    var user = (userInput.current == null ? '' : userInput.current.value);
                    var pass = (passInput.current == null ? '' : passInput.current.value);
                    console.log(userInput);
                    console.log(user);
                    console.log(pass);
                    const auth = firebase.auth();

                    const promise = auth.signInWithEmailAndPassword(user, pass);
                    promise.catch(e => console.log(e.message));

                    firebase.auth().onAuthStateChanged(firebaseUser => {
                        if (firebaseUser){
                            console.log(firebaseUser.uid);
                            console.log(firebaseUser);
                            Router.push('/');
                        } else {
                            console.log('login failed');
                        }
                    })

                }
              }>
                <h3 style={styles.LogInFormTitle}>Log In</h3>
                <Form.Group controlId="loginFormUser">
                    <Form.Control ref={userInput} type="text" placeholder="Email"/>
                </Form.Group>
                <Form.Group controlId="loginFormPass"> 
                    <Form.Control ref={passInput} type="password" placeholder="Password"/>
                </Form.Group>
                <Button style={styles.LoginFormButton} variant="primary" type="submit">
                    Log In
                </Button>
                <a href="/signup">Sign up here</a>
              </Form>
        )
    }
}

export default LoginScreenContent; 