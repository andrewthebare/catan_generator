import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Board from "./Board";
import {Button} from "@material-ui/core";

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

function App() {
  
  const [board, setBoard] = useState(null)
  const [visible, setVisible] = useState(false);
  
  const generateBoard = ()=>{
    //logic to accompany
    //pull down UI props
    let boardRules={
      defaultSize: document.getElementById('standardGame').checked,
      noRed: !document.getElementById('redNeighbors').checked,
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
    <div className={classes.app}>
      <br/>
      <SidebarRules onClick={()=>generateBoard()}/>
      {boardReturn()}
      <Button onClick={()=>generateBoard()}>Generate!</Button>
    </div>
  );
}

export function SidebarRules(props){
  const [value, setValue] = React.useState('standard');
  
  const handleChange = (event) => {
    setValue(event.target.value);
    
  };
  
  const classes = useStyles();
  return(
    <div className={classes.rulesHolder}>
      {/*<h2 className={classes.ruleTitle}>Rules</h2>*/}
      <FormControl>
        <h2 className={classes.ruleTitle}>Game Rules</h2>
          <RadioGroup value={value} onChange={handleChange}>
            <h4>Game Size</h4>
            <FormControlLabel value="standard" control={<Radio id={'standardGame'} name={'standardGame'}/>}  label="Standard (2-4 players)" />
            <FormControlLabel value="extended" control={<Radio />} label="Extended (5-6 Players)" />
          </RadioGroup>
        <h4>Generator Rules</h4>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox id={'redNeighbors'}/>}
            label="Allow Red Neighbors"
          />
          <FormControlLabel
            control={<Checkbox id={'resourceClumping'}/>}
            label="Allow Reds to be on 3+ same resources"
          />
          <FormControlLabel
            control={<Checkbox id={'resourceClumping'}/>}
            label="Allow 3 Same Resource Intersections"
          />
        </FormGroup>
      </FormControl>
      <Button onClick={()=> props.onClick()}>Generate!</Button>
    </div>
  );
}

const useStyles = makeStyles({
  app:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  board:{
    visibility : props => props.visible,
    flex:3,
  },
  rulesHolder:{
    minWidth:'20%',
    display: "flex",
    flexDirection: "column",
    border: '3px solid black',
    
    textAlign:"center"
  },
  ruleTitle:{
    textAlign:"center",
    backgroundColor:'#cc4444'
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
      let resourceTypeList=[0,0,0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12],[3,4,7,9,12,13],[4,5,8,10,13,14],[5,6,9,11,14,15],[6,10,15],[7,8,13,16],[8,9,12,14,16,17],[9,10,13,15,17,18],[10,11,14,18],[12,13,17],[16,13,14,18],[14,15,17]];
      let board={};
      
      if (BoardRules.noRed){
        let possible = spots;
        for(let i = 0; i < 4; i++){
          let pos = possible.popRandom()[0];
          board[pos] = {
            id:pos,
            number:reds[i],
            type:resourceTypeList.popRandom()[0],
          }
          spots = spots.filter(function (e){
            return e!==pos
          })
          possible = possible.filter(function(e){
            return !neighbors[pos].includes(e);
          })
        }
      }
      else{
        numberList.push(6,6,8,8);
      }
      
      
  
      //fill in the rest randomly
      // console.log('board reds', board);
      for(let i = 0; i < spots.length;){
        let num=spots.popRandom()[0];
        let number = numberList.popRandom()[0];
        board[num]={
          id:num,
          number:number,
          type:number ===1 ? 5:resourceTypeList.popRandom()[0],
        }
        // console.log('info',board[num]);
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
