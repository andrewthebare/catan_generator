import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Board from "./Board";
import {Button} from "@material-ui/core";
import {red} from "@material-ui/core/colors";


function App() {
  
  const [board, setBoard] = useState(null)
  const [visible, setVisible] = useState(false);
  
  const generateBoard = ()=>{
    //logic to accompany
    //pull down UI props
    let boardRules={
      defaultSize:false,
      noRed:false,
      resourceShareReds:true,
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
      let oneResource=[0,1,2,3,4]
      let resourceTypeList=[0,0,0,1,1,2,2,2,3,3,3,4,4];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12],[3,4,7,9,12,13],[4,5,8,10,13,14],[5,6,9,11,14,15],[6,10,15],[7,8,13,16],[8,9,12,14,16,17],[9,10,13,15,17,18],[10,11,14,18],[12,13,17],[16,13,14,18],[14,15,17]];
      let board={};

      //if no reds on same resources
      if (BoardRules.resourceShareReds){
        resourceTypeList.push(...oneResource);
        console.log('resourceTypeList',resourceTypeList)
      }

      //randomly assign
      if (BoardRules.noRed){
        let possible = spots;
        for(let i = 0; i < 4; i++){
          let pos = possible.popRandom()[0];
          board[pos] = {
            id:pos,
            number:reds[i],
            type:BoardRules.resourceShareReds? resourceTypeList.popRandom()[0] : oneResource.popRandom()[0],
          }
          spots = spots.filter(function (e){
            return e!==pos
          })
          possible = possible.filter(function(e){
            return !neighbors[pos].includes(e);
          })
          
        }

        //pop one randomly from the oneresource to give back to normal resources
        if (!BoardRules.resourceShareReds){
          resourceTypeList.push(oneResource.popRandom()[0]);
        }

        //fill in the rest randomly
        // console.log('board reds', board);
        for(let i = 0; i < spots.length;){
          let num=spots.popRandom()[0];
          let number = numberList.popRandom()[0];
          board[num]={
            id:num,
            number:number,
            type:number ===1 ? 5: number ===6 || number ===8? BoardRules.resourceShareReds? resourceTypeList.popRandom()[0] : oneResource.popRandom()[0] : resourceTypeList.popRandom()[0],
          }
          // console.log('info',board[num]);
        }
      }
      
      return board;
      
    }
    function generateExtendedBoard() {
      let spots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
      let numberList = [2,2,3,3,3,4,4,4,5,5,5,9,9,9,10,10,10,11,11,11,12,12,1,1];
      let reds = [6,6,8,8,6,8];
      let oneResource=[0,1,2,3,4]
      let resourceTypeList=[0,0,0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12],[3,4,7,9,12,13],[4,5,8,10,13,14],[5,6,9,11,14,15],[6,10,15],[7,8,13,16],[8,9,12,14,16,17],[9,10,13,15,17,18],[10,11,14,18],[12,13,17],[16,13,14,18],[14,15,17]];
      let board={};

      //if no reds on same resources
      if (BoardRules.resourceShareReds){
        resourceTypeList.push(...oneResource);
      }else{
        oneResource.push(resourceTypeList.popRandom()[0])
      }

      //randomly assign
      if (BoardRules.noRed){
        let possible = spots;
        for(let i = 0; i < 4; i++){
          let pos = possible.popRandom()[0];
          board[pos] = {
            id:pos,
            number:reds[i],
            type:BoardRules.resourceShareReds? resourceTypeList.popRandom()[0] : oneResource.popRandom()[0],
          }
          spots = spots.filter(function (e){
            return e!==pos
          })
          possible = possible.filter(function(e){
            return !neighbors[pos].includes(e);
          })

        }
      }else{
        numberList.push(...reds)
      }

        //fill in the rest randomly
        // console.log('board reds', board);
        console.log('Here')
        for(let i = 0; i < spots.length;){
          let num=spots.popRandom()[0];
          let number = numberList.popRandom()[0];
          board[num]={
            id:num,
            number:number,
            type:number ===1 ? 5: number ===6 || number ===8? BoardRules.resourceShareReds? resourceTypeList.popRandom()[0] : oneResource.popRandom()[0] : resourceTypeList.popRandom()[0],
          }
          console.log('info',board[num]);
        }


      return board;

    }

  }
}
//borrowed
Array.prototype.popRandom = function () {
  return this.splice(Math.floor(Math.random() * this.length), 1);
}

export default App;
