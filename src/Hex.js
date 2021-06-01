import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


export default function Hex(props){
  const [hexID] = useState(props.hexID);
  const [diceNum, setDiceNum] = useState(props.hexData.number);
  const [hexScale, setHexScale] = useState(70);
  const [numColor, setNumColor] = useState('#000000');
  const width = 320;
  const height =160;
  
  
  const point = (x,y)=>{
    return {x:x,y:y};
  }
  
  const hexCoordinate = (center, i) =>{
    let angle_degree = 60*i-30;
    let angle_rad = Math.PI / 180 * angle_degree;
    return point(
    center.x + hexScale * Math.cos(angle_rad),
    center.y + hexScale * Math.sin(angle_rad)
    );
  }
  
  const drawLine=(canvas, start, end)=>{
    let ctx = canvas.getContext('2d');
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    
  }
  
  const drawHex = ()=>{
    let c = document.getElementById(hexID);
    let center = point(c.width/2,c.height/2);
    // console.log('Center: ', center);
    for (let i = 0; i< 5; i++){
      drawLine(c,hexCoordinate(center,i),hexCoordinate(center,i+1))
    }
    drawLine(c,hexCoordinate(center,5),hexCoordinate(center,0));
  
    let ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(center.x, center.y, 30, 0, 2 * Math.PI);
    ctx.stroke();
  }
  
  
  
  const numberFixer = ()=>{
    console.log('Hex data recieved:',props.hexData);
    if (diceNum === 6 || diceNum === 8){
      setNumColor('#ec2222');
      // console.log('Number should be Red');
    }
  }
  useEffect(() => {
    drawHex();
    numberFixer();
  }, []);
  
  const classes = useStyles({width,height,numColor});
  return(
    <div className={classes.holder}>
      <canvas id={hexID} className={classes.canvasHex}>
      
      </canvas>
      <div className={classes.numDisplay}>
        <h1 className={classes.num}>{diceNum}</h1>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  holder:{
    position:"relative",
    width:130,
    height:150,
    
    overflow:"hidden",
    
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
  },
  canvasHex:{
    width: props => props.width,
    height: props => props.height,
    backgroundColor:"transparent",
  },
  
  numDisplay:{
    color:props => props.numColor,
    position:"absolute",
    top:'0%',
    left:'0%',
    right:'0%',
    bottom:'0%',
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    zIndex:1,
  },
  num:{
    verticalAlign:"middle",
  }
})