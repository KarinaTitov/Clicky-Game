import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <div className="card" key={props.id}>
      <div className="img-container choose" onClick={() => props.chooseFriend(props.id)}>
        <img alt={props.name} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FriendCard;
