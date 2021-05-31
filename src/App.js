import React from "react";
import './App.css';
import Hex from "./Hex";
import HexRow from "./HexRow";


function App() {
  return (
    <div className="App">
      <HexRow hexNum={3} hexIndex={0}/>
      <HexRow hexNum={4} hexIndex={4} hexStyle={{marginTop:-40,zIndex:-1}}/>
      <HexRow hexNum={5} hexIndex={8} hexStyle={{marginTop:-40,zIndex:-1}}/>
      <HexRow hexNum={4} hexIndex={14} hexStyle={{marginTop:-40,zIndex:-1}}/>
      <HexRow hexNum={3} hexIndex={19} hexStyle={{marginTop:-40,zIndex:-1}}/>
    </div>
  );
}

export default App;
