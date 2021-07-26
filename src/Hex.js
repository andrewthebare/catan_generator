import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import woodHex from '../src/images/wood.jpg'
import clayHex from '../src/images/clay.jpg'
import sheepHex from '../src/images/sheep.jpg'
import wheatHex from '../src/images/wheat.jpg'
import oreHex from '../src/images/ore.jpg'


export default function Hex(props){
  const [hexID] = useState(props.hexID);
  const [diceNum, setDiceNum] = useState(props.hexData.number);
  const [hexScale, setHexScale] = useState(70);
  const [numColor, setNumColor] = useState('#000000');
  const width = 320;
  const height =160;
  
  const[hexColor, setHexColor] = useState('#00000000');
  
  
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
    let ctx = c.getContext('2d');
    let start = hexCoordinate(center,0);
  
    let bg = new Image();
  
    let color = '#00000000'
    switch (props.hexData.type){
      case 0:
        bg.src = woodHex;
        color = '#559c55'
        break;
      case 1:
        bg.src = clayHex;
        color ='#cb4b10'
        break;
      case 2:
        bg.src = sheepHex;
        color ='#9dfc4c'
        break;
      case 3:
        bg.src = wheatHex;
        color ='#e5dd25'
        break;
      case 4:
        bg.src = oreHex;
        color ='#464fa4'
        break;
      case 5:
        color ='#eee7bd'
        break;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    
      for (let i = 0; i< 5; i++){
      ctx.lineTo(hexCoordinate(center,i+1).x, hexCoordinate(center,i+1).y);
    }
    ctx.lineTo(start.x, start.y);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = color;
  
    bg.onload = function(){
      let pattern = ctx.createPattern(this, "repeat");
      ctx.fillStyle = pattern;
      ctx.fill();
  
      if(diceNum !==1){
        ctx.beginPath();
        ctx.arc(center.x, center.y, 25, 0, 2 * Math.PI);
        ctx.fillStyle='#f5e4b8'
        ctx.fill()
        ctx.stroke();
      }
  
    };
    ctx.fill();
  
  
  }
  
  
  
  const numberFixer = ()=>{
    // console.log('Hex data recieved:',props.hexData);
    if (diceNum === 6 || diceNum === 8) {
      setNumColor('#ec2222');
    }
    else if(diceNum ===1){
      setDiceNum('')
    }
  }
  useEffect(() => {
    numberFixer();
    drawHex();
  }, []);
  
  const classes = useStyles({width,height,numColor, hexColor});
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
    
    margin: window.innerWidth < 500?  "0 -1px": 0,
  },
  canvasHex:{
    width: props => props.width,
    height: props => props.height,
    // backgroundColor:props => props.hexColor,
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