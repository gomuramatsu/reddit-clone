import React, {Component} from "react";
import Input from './Input';
import Button from './Button';
import styles from "./style";
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import Router from 'next/router';
import UserAction from '../components/util/actions/userActions';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks' // https://github.com/apollographql/apollo-client/issues/2042#issuecomment-509041949


// const client = new ApolloClient({
//     uri: "http://localhost:4000/"
// });

const IS_USERNAME_ALREADY_TAKEN = gql`
  query isUsernameAlreadyTaken ($username: String!){
    isUsernameAlreadyTaken (username: $username) {
        userExists
    }
  }
`;

const ADD_USER = gql`
  mutation addUser ($username: String!, $firebaseUID: String!){
    addUser (username: $username, firebaseUID: $firebaseUID) {
        username
        firebaseUID
    }
  }
`;

function SignUpScreenContent(props) {
    var usernameInput = React.createRef();
    var emailInput = React.createRef(); 
    var passInput = React.createRef(); 
    var passConfirmationInput = React.createRef(); 
    
    // Initialize Firebase
    console.log(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    console.log('SIGN UP PROPS');
    console.log(props);

    return (
            <form  className="loginContainer" onSubmit={
                e => {
                    e.preventDefault();
                    var username = (usernameInput.current == null ? '' : usernameInput.current.value);
                    var email = (emailInput.current == null ? '' : emailInput.current.value);
                    var pass = (passInput.current == null ? '' : passInput.current.value);
                    var passConfirmation = (passConfirmationInput.current == null ? '' : passConfirmationInput.current.value);

                    // check if the 2 password fields are identical
                    if (pass == passConfirmation)
                    {
                        // check the db if username is available
                        var lols = props.client.query({
                            query:IS_USERNAME_ALREADY_TAKEN,
                            variables: {
                                username: username
                            }
                        }).then( r => {
                            // if username is valid, firebase authentication signup
                            if (!r.data.isUsernameAlreadyTaken.userExists)
                            {
                                console.log('USERNAME IS VALID!!');
                                const auth = firebase.auth();
                                console.log(auth);

                                const createUserPromise = auth.createUserWithEmailAndPassword(email, pass);

                                // todo - display error
                                createUserPromise.catch(e => console.log(e.message));

                                firebase.auth().onAuthStateChanged(firebaseUser => {
                                    if (firebaseUser){
                                        console.log(firebaseUser.uid);
                                        console.log(firebaseUser);

                                        firebaseUser.updateProfile({
                                            displayName: username
                                        });

                                        updateStateWithUser(props, firebaseUser, username);
                                        updateDBWithUser(props, firebaseUser, username);

                                        Router.push('/');
                                    } else {
                                        console.log('login failed');
                                    }
                                });
                            }
                        });
                    }
                }
            }>
                <h3 style={styles.LogInFormTitle}>Sign Up</h3>
                <Input additionalClassName="loginTextInput" type="text" placeholder="Username"/>
                <Input additionalClassName="loginTextInput" ref={emailInput} type="text" placeholder="Email"/>
                <Input additionalClassName="loginTextInput" ref={passInput} type="password" placeholder="Password"/>
                <Input additionalClassName="loginTextInput" ref={passConfirmationInput} type="password" placeholder="Confirm Password"/>
                <Button additionalClassName="loginSubmitButton" text="Sign Up" type="submit" />
                <a href="/login">Log in here</a>
            </form>
    )
}

function updateStateWithUser(props, firebaseUser, username) {
    var userWrapper = {
        firebaseUser: firebaseUser,
        username: username
    }
    props.dispatch(UserAction.login(userWrapper));
}

function updateDBWithUser(props, firebaseUser, username) {
    props.client.mutate({
        mutation: ADD_USER,
        variables: { username: username, firebaseUID: firebaseUser.uid }
    }).then((returnData) => console.log(returnData));
}

const mapStateToProps = function(state) {
    return {
        username: state.username,
        loggedIn: state.loggedIn
    }
  }

export default connect(mapStateToProps)(SignUpScreenContent);