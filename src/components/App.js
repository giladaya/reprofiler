import React from "react";
import "./App.css";
import NumberSlider from "./NumberSlider";
import ColorPicker from "./ColorPicker";
import Fibonacci from "./Fibonacci";
import { COLORS } from "./config";
import { Profiler } from "../Reprofiler";
import Dashboard from "../Reprofiler/DashboardTable";
import { usePerfStats } from "../Reprofiler";

function TotalDashboard() {
  const stats = usePerfStats();
  const total = Object.values(stats).reduce((ac, el) => ac + el.actualDuration, 0);
  return (
    <div>
      Total: {total.toFixed(1)}ms
    </div>
  )
}

function App() {
  const [color, setColor] = React.useState(COLORS.Gray);
  const [number, setNumber] = React.useState(35);

  return (
    <div className="App">
      <h1>Profiler Dashboard Demo</h1>
      <TotalDashboard/>
      <br/>
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

      <Dashboard threshold={10} />
    </div>
  );
}

export default App;
