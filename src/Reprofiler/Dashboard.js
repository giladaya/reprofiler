import React from "react";
import { usePerfStats } from "./";
import "./Dashboard.css";

// Reference implementation of a component that uses the hook
export function Dashboard(props) {
  const { threshold = Infinity } = props;
  const gStats = usePerfStats();

  return (
    <div class="_reprofiler-dashboard">
      Stats
      <ul>
        {Object.keys(gStats).map(id => (
          <li
            key={id}
            style={{
              color: gStats[id].actualDuration > threshold ? "red" : ""
            }}
          >
            {id}: {gStats[id].actualDuration.toFixed(3)}ms
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardT(props) {
  const { threshold = Infinity } = props;
  const gStats = usePerfStats();

  return (
    <section className="_reprofiler-dashboard">
      <h1>Render Stats</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Duration (ms)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(gStats).map(id => (
            <tr key={id}>
              <td>{id}</td>
              <td
                style={{
                  color: gStats[id].actualDuration > threshold ? "red" : ""
                }}
              >
                {gStats[id].actualDuration.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
