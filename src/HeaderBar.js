import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


export default function HeaderBar(){

    const styles = useStyles();
    return(
        <div className={styles.base}>
            <h1>Catan Board Generator</h1>
        </div>
    )
}

const useStyles = makeStyles({
    base:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        position: "relative",
        left: '0%',
        right: '0%',
        height: '100px',
        backgroundColor: "#fcfcfcfc",
    },
})