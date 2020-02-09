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
        <Timer></Timer>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
