import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styles from "./style";
// import upvote from './assets/up.png';
// import downvote from './assets/down.png';

class Score extends Component {
	render() {
		return (
			<div style={styles.VoteContainer}>
                <img src={require('./assets/up.png')}  />
				
                <div>{this.props.score}</div>
				<img src={require('./assets/down.png')}  />
            </div>
		)
	}
}

export default Score; 