import React, {Component} from "react";

function Button (props){
  return (
    <button className={"regularButton " + props.additionalClassName}>
        {props.text}
    </button>
  )
};

// const mapStateToProps = function(state) {
//   return {
//       username: state.username,
//       loggedIn: state.loggedIn
//   }
// }

export default Button; //connect(mapStateToProps)(Button);