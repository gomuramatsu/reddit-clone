import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./style";
import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';
import Router from 'next/router';
import { connect } from 'react-redux';
import { userConsts } from '../components/util/constants/userConstants';
import UserAction from '../components/util/actions/userActions';

function LoginScreenContent (props) {
    var userInput = React.createRef(); 
    var passInput = React.createRef(); 

    // Initialize Firebase
    console.log(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    console.log(props);

    return (
        <Form style={styles.LoginFormPadding} onSubmit={
            e => {
                e.preventDefault();
                var user = (userInput.current == null ? '' : userInput.current.value);
                var pass = (passInput.current == null ? '' : passInput.current.value);

                console.log('clicked submit~');
                console.log(props);

                const auth = firebase.auth();

                const promise = auth.signInWithEmailAndPassword(user, pass);
                promise.catch(e => console.log(e.message));

                firebase.auth().onAuthStateChanged(firebaseUser => {
                    if (firebaseUser){
                        console.log(firebaseUser.uid);
                        console.log(firebaseUser);

                        // const loggedInUser = useSelector (state => state.user);
                        updateStateWithUser(props, firebaseUser);

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

function updateStateWithUser(props, firebaseUser) {
    props.dispatch(UserAction.login(firebaseUser));
}

const mapStateToProps = function(state) {
    return {
        user: state.user,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(LoginScreenContent);