import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hex from "./Hex";
import SeaEdge from "./SeaEdge";

export default function HexRow(props){
  const exteriorStyle = props.hexStyle;
  
  const makeRow = ()=>{
    let result = [];
    console.log('Row Data: ', props.hexData);

    let local = 0;
    let startIndex = 0;
    let endIndex = 5;
    if (props.half === -1){
      startIndex=5;
      endIndex = 9;
    }else if( props.half === 0){
      startIndex=5;
      endIndex=8;
    }else{
      startIndex = 4;
      endIndex = 8;
    }

    result.push(<SeaEdge seaID={'sea' + props.hexIndex} startIndex={startIndex} endIndex={endIndex}/>)

    for (let i = 0; i < props.hexNum; i++){
      result.push(
        <Hex hexID={'hex'+i+props.hexIndex} hexData={props.hexData[i+props.hexIndex]}/>
      )
    }

    if (props.half === -1){
      startIndex=1;
      endIndex = 5;
    }else if( props.half === 0){
      startIndex=2;
      endIndex=5;
    }else{
      startIndex = 2;
      endIndex = 6;
    }

    result.push(<SeaEdge seaID={'seaEnd' + props.hexIndex} startIndex={startIndex} endIndex={endIndex}/>)
    
    return result;
  }
  
  const classes = useStyles({...exteriorStyle});
  return(
    <div className={classes.rowHolder}>
      {makeRow()}
    </div>
  );
}

export function SeaRow(props){

  const makeRow = () =>{
    if (props.top){
      return(
          <div className={styles.rowHolder}>
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 1} startIndex={props.startIndex} endIndex={props.endIndex-1} />
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 2} startIndex={props.startIndex} endIndex={props.endIndex} />
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 3} startIndex={props.startIndex} endIndex={props.endIndex} />
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 4} startIndex={props.startIndex+1} endIndex={props.endIndex} />
          </div>
      )
    }else{
      return(
          <div className={styles.rowHolder}>
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 1} startIndex={props.startIndex+1} endIndex={props.endIndex} />
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 2} startIndex={props.startIndex} endIndex={props.endIndex} />
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 3} startIndex={props.startIndex} endIndex={props.endIndex} />
            <SeaEdge seaID={'seaEnd' + props.hexIndex + 4} startIndex={props.startIndex} endIndex={props.endIndex-1} />
          </div>
      )

    }
  }

  const styles= useStyles({...props.hexStyle});
  return makeRow()
}

const useStyles = makeStyles({
  rowHolder:{
    // position: "relative",
    marginTop: props => props.marginTop || 0,
    zIndex:props => props.zIndex || 0,
    display:"flex",
    justifyContent:"center",
    flexDirection: "row",
  }
})