import React, {Component} from "react";
import styles from "./style";
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";

const ADD_VOTE = gql`
  mutation addVote ($id: String!, $vote: Int!){
    addVote (id: $id, vote: $vote) {
      id
      score
    }
  }
`;

class Score extends Component {
	constructor(props){
		super(props);
		this.mutate = props.client.mutate;
		this.onClickVoteArrow = this.onClickVoteArrow.bind(this);
	}

	onClickVoteArrow = (vote) => {
		var id = this.props.id;
		this.mutate({
			mutation: ADD_VOTE,
			variables: { id, vote }
		}).then((voteReturnPost) => console.log(voteReturnPost.data));
	}

	render() {
		return (
			<div style={styles.VoteContainer}>
                <img onClick={() => this.onClickVoteArrow(1)} src={require('./assets/up.png')}  />
				
                <div>{this.props.score}</div>
				<img onClick={() => this.onClickVoteArrow(-1)} src={require('./assets/down.png')}  />
            </div>
		)
	}
}

export default withApollo(Score); 