import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import woodHex from "./images/wood.jpg";
import clayHex from "./images/clay.jpg";
import sheepHex from "./images/sheep.jpg";
import wheatHex from "./images/wheat.jpg";
import oreHex from "./images/ore.jpg";

export default function SeaEdge(props){
    const width = 320;
    const height =160;

    const hexScale = 70;

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

    const drawHexHalf = ()=> {
        let c = document.getElementById(props.seaID);
        let center = point(c.width / 2, c.height / 2);
        let ctx = c.getContext('2d');

        let startingIndex = 0;

        switch (props.location){
            case 0:
                startingIndex=5
                break;
            case 1:
                startingIndex = 1;
                break;
            case 2:
                startingIndex=4
                break;
            case 3:
                startingIndex = 2;
                break;
            case 4:
                startingIndex = 3;
                break;
        }

        let start = hexCoordinate(center, startingIndex);

        let bg = new Image();

        let color = '#1fc4ec'
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);

        for (let i = startingIndex; i < startingIndex+4; i++) {
            ctx.lineTo(hexCoordinate(center, i + 1).x, hexCoordinate(center, i + 1).y);
        }
        ctx.lineTo(start.x, start.y);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = color;
    }

    useEffect(()=>{
        drawHexHalf();
    },[])

        const style = useStyles({width,height});
    return(
        <div className={style.holder}>
            <canvas id={props.seaID} className={style.canvas}>

            </canvas>
        </div>

    )
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
        offsetRotate: '180deg'
    },
    canvas:{
        width: props => props.width,
        height: props => props.height,
        // backgroundColor:props => props.hexColor,
    },
})