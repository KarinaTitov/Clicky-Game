import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Grid from "./components/Grid"
import Title from "./components/Title";
import Nav from "./components/ScoreBar"
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    top: 0,
    alert: "DON'T CLICK TWICE"
  };
   shuffleFriends = () => {
    
    this.state.friends.sort(function(a, b){return 0.5 - Math.random()});
  }

  // console.log(friends)

  correctGuess = () => {

    var newScore = this.state.score + 1
    var newTopScore = Math.max(newScore, this.state.top);

    this.setState({
      score: newScore,
      alert: "YOU ARE DOING A GOOD JOB! KEEP IT UP!",
      top: newTopScore
    })
  }


  incorrectGuess = () => {

    this.shuffleFriends();
    this.setState({
      score: 0,
      alert: "OUCH! YOU CAN'T CLICK TWICE SAME CARD",
      friends
    })
  }

chooseFriend = async(id) => {
    var guessedCor = false;
    console.log(id)
    // Filter this.state.friends for friends with an id not equal to the id being chose
    await this.setState({
     friends: this.state.friends.map(friend => {
      var copy = { ...friend }
      if (copy.id === id) {
        if (!copy.clicked) {
          copy.clicked = true;
          guessedCor = true;
        }
      }
      return copy;
    })
    });

    if (guessedCor) {
      this.correctGuess();

    } else {
      this.incorrectGuess();
      
    }
this.shuffleFriends();
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (

      <Wrapper>  
        
         <Nav score={this.state.score}
            topScore={this.state.top}
            alert={this.state.alert}>         
        </Nav>      
        
        
        <Grid>
     
       
     

        <Title>
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
        </Grid>
    </Wrapper>
    );
  }
}

export default App;
