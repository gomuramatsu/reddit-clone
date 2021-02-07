import React, {Component} from "react";
import styles from "./style";
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";
import up from '../styles/assets/up.png';
import down from '../styles/assets/down.png';

const ADD_VOTE = gql`
  mutation addVote ($id: String!, $vote: Int!){
    addVote (id: $id, vote: $vote) {
      id
      score
    }
  }
`;

const ADD_COMMENT_VOTE = gql`
  mutation addCommentVote ($id: String!, $vote: Int!){
    addCommentVote (id: $id, vote: $vote) {
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
		if (this.props.type == "comment"){
			this.mutate({
				mutation: ADD_COMMENT_VOTE,
				variables: { id, vote }
			}).then((voteReturnPost) => console.log(voteReturnPost.data));
		} else {
			this.mutate({
				mutation: ADD_VOTE,
				variables: { id, vote }
			}).then((voteReturnPost) => console.log(voteReturnPost.data));
		}
	}

	render() {
		return (
			<div className="voteContainer">
				<img onClick={() => this.onClickVoteArrow(1)} src={up}  />
                <div className="scoreNumberFont">{this.props.score}</div>
				<img onClick={() => this.onClickVoteArrow(-1)} src={down}  />
            </div>
		)
	}
}

export default withApollo(Score); 