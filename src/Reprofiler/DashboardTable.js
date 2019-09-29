import React from "react";
import { usePerfStats } from ".";
import "./DashboardTable.css";

export default function DashboardTable(props) {
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
