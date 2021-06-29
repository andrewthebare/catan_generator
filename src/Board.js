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
  
  
    // let i=0;
    // let rowLength = 3;
    // while(Object.keys(board).length > 0&& i< 5) {
    //   let oneRow = {};
    //   for (let j = 0; j<rowLength; j++){
    //     $.extend(oneRow, board[j]);
    //     // oneRow.push(board[j]);
    //     delete board[j];
    //   }
    //   rows[i] = oneRow;
    //
    //   i++;
    //   if (Object.keys(board).length >hexnum/2) {
    //     rowLength++;
    //   }else{
    //     rowLength--;
    //   }
    // }
  
    console.log('Rows:', rows);
    return rows;
  
  }
  
  const makeStandard = ()=>{
    let rows = makeRows(19);
    
    return(
      <div>
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
  
  return makeStandard();
  
}

