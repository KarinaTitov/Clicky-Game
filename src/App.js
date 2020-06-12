import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Nav from "./components/ScoreBar"
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    top: 0
  };

  // for(let i = array.length — 1; i > 0; i--){
  // const j = Math.floor(Math.random() * i)
  // const temp = array[i]
  // array[i] = array[j]
  // array[j] = temp
  // }
  shuffleFriends = (friends) => {
    friends = friends.map((f) => {
      return  {...f}
    })
    var newFriends = [];
    for (var i = 0; i < friends.length; i++) {

      let friendIndex = Math.floor(Math.random() * friends.length);
      var randomFriend = friends[friendIndex];

      newFriends.push(randomFriend);
      friends.splice(friendIndex, 1);




      console.log(randomFriend)
      console.log("------------------------------------------------")
      console.log(newFriends)
      console.log("------------------------------------------------")
      console.log(friends)
      // console.log( friends.splice(friendIndex, 1))
      // console.log("------------------------------------------------")
      // console.log(friendIndex)
      // console.log("------------------------------------------------")
      // console.log(randomFriend)
      // console.log("------------------------------------------------")
    }


    return newFriends;

  }

  // console.log(friends)






  correctGuess = (friends) => {

    var newScore = this.state.score + 1
    var newTopScore = Math.max(newScore, this.state.top);

    this.setState({
      score: newScore,
      top: newTopScore
    })
  }


  incorrectGuess = () => {

    alert("Already been clicked");

    this.setState({
      score: 0,
      friends
    })
  }

  chooseFriend = (id) => {
    var guessedCor = false;
    console.log(id)
    // Filter this.state.friends for friends with an id not equal to the id being chose
    const friends = this.state.friends.map(friend => {
      var copy = { ...friend }
      if (copy.id === id) {
        if (!copy.clicked) {
          copy.clicked = true;
          guessedCor = true;
        }
      }
      return copy;
    });

    if (guessedCor === true) {
      this.correctGuess(friends);
    } else {
      this.incorrectGuess(friends);
    }

    var shuffledFriends = this.shuffleFriends(friends);

    //  console.log(shuffledFriends)
    // Set this.state.friends equal to the new friends array
    this.setState({ friends: shuffledFriends });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Nav>
          <ul>
            Score: {this.state.score}
          Top Score: {this.state.top}
          </ul>
        </Nav>

        <Title>
          <h1>Clicky Game</h1>
          <p>Click on an image to earn points, but don't click on any more than once!</p>
        </Title>
        {this.state.friends.map(friend => (
          <FriendCard
            chooseFriend={this.chooseFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
