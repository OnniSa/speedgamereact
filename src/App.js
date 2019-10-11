import React, {Component} from 'react';
import './App.css';
import Circle from './Circle/Circle';
import GameOver from './GameOver/GameOver';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class App extends Component {
  state = {
    score: 0,
    current: 0,
    rounds: 0,
    showGameOver: false
  };

  pace = 1500;
  timer = undefined;

  next = () => {

    if (this.state.rounds >= 5 )  {
      this.endHandler();
      return;
    }

    let nextActive = undefined;

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);

    this.setState({
      current:nextActive,
    });

    this.pace *= 0.95;
    this.timer = setTimeout(this.next.bind(this), this.pace);

    this.setState({
      rounds: this.state.rounds + 1
    });
    console.log(this.state.rounds);
  }

  clickHandler = (btnId) => {
    console.log('WOW!', btnId);
    
    if (this.state.current !== btnId) {
      this.endHandler();
      return;
    }

    this.setState({
      rounds:0
    });

    //this.setState({score: this.state.score + 1}) tai näin
    this.setState(prevState => {
      return{
        score: prevState.score + 1
      }})
  }

  startHandler = () => {
    this.next();
  }
  
  endHandler = () => {
    clearTimeout(this.timer);
    this.setState({
      showGameOver: true
    })
  }

  render() {
  return (
    <div>
      <h1>Nopeuspeli</h1>
      <p>Your score is: {this.state.score}</p>
        <Circle 
        buttonColor='green'
        active={this.state.current === 1}
        click={() => this.clickHandler(1)} 
        />
        <Circle 
        buttonColor='red'
        active={this.state.current === 2}
        click={() => this.clickHandler(2)} 
        />
        <Circle 
        buttonColor='yellow'
        active={this.state.current === 3}
        click={() => this.clickHandler(3)} 
        />
        <Circle 
        buttonColor='blue'
        active={this.state.current === 4}
        click={() => this.clickHandler(4)} 
        />

      <div>
        <button onClick={this.startHandler}>Start Game</button>
        <button onClick={this.endHandler}>End Game</button>
      </div>

    {this.state.showGameOver && <GameOver score={this.state.score} />}

    </div>
  );
}};

export default App;
