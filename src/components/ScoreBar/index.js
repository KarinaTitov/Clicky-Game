import React from "react";
import "./style.css";

function Nav(props) {
return <div className="navbar ">
   <h1>Clicky Game</h1>

<h3> {props.alert} </h3>
<div id="score">
  Score: {props.score} <span className="pipe">|</span> High Score: {props.topScore}
</div>
</div>

   ;
}

export default Nav;