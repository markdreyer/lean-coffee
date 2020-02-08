import React from "react";
import "./App.css";
import Timer from "./Timer";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Timer></Timer>
          <button>Do Stuff</button>
        </header>
      </div>
  );
}

export default App;
