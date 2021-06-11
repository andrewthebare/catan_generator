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
    setVisible(!visible);
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
  
  // useEffect(() => {
  //   setVisible(false);
  // }, []);
  
  
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
      let spots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
      let numberList = [2,3,3,4,4,5,5,9,9,10,10,11,11,12,1];
      let reds = [6,6,8,8];
      let resourceTypeList=[0,0,0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12],[3,4,7,9,12,13],[4,5,8,10,13,14],[5,6,9,11,14,15],[6,10,15],[7,8,13,16],[8,9,12,14,16,17],[9,10,13,15,17,18],[10,11,14,18],[12,13,17],[16,13,14,18],[14,15,17]];
      let board={};
      //randomly assign
      if (BoardRules.noRed){
        // for (var i = 0; i < toPlace.length; i++) {
        //   var pos = possibilities.popRandom();
        //   pieces[pos].number = toPlace[i];
        //   possibilities = possibilities.filter(function(e) {
        //     return !adjacent[pos].includes(e);
        //   });
        // }
        let possible = spots;
        for(let i = 0; i < 4; i++){
          let pos = possible.popRandom()[0];
          board[pos] = {
            id:pos,
            number:reds[i],
            type:resourceTypeList.popRandom()[0],
          }
          spots = spots.filter(function (e){
            // console.log(e, 'pos: '+ pos);
            return e!==pos
          })
          console.log(spots);
          // console.log('possible before',possible)
  
          possible = possible.filter(function(e){
            return !neighbors[pos].includes(e);
          })
          
          // console.log('possible',possible)
        }
        
        //fill in the rest randomly
        // console.log('board reds', board);
        for(let i = 0; i < spots.length;){
          let num=spots.popRandom()[0];
          board[num]={
            id:num,
            number:numberList.popRandom()[0],
            type:resourceTypeList.pop(),
          }
          // console.log('info',board[num]);
        }
      }
      
      return board;
      
    }
    function generateExtendedBoard(){
    
    }
  
  }
}
//borrowed
Array.prototype.popRandom = function () {
  return this.splice(Math.floor(Math.random() * this.length), 1);
}

export default App;
