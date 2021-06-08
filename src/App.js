import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Board from "./Board";
import {Button} from "@material-ui/core";


function App() {
  
  const [board, setBoard] = useState(null)
  const [visible, setVisible] = useState(false);
  
  const generateBoard = ()=>{
    //logic to accompany
    //pull down UI props
    let boardRules={
      defaultSize:true,
      noRed:true,
    };
    setBoard(new BoardMaker(boardRules));
    setVisible(true);
    console.log('New Board: ', board);
  }

  const boardReturn = ()=>{
    let toReturn=[];

    if (visible){
      toReturn.push(
          <Board board={board}/>
      )
    }else{
      toReturn.push(
          <div>
            <h3>LOADING</h3>
          </div>
      )
    }

    return toReturn;
  }

  const classes = useStyles({visible});
  return (
    <div className="App">
      {boardReturn()}
      <Button onClick={()=>generateBoard()}>Generate!</Button>
    </div>
  );
}

const useStyles = makeStyles({
  board:{
    visibility : props => props.visible,
  }
})

class BoardMaker{
  constructor(BoardRules) {
    if (BoardRules.defaultSize) {
      this.board = generateDefaultBoard();
    } else {
      this.board = generateExtendedBoard();
    }
  
  
    function generateDefaultBoard() {
      
      let numberList = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12,1];
      let resourceTypeList=[0,0,0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12],[3,4,7,9,12,13],[4,5,8,10,13,14],[5,6,9,11,14,15],[6,10,15],[7,8,13,16],[8,9,12,14,16,17],[9,10,13,15,17,18],[10,11,14,18],[12,13,17],[16,13,14,18],[14,15,17]];
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
          neighbors: neighbors[i],
        };
        board[i]=hexData;
      }
      console.log('Random Board Generated: ', board);

      //TODO here is where we change based on modifiers
      if(BoardRules.noRed){
        for( let hex in board){
          console.log('Hex: ', hex);
          if(board[hex].number === 6 || board[hex].number ===8){
            console.log('FOUND A RED NUMBER');
            let redNeighbor = false;

            //check each neighbor for a red number
            for( let  i = 0; i < board[hex].neighbors.length; i++){
              let neighbor = board[board[hex].neighbors[i]];
              // console.log('Neighbor: ',neighbor);
              if (neighbor.number === 6 || neighbor.number === 8){
                console.log('WE HAVE A RED NEIGHBOR');
                redNeighbor = true;

              }
            }

            if(redNeighbor){
              //swap with first neighbor
              let neighbor = board[board[hex].neighbors[0]];
              let temp = board[hex];

              //keep neighbors the same
              temp.neighbors = neighbor.neighbors;
              neighbor.neighbors = board[hex].neighbors;

              console.log('neighbor',neighbor)
              console.log('temp',temp)


              //perform the swap
              board[hex]=neighbor;
              board[board[hex].neighbors[0]] = temp;

              console.log('New Board after Swap: ', board);
            }
          }
        }
      }
      return board;
      
    }
    function generateExtendedBoard(){
    
    }
  
  }
}

export default App;
