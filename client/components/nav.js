import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class MainNavBar extends Component {
	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand>Go's Reddit</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Form inline>
						<FormControl type="text" placeholder="Search Reddit" className="mr-sm-2" />
						<Button variant="outline-primary">Search</Button>
					</Form>
					<Nav className="ml-auto">
						<Nav.Link href="/createPost">Create Post</Nav.Link>
						<Nav.Link href="/login">Log In</Nav.Link>
						<Nav.Link href="/signup">Sign up</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default MainNavBar; 