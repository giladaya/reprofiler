import React from "react";

// Recursive calculate Fibonacci numbers
// Intentionally inefficient ( O(2^n) )
export function fibonacci(num) {
  if (num <= 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

// Show a Fibonacci number
export default function Fibonacci(props) {
  const { number, color } = props;
  const fiboNum = React.useMemo(() => fibonacci(number), [number]);

  return (
    <div>
      #{number}
      <div style={{ fontSize: "3em", color }}>{fiboNum}</div>
    </div>
  );
}
