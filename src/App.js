import React from "react";
import "./App.css";
import Timer from "./Timer";
import InstallButton from "./InstallButton";

function App() {
  return (
    <div className="App">
      <header>
        <InstallButton></InstallButton>
      </header>
      <main>
        <h3>Lean Coffee Timer</h3>
        <div className="cup-container">
          <img id="cup" alt="Coffee Cup" src="cup.png" height="0"></img>
        </div>
        <Timer></Timer>
      </main>
      <footer>
        Beverage PNG Designed By IYIKON from{" "}
        <a href="https://pngtree.com/">Pngtree.com</a>
      </footer>
    </div>
  );
}

export default App;
