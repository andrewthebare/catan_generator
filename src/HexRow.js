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
    if (props.indexLessHalf){
      local = 0;
    }else{
      local = 2;
    }

    result.push(<SeaEdge seaID={'sea' + props.hexIndex} location={local}/>)

    for (let i = 0; i < props.hexNum; i++){
      result.push(
        <Hex hexID={'hex'+i+props.hexIndex} hexData={props.hexData[i+props.hexIndex]}/>
      )
    }

    if (props.indexLessHalf){
      local = 1;
    }else{
      local = 3;
    }

    result.push(<SeaEdge seaID={'seaEnd' + props.hexIndex} location={local}/>)
    
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

  const styles= useStyles({...props.hexStyle});
  return(
      <div className={styles.rowHolder}>
        <SeaEdge seaID={'seaEnd' + props.hexIndex + 1} location={props.location}/>
        <SeaEdge seaID={'seaEnd' + props.hexIndex + 2} location={props.location}/>
        <SeaEdge seaID={'seaEnd' + props.hexIndex + 3} location={props.location}/>
        <SeaEdge seaID={'seaEnd' + props.hexIndex + 4} location={props.location}/>
      </div>
  )
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