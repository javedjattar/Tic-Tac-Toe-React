import React from "react";
import GridRow from "../GridRow";
import Header from "../Header";
import Footer from "../Footer";
import "./style.css"

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      playerTurn: "X",
      boardState:[
      ['','',''],
      ['','',''],
      ['','','']
    ],
  };
  this.playerClick = this.playerClick.bind(this);
}
  playerClick(i,j){
    if(this.state.boardState[i][j] === ''){
      const currBoardState = [...this.state.boardState];
      currBoardState[i][j] = this.state.playerTurn;
      this.setState({ 
        boardState : currBoardState,
        playerTurn : this.state.playerTurn === 'X' ? 'O' :'X' 
      });
      this.setState({});
    }
  }

  componentDidMount(){
    console.log("App is mounted");
  }
  componentDidUpdate() {
    let won = false;
        // Check For the rows
        for(let i=0;i<3;i++){
            won = true;

            for(let j =1; j<3;j++){
                if(this.state.boardState[i][j] !== this.state.boardState[i][j-1]){
                    won = false;
                    break;
                }
            }
            if(won && this.state.boardState[i][0] !== ''){
                return this.alertWin(this.state.boardState[i][0]);
            }
        }
        // Check for Columns
        for(let j=0; j<3; j++){
            won = true;

            for(let i =1; i<3;i++){
                if(this.state.boardState[i][j] !== this.state.boardState[i-1][j]){
                    won = false;
                    break;
                }
            }
            if(won && this.state.boardState[0][j] !== ''){
                return this.alertWin(this.state.boardState[0][j]);
            }
        }
        // check for forward diagonal
        won =true;
        for(let i=1;i<3;i++){  
            if(this.state.boardState[i][i] !== this.state.boardState[i-1][i-1]){   
                won = false;
                break;
            }
        }
        if(won && this.state.boardState[0][0] !== ''){
            return this.alertWin(this.state.boardState[0][0]);
        } 
        // check anti-diagnol
        won = true;
        for(let i=1; i<3; i++) {
            if(this.state.boardState[i][2-i] !== this.state.boardState[i-1][2-i+1]) {
                    won = false;
                    break;
                }
        }
        if(won && this.state.boardState[2][0]!== '') {
                return this.alertWin(this.state.boardState[2][0]);
        }
        // check for draw
        let draw = true;
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if(this.state.boardState[i][j] === '') {
                    draw = false;
                    break;
                }
            }
            if(draw === false) {
                break;
            }
        }
        if(draw) {
            return this.alertDraw();
        }
    }

    alertWin(playerWon) {
      if(playerWon === 'X') {
        alert('Congratulations! Player1 wins');
      }
      else {
        alert('Congratulations! Player2 wins');
      }
      this.resetGame();
    }

    alertDraw() {
      alert('Draw!');
      this.resetGame();
    }

    resetGame(){
      this.setState({
        playerTurn: "X",
        boardState:[
        ['','',''],
        ['','',''],
        ['','','']
      ],
    });

    }
  render() {
    return <div className="container">
      <Header/>
      <div id="board">
        {this.state.boardState.map((boardRow, rowIdx) => (
          <GridRow
            key={rowIdx} 
            row={boardRow}
            rowIdx ={rowIdx}
            playerClickCB ={this.playerClick}
          />
        ))}
        </div>
      <Footer turn = {this.state.playerTurn}/>
    </div>
    }
}


