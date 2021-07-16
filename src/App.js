import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Board from "./Board";
import {Button} from "@material-ui/core";
import HeaderBar from "./HeaderBar";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


function App() {
  
  const [board, setBoard] = useState(new BoardMaker({defaultSize: true, noRed: true, resourceShareReds: false}))
  const [visible, setVisible] = useState(0);
  
  const[boardRules, setRules] = useState({
    defaultSize: true,
    noRed: true,
    resourceShareReds:false,
  })
  
  const generateBoard = ()=>{
    //logic to accompany
    //pull down UI props
    
    let newRules = {
      defaultSize: document.getElementById('standardGame').checked,
      noRed: !document.getElementById('redNeighbors').checked,
      resourceShareReds: document.getElementById('resourceClumping').checked,
    }
    
    setRules(newRules)
    
    setBoard(new BoardMaker(newRules));
    setVisible(1);
    console.log('New Board: ', board);
  }

  const boardReturn = ()=>{
    let toReturn=[];

    console.log('visibility', visible);
    
    if (visible === 0){
      let newRules = {
        defaultSize: true,
        noRed: true,
        resourceShareReds: false,
      }
      let b = new BoardMaker(newRules)
      console.log('b',b);
      // setBoard(b)
      toReturn.push(
        <Board board={b} standardSize={boardRules.defaultSize}/>
      )
    }
    else if(visible === 1){
      toReturn.push(
          <div>
            <h3>LOADING</h3>
          </div>
      )
    }
    else {
      toReturn.push(
          <Board board={board} standardSize={boardRules.defaultSize}/>
      )
    }
    

    return toReturn;
  }
  
  useEffect(() => {
    console.log('useffect V', visible);
    if(visible === 1)
      setVisible(2);
  }, [visible]);
  
  
  const classes = useStyles({visible});
  return (
    <div className={classes.base}>
      <HeaderBar/>
      
      <div className={classes.holder}>
        <SidebarRules onClick={()=>generateBoard()}/>
        {boardReturn()}
      </div>
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
            label="Allow Reds to be on 2+ same resources"
          />
          <FormControlLabel
            control={<Checkbox id={'x'}/>}
            label="Allow 3 Same Resource Intersections"
          />
        </FormGroup>
      </FormControl>
      <Button className={classes.button} onClick={()=> props.onClick()}>Generate!</Button>
    </div>
  );
}

const useStyles = makeStyles({
  app:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  base:{
    background: 'radial-gradient(circle, #303030 25%,#252525 75% )',
    alignItems: "center",
    minHeight: window.innerHeight,
    
    display: "flex",
    flexDirection: "column",
  },
  
  button:{
    backgroundColor: '#ff3c3c',
    position: "relative",
    // marginTop: '100px',
    // left: "40%",
    // right: "40%",
    // width: '20%',
    alignSelf: "center"
  },
  
  board:{
    visibility : props => props.visible,
    flex:3,
  },
  rulesHolder:{
    flex: 1,
    marginTop: '85px',
    
    minWidth:'20%',
    maxHeight: '400px',
    display: "flex",
    flexDirection: "column",
    
    background: 'radial-gradient(circle, #ffffff 25%,#fcfcfc 75% )',
    border: '3px solid #0a0a0a',
    color: '#0a0a0a',
    
    textAlign:"center",
    padding: '1em',
  },
  holder:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
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
      let oneResource=[0,1,2,3,4]
      let resourceTypeList=[0,0,0,1,1,2,2,2,3,3,3,4,4];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12],[3,4,7,9,12,13],[4,5,8,10,13,14],[5,6,9,11,14,15],[6,10,15],[7,8,13,16],[8,9,12,14,16,17],[9,10,13,15,17,18],[10,11,14,18],[12,13,17],[16,13,14,18],[14,15,17]];
      let board={};

      //if no reds on same resources
      if (BoardRules.resourceShareReds){
        resourceTypeList.push(...oneResource);
        console.log('resourceTypeList',resourceTypeList)
      }else{
        resourceTypeList.push(oneResource.popRandom()[0]);
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

        // //pop one randomly from the oneresource to give back to normal resources
        // if (!BoardRules.resourceShareReds){
        //   resourceTypeList.push(oneResource.popRandom()[0]);
        // }

        //fill in the rest randomly
        // console.log('board reds', board);
      }else{
        numberList.push(...reds)
      }
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
      
      return board;
      
    }
    function generateExtendedBoard() {
      let spots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
      let numberList = [2,2,3,3,3,4,4,4,5,5,5,9,9,9,10,10,10,11,11,11,12,12,1,1];
      let reds = [6,6,8,8,6,8];
      let oneResource=[0,1,2,3,4]
      let resourceTypeList=[0,0,0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4];
      let neighbors=[[1,3,4],[0,4,5,2],[1,5,6],[0,4,7,8],[0,1,3,5,8,9],[1,2,4,6,9,10],[2,5,10,11],[3,8,12,13],[3,4,7,9,13,14],[4,5,8,10,14,15],[5,6,9,11,15,16],[6,10,16,17],[7,13,18],[7,8,12,14,18,19],[8,9,13,15,19,20],[9,10,14,16,20,21],[10,11,15,17,21,22],[11,16,22],[12,13,19,23],[13,14,18,20,23,24],[14,15,19,21,24,25],[15,16,20,22,25,26],[16,17,21,26],[18,19,24,27],[19,20,23,25,27,28],[20,21,24,26,28,29],[21,22,25,29],[23,24,28],[24,25,27,29],[25,26,28]];
      let board={};

      //if no reds on same resources
      if (BoardRules.resourceShareReds){
        resourceTypeList.push(...oneResource);
      }else{
        oneResource.push(resourceTypeList.popRandom()[0])
      }

      //place the reds first
      if (BoardRules.noRed){
        let possible = spots;
        for(let i = 0; i < 6; i++){
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
        for(let i = 0; i < spots.length;){
          let num=spots.popRandom()[0];
          let number = numberList.popRandom()[0];
          board[num]={
            id:num,
            number:number,
            type:number ===1 ? 5: number ===6 || number ===8? BoardRules.resourceShareReds? resourceTypeList.popRandom()[0] : oneResource.popRandom()[0] : resourceTypeList.popRandom()[0],
          }
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
