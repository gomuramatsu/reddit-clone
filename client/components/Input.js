import React, {Component} from "react";

function Input (props){
  return (
    <input type={props.type} className={"textInput " + props.additionalClassName} placeholder={props.placeholder} />
  )
};

// const mapStateToProps = function(state) {
//   return {
//       username: state.username,
//       loggedIn: state.loggedIn
//   }
// }

export default Input; //connect(mapStateToProps)(Button);