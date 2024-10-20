import React, { useState } from 'react';

function Dropdown({ options, onChange }) {
  const [selectedOption, setSelectedOption] = useState(options[0]); // Set initial value

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue); // Call the onChange prop with the selected value
  };

  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;