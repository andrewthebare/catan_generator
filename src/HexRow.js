import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hex from "./Hex";

export default function HexRow(props){
  const exteriorStyle = props.hexStyle;
  
  const makeRow = ()=>{
    let result = [];
    
    for (let i = 0; i < props.hexNum; i++){
      result.push(
        <Hex hexID={'hex'+i+props.hexIndex} diceNum={Math.floor(Math.random() * 12+1)}/>
      )
    }
    
    return result;
  }
  
  const classes = useStyles({...exteriorStyle});
  return(
    <div className={classes.rowHolder}>
      {makeRow()}
    </div>
  );
}

const useStyles = makeStyles({
  rowHolder:{
    position: "relative",
    marginTop: props => props.marginTop || 0,
    zIndex:props => props.zIndex || 0,
    display:"flex",
    justifyContent:"center",
    flexDirection: "row",
  }
})