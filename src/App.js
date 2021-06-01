import React, {useState, useEffect} from 'react';
import './App.css';
import Board from "./Board";
import {Button} from "@material-ui/core";


function App() {
  
  const [board, setBoard] = useState(new BoardMaker(true))
  
  const generateBoard = ()=>{
    //logic to accompany
    setBoard(new BoardMaker(true));
    console.log('New Board: ', board);
  }
  return (
    <div className="App">
      <Board board={board}/>
      <Button onClick={()=>generateBoard}>Generate!</Button>
    </div>
  );
}

class BoardMaker{
  constructor(defaultBoard) {
    if (defaultBoard) {
      this.board = generateDefaultBoard();
    } else {
      this.board = generateExtendedBoard();
    }
  
  
    function generateDefaultBoard() {
      
      let numberList = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12,1];
      let resourceTypeList=[0,0,0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5]
      let board={};
      //randomly assign
      for(let i = 0; i< 19;i++){
        // let index = Math.floor(Math.random() * numberList.length);
        // board[i].number=numberList.splice(index, 1)[0];
        // index = Math.floor(Math.random() * resourceTypeList.length);
        // board[i].type=resourceTypeList.splice(index, 1)[0];
        
        let hexData = {
          number:numberList.splice(Math.floor(Math.random() * numberList.length), 1)[0],
          type:resourceTypeList.splice(Math.floor(Math.random() * resourceTypeList.length), 1)[0],
        };
        board[i]=hexData;
      }
      console.log('Board Generated: ', board);
      return board;
      
    }
    function generateExtendedBoard(){
    
    }
  
  }
}

export default App;
