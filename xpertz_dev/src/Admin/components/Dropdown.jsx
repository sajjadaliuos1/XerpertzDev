import React, { useState } from 'react';
import { Select } from 'antd';

// The custom hook for Dropdown
const useDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const DropdownButton = ({ style, onCategoryChange }) => (
    <Select
      value={selectedValue}
      style={style}
      onChange={(value) => {
        handleSelectChange(value);
        onCategoryChange(value); // Pass selected category to parent
      }}
      placeholder="Select Category"
      options={[
        { label: 'Home', value: 'Home' },
        { label: 'About Us', value: 'About Us' },
        { label: 'services', value: 'Services' },
        { label: 'portfolio', value: 'Portfolio' },
        { label: 'Domains', value: 'Domains/Hosting' },
        { label: 'business', value: 'Business/SMS' },
      ]}
    />
  );

  return { DropdownButton };
};

export default useDropdown;
