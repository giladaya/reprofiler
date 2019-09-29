import React from "react";

// Numeric range slider
export default function NumberSlider(props) {
  const { number, setNumber, step = 1 } = props;
  return (
    <>
      <button onClick={() => setNumber(number - step)}>-</button>
      <input
        type="range"
        value={number}
        min={0}
        max={50}
        step={step}
        onChange={ev => setNumber(ev.target.value)}
      />
      <button onClick={() => setNumber(number + step)}>+</button>
    </>
  );
}
