import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function HeaderBar(props){
  
  const classes = useStyles();
  return(
    <div className={classes.headerHolder}>
      <h1>Catan Board Maker</h1>
      <div className={classes.contactHolder}>
        <h5>Contact</h5>
        <h6>Andrew Bare</h6>
      </div>
    </div>
  )
}

const useStyles=makeStyles({
  headerHolder:{
    position:"sticky",
    minHeight:'100px',
    backgroundColor:'#009999',
    
    display:"flex",
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    
    marginBottom:'10px',
  },
  
  contactHolder:{
    position:"absolute",
    top:'5px',
    right:'5px',
    bottom:'5px',
    minWidth:'100px',
    
    backgroundColor: "wheat",
    
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
  }
})