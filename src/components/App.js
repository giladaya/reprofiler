import React from "react";
import "./App.css";
import NumberSlider from "./NumberSlider";
import ColorPicker from "./ColorPicker";
import Fibonacci from "./Fibonacci";
import { Profiler } from "../Reprofiler";
import { DashboardT as Dashboard } from "../Reprofiler/Dashboard";

const COLORS = {
  Red: "#ff0000",
  Green: "#00cc00",
  Blue: "#0000ff",
  Gray: "#aaaaaa",
  Black: "#000000"
};

function App() {
  const [color, setColor] = React.useState(COLORS.Gray);
  const [number, setNumber] = React.useState(35);

  return (
    <div className="App">
      <h1>Profiler Dashboard Demo</h1>
      <Dashboard threshold={10} />
      <Profiler id="Controls">
        <div style={{ marginBottom: "2em" }}>
          <h2>Controls</h2>
          <label>
            Color:{" "}
            <ColorPicker palette={COLORS} onChange={setColor} value={color} />
          </label>
          <br />
          <label>
            Number: <NumberSlider number={number} setNumber={setNumber} />
          </label>
        </div>
      </Profiler>

      <Profiler id="Fibonacci">
        <h2>Fibonacci</h2>
        <Fibonacci number={number} color={color} />
      </Profiler>
    </div>
  );
}

export default App;
