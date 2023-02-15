import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Board from "./Board";
import { Button } from "@material-ui/core";
import HeaderBar from "./HeaderBar";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

function App() {
  //just gotta display something to start | hardcoded cause I'm a lazy idiot
  const [board, setBoard] = useState(
    new BoardMaker({
      defaultSize: true,
      redNeighbors: true,
      resourceShareReds: false,
      AllowLowNeighbor: true,
      AllowLowSameResource: false,
    })
  );
  const [visible, setVisible] = useState(0);

  //This is actually the first state
  const [boardRules, setRules] = useState({
    defaultSize: true,
    redNeighbors: true,
    resourceShareReds: false,
    AllowLowNeighbor: false,
    AllowLowSameResource: false,
  });

  const handleRuleChange = (key) => {
    let tempRules = boardRules;
    tempRules[key] = !tempRules[key];
    setRules(tempRules);
  };

  const generateBoard = () => {
    //logic to accompany
    //pull down UI props

    // let newRules = {
    //   defaultSize: document.getElementById('standardGame').checked,
    //   redNeighbors: !document.getElementById('redNeighbors').checked,
    //   resourceShareReds: document.getElementById('resourceShareReds').checked,
    //   AllowLowNeighbor: document.getElementById('AllowLowNeighbor').checked || false,
    //   AllowLowSameResource: document.getElementById('AllowLowSameResource').checked || false,
    // }

    // setRules(newRules)

    setBoard(new BoardMaker(boardRules));
    setVisible(1);
  };

  const boardReturn = () => {
    let toReturn = [];

    if (visible === 0) {
      let newRules = {
        defaultSize: true,
        redNeighbors: true,
        resourceShareReds: false,
      };
      let b = new BoardMaker(newRules);
      // setBoard(b)
      toReturn.push(
        <Board key={b} board={b} standardSize={boardRules.defaultSize} />
      );
    } else if (visible === 1) {
      toReturn.push(
        <div key={-1}>
          <h3>LOADING</h3>
        </div>
      );
    } else {
      toReturn.push(
        <Board
          key={board}
          board={board}
          standardSize={boardRules.defaultSize}
        />
      );
    }

    return toReturn;
  };

  useEffect(() => {
    if (visible === 1) setVisible(2);
  }, [visible]);

  const classes = useStyles({ visible });
  return (
    <div className={classes.base}>
      <HeaderBar />

      <div className={classes.holder}>
        <SidebarRules
          onClick={() => generateBoard()}
          changeRule={handleRuleChange}
        />
        {boardReturn()}
      </div>
    </div>
  );
}

export function SidebarRules(props) {
  const [value, setValue] = React.useState("standard");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.changeRule("defaultSize");
  };

  const handleCheckBoxChange = (event) => {
    props.changeRule(event.target.id);
  };

  const showStandardRules = () => {
    let show = [];

    if (value === "standard") {
      show.push(
        <FormControlLabel
          key={0}
          control={
            <Checkbox
              id={"AllowLowSameResource"}
              onChange={handleCheckBoxChange}
            />
          }
          label='Allow 2 and 12 to be on the same resource'
        />
      );
    }

    return show;
  };

  const classes = useStyles();
  return (
    <div className={classes.rulesHolder}>
      <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <h3 className={classes.ruleTitle}>Instructions</h3>
        <p style={{ textAlign: "left" }}>
          Use this flexible catan board generator to make unique standard and
          5-6 player boards according to a set of chosen parameters. To create
          the most "balanced" board, untick every box.
        </p>
        <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
          Created by:{" "}
          <a
            href='https://abare.dev'
            target='_blank'
            rel='noreferrer'
            style={{ textDecoration: "none", color: "#222" }}
          >
            <u>Andrew Bare</u>
          </a>
        </p>
      </div>

      <FormControl>
        <h2 className={classes.ruleTitle}>Game Rules</h2>
        <RadioGroup value={value} onChange={handleChange}>
          <h4>Game Size</h4>
          <FormControlLabel
            value='standard'
            control={<Radio id={"standardGame"} name={"standardGame"} />}
            label='Standard (2-4 players)'
          />
          <FormControlLabel
            value='extended'
            control={<Radio />}
            label='Extended (5-6 Players)'
          />
        </RadioGroup>
        <h4>Generator Rules</h4>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox id={"redNeighbors"} onChange={handleCheckBoxChange} />
            }
            label='Allow red number neighbors'
          />
          <FormControlLabel
            control={
              <Checkbox
                id={"resourceShareReds"}
                onChange={handleCheckBoxChange}
              />
            }
            label={`${
              value === "standard"
                ? "Allow red numbers to be on 2 or more of the same resources"
                : "Allow more than one resource to have multiple red numbers"
            }`}
          />
          <FormControlLabel
            control={
              <Checkbox
                id={"AllowLowNeighbor"}
                onChange={handleCheckBoxChange}
              />
            }
            label='Allow 2 and 12 to border each other'
          />

          {showStandardRules()}

          {/*<FormControlLabel*/}
          {/*  control={<Checkbox id={'x'}/>}*/}
          {/*  label="Allow 3 Same Resource Intersections"*/}
          {/*/>*/}
        </FormGroup>
      </FormControl>
      <Button className={classes.button} onClick={() => props.onClick()}>
        Generate!
      </Button>
    </div>
  );
}

const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  base: {
    background: "radial-gradient(circle, #303030 25%,#252525 75% )",
    alignItems: "center",
    minHeight: window.innerHeight,

    display: "flex",
    flexDirection: "column",
  },

  button: {
    backgroundColor: "#ff3c3c",
    position: "relative",
    // marginTop: '100px',
    // left: "40%",
    // right: "40%",
    // width: '20%',
    alignSelf: "center",
  },

  board: {
    visibility: (props) => props.visible,
    flex: 3,
  },
  rulesHolder: {
    flex: 1,
    marginTop: "85px",

    minWidth: "300px",
    maxWidth: window.innerWidth < 500 ? "85%" : "600px",
    // maxHeight: "500px",
    display: "flex",
    flexDirection: "column",

    background: "radial-gradient(circle, #ffffff 25%,#fcfcfc 75% )",
    border: "3px solid #0a0a0a",
    color: "#0a0a0a",

    textAlign: "left",
    padding: "0.5em",
  },
  holder: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: window.outerWidth,
  },

  ruleTitle: {
    textAlign: "center",
    backgroundColor: "#cc4444",
  },
});

class BoardMaker {
  constructor(BoardRules) {
    if (BoardRules.defaultSize) {
      this.board = generateDefaultBoard();
    } else {
      this.board = generateExtendedBoard();
    }

    function generateDefaultBoard() {
      let spots = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ];
      let numberList = [3, 3, 4, 4, 5, 5, 9, 9, 10, 10, 11, 11, 1];
      let reds = [6, 6, 8, 8];
      let oneResource = [0, 1, 2, 3, 4];
      let oneLowResource = [0, 1, 2, 3, 4];
      let resourceTypeList = [0, 0, 1, 2, 2, 3, 3, 4];
      let neighbors = [
        [1, 3, 4],
        [0, 4, 5, 2],
        [1, 5, 6],
        [0, 4, 7, 8],
        [0, 1, 3, 5, 8, 9],
        [1, 2, 4, 6, 9, 10],
        [2, 5, 10, 11],
        [3, 8, 12],
        [3, 4, 7, 9, 12, 13],
        [4, 5, 8, 10, 13, 14],
        [5, 6, 9, 11, 14, 15],
        [6, 10, 15],
        [7, 8, 13, 16],
        [8, 9, 12, 14, 16, 17],
        [9, 10, 13, 15, 17, 18],
        [10, 11, 14, 18],
        [12, 13, 17],
        [16, 13, 14, 18],
        [14, 15, 17],
      ];
      let board = {};

      //if no reds on same resources
      if (BoardRules.resourceShareReds) {
        resourceTypeList.push(...oneResource);
      } else {
        resourceTypeList.push(oneResource.popRandom()[0]);
      }

      if (BoardRules.AllowLowSameResource) {
        resourceTypeList.push(...oneLowResource);
      } else {
        resourceTypeList.push(oneLowResource.popRandom()[0]);
        resourceTypeList.push(oneLowResource.popRandom()[0]);
        resourceTypeList.push(oneLowResource.popRandom()[0]);
      }

      //randomly assign
      if (BoardRules.redNeighbors) {
        let possible = spots;
        for (let i = 0; i < 4; i++) {
          let pos = possible.popRandom()[0];
          board[pos] = {
            id: pos,
            number: reds[i],
            type: BoardRules.resourceShareReds
              ? resourceTypeList.popRandom()[0]
              : oneResource.popRandom()[0],
          };
          spots = spots.filter(function (e) {
            return e !== pos;
          });
          possible = possible.filter(function (e) {
            return !neighbors[pos].includes(e);
          });
        }
      } else {
        numberList.push(...reds);
      }

      //no 2s and 12s
      let nums = [2, 12];
      if (!BoardRules.AllowLowNeighbor) {
        let possible = spots;

        for (let i = 0; i <= nums.length; i++) {
          let pos = possible.popRandom()[0];
          board[pos] = {
            id: pos,
            number: nums.popRandom()[0],
            type: BoardRules.AllowLowSameResource
              ? resourceTypeList.popRandom()[0]
              : oneLowResource.popRandom()[0],
          };
          spots = spots.filter(function (e) {
            return e !== pos;
          });
          possible = possible.filter(function (e) {
            return !neighbors[pos].includes(e);
          });
        }

        // //return the missing oneResource
        // resourceTypeList.push(...oneLowResource)
      } else {
        numberList.push(...nums);
        resourceTypeList.push(...oneLowResource);
      }

      //rest
      for (let i = 0; i < spots.length; ) {
        let num = spots.popRandom()[0];
        let number = numberList.popRandom()[0];
        board[num] = {
          id: num,
          number: number,
          type:
            number === 1
              ? 5
              : number === 6 || number === 8
              ? BoardRules.resourceShareReds
                ? resourceTypeList.popRandom()[0]
                : oneResource.popRandom()[0]
              : resourceTypeList.popRandom()[0],
        };
      }

      return board;
    }
    function generateExtendedBoard() {
      let spots = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      ];
      let numberList = [
        3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9, 10, 10, 10, 11, 11, 11, 1, 1,
      ];
      let reds = [6, 6, 8, 8, 6, 8];
      let oneResource = [0, 1, 2, 3, 4];
      let resourceTypeList = [
        0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4,
      ];
      let neighbors = [
        [1, 3, 4],
        [0, 4, 5, 2],
        [1, 5, 6],
        [0, 4, 7, 8],
        [0, 1, 3, 5, 8, 9],
        [1, 2, 4, 6, 9, 10],
        [2, 5, 10, 11],
        [3, 8, 12, 13],
        [3, 4, 7, 9, 13, 14],
        [4, 5, 8, 10, 14, 15],
        [5, 6, 9, 11, 15, 16],
        [6, 10, 16, 17],
        [7, 13, 18],
        [7, 8, 12, 14, 18, 19],
        [8, 9, 13, 15, 19, 20],
        [9, 10, 14, 16, 20, 21],
        [10, 11, 15, 17, 21, 22],
        [11, 16, 22],
        [12, 13, 19, 23],
        [13, 14, 18, 20, 23, 24],
        [14, 15, 19, 21, 24, 25],
        [15, 16, 20, 22, 25, 26],
        [16, 17, 21, 26],
        [18, 19, 24, 27],
        [19, 20, 23, 25, 27, 28],
        [20, 21, 24, 26, 28, 29],
        [21, 22, 25, 29],
        [23, 24, 28],
        [24, 25, 27, 29],
        [25, 26, 28],
      ];
      let board = {};

      //if no reds on same resources
      if (BoardRules.resourceShareReds) {
        resourceTypeList.push(...oneResource);
      } else {
        //add one more to oneResource
        oneResource.push(resourceTypeList.popRandom()[0]);
      }

      //place the reds first
      if (BoardRules.redNeighbors) {
        let possible = spots;
        for (let i = 0; i < 6; i++) {
          let pos = possible.popRandom()[0];
          board[pos] = {
            id: pos,
            number: reds[i],
            type: BoardRules.resourceShareReds
              ? resourceTypeList.popRandom()[0]
              : oneResource.popRandom()[0],
          };
          spots = spots.filter(function (e) {
            return e !== pos;
          });
          possible = possible.filter(function (e) {
            return !neighbors[pos].includes(e);
          });
        }
      } else {
        numberList.push(...reds);
      }

      //no 2 and 12 neighbors
      let nums = [2, 12, 2, 12];
      if (!BoardRules.AllowLowNeighbor) {
        let possible = spots;

        for (let i = 0; i < 4; i++) {
          let pos = possible.popRandom()[0];
          board[pos] = {
            id: pos,
            number: nums.popRandom()[0],
            type: resourceTypeList.popRandom()[0],
          };
          spots = spots.filter(function (e) {
            return e !== pos;
          });
          possible = possible.filter(function (e) {
            return !neighbors[pos].includes(e);
          });
        }

        // //return the missing oneResource
        // resourceTypeList.push(...oneLowResource)
      } else {
        numberList.push(...nums);
      }

      //fill in the rest randomly
      for (let i = 0; i < spots.length; ) {
        let num = spots.popRandom()[0];
        let number = numberList.popRandom()[0];
        board[num] = {
          id: num,
          number: number,
          type:
            number === 1
              ? 5
              : number === 6 || number === 8
              ? BoardRules.resourceShareReds
                ? resourceTypeList.popRandom()[0]
                : oneResource.popRandom()[0]
              : resourceTypeList.popRandom()[0],
        };
      }
      return board;
    }
  }
}
/**
 *
 * @returns a random element of the array
 */
Array.prototype.popRandom = function () {
  return this.splice(Math.floor(Math.random() * this.length), 1);
};

export default App;
