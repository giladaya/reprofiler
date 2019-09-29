import React from "react";

// Single color picker
export default function ColorPicker(props) {
  const { palette, onChange, value } = props;

  const handleChange = ev => onChange(ev.target.value);
  return (
    <>
      {Object.keys(palette).map(color => (
        <label key={color} style={{ color }}>
          <input
            type="radio"
            name="color"
            value={palette[color]}
            checked={value === palette[color]}
            onChange={handleChange}
          />
          {color}
        </label>
      ))}
    </>
  );
}
