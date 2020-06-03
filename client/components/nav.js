import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';
import UserAction from '../components/util/actions/userActions';

function MainNavBar (props) {
	console.log('drawing navBAR');
	console.log(props);

	// Initialize Firebase
    console.log(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href={"/"}>
				Geddit
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Form inline>
					<FormControl type="text" placeholder="Search Reddit" className="mr-sm-2" />
					<Button variant="outline-primary">Search</Button>
				</Form>
				<Nav className="ml-auto">
					{ !props.loggedIn ? '' :<Nav.Link>Logged in as {props.username}</Nav.Link>}
					{ !props.loggedIn ? '' :<Nav.Link href="/createPost">Create Post</Nav.Link>}
					
					{ !props.loggedIn ? '' :
						<Nav.Link onClick={
						e => {
							console.log('log out CLICKED');
							firebase.auth().signOut().then(function() {
								// Sign-out successful.
								console.log('sign out successful!');
								props.dispatch(UserAction.logout());
							}, function(error) {
								console.log('sign out FAILED');
							});
						}}>Log Out</Nav.Link>
					}
					{ props.loggedIn ? '' :<Nav.Link href="/login">Log In</Nav.Link>}
					{ props.loggedIn ? '' :<Nav.Link href="/signup">Sign up</Nav.Link>}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

const mapStateToProps = function(state) {
    console.log(state);
    return {
        username: state.username,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(MainNavBar);