import React from "react";
import { usePerfStats } from ".";

// Reference implementation of a component that uses the hook
export default function DashboardList(props) {
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