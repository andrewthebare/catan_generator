import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HexRow from "./HexRow";

export default function Board(props){
  
  const makeStandard = ()=>{
    return(
      <div>
        <HexRow hexNum={3} hexIndex={0}/>
        <HexRow hexNum={4} hexIndex={4} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={5} hexIndex={8} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={4} hexIndex={14} hexStyle={{marginTop:-40,zIndex:-1}}/>
        <HexRow hexNum={3} hexIndex={19} hexStyle={{marginTop:-40,zIndex:-1}}/>
      </div>
    )
  }
  
  return makeStandard();
  
}