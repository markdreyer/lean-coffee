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
        <Timer></Timer>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
