import React, {useState, useEffect} from 'react';
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import HexRow, {SeaRow} from "./HexRow";
import SeaEdge from "./SeaEdge";

export default function Board(props){
  
  const makeRows= (hexnum)=>{
    //turn the board into rows
    let board = props.board.board;
    console.log('Board given to BoardClass', board);
    let rows={};
    let rowLength = 3;
    let bottom = 0;
    let index = 0;
    
    while(bottom < Object.keys(board).length){
      let oneRow = {};
      for (let i = bottom; i<rowLength+bottom; i++) {
        oneRow[i]=board[i];
        // console.log('oneRow',oneRow)
  
      }
      
      rows[index]=oneRow;
      
      bottom+=rowLength;
      // console.log('bottom',bottom, hexnum);
      if(bottom < hexnum/2){
        rowLength++;
      }else{
        rowLength--;
  
      }
      
      index++;
    }
  
    
    console.log('Rows:', rows);
    return rows;
  
  }
  
  const styles = useStyles(props.standardSize);
  const makeStandard = ()=>{
    let rows = makeRows(19);
    
    return(
      <div className={styles.base}>
        <SeaRow hexIndex={-1} startIndex={0} endIndex={4} top={true}/>
        <HexRow hexNum={3} hexIndex={0} hexData={rows[0]} half={-1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={4} hexIndex={3} hexData={rows[1]} half={-1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={5} hexIndex={7} hexData={rows[2]} half={0} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={4} hexIndex={12} hexData={rows[3]} half={1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={3} hexIndex={16} hexData={rows[4]} half={1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <SeaRow hexIndex={-2} startIndex={3} endIndex={7} top={false} hexStyle={{marginTop:-40,zIndex:-1}}/>
      </div>
    )
  }
  const makeExtended = ()=>{
    let rows = makeRows(30);

    return(
      <div className={styles.base}>
        <SeaRow hexIndex={-1} startIndex={0} endIndex={4} top={true}/>
        <HexRow hexNum={3} hexIndex={0} hexData={rows[0]} half={-1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={4} hexIndex={3} hexData={rows[1]} half={-1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={5} hexIndex={7} hexData={rows[2]} half={-1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={6} hexIndex={12} hexData={rows[3]} half={0} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={5} hexIndex={18} hexData={rows[4]} half={1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={4} hexIndex={23} hexData={rows[5]} half={1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={3} hexIndex={27} hexData={rows[6]} half={1} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <SeaRow hexIndex={-2} startIndex={3} endIndex={7} top={false} hexStyle={{marginTop:-40,zIndex:-1}}/>
      </div>
    )
  }

  return props.standardSize ? makeStandard() : makeExtended();
  
}

const useStyles = makeStyles({
  base:{
    marginTop: window.innerWidth > 800? '65px': 0,
    transform: window.innerWidth < 800? props=> props.standardSize? "scale(.5)" : 'scale(.43)' : 'scale(1)',
    padding: window.innerWidth > 800?'2em' : 0,
  }
})

