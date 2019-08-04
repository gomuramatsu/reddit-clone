import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';

class Navbar extends Component {
    render() {
        return (
            <Nav>
                <Nav.Item>
                    <Nav.Link disabled>Reddit</Nav.Link>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default Navbar; 