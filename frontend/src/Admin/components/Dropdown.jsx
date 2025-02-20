// Dropdown.jsx
import  { useState } from 'react';
import { Select } from 'antd';

const useDropdown = () => {
  const [selectedValue, setSelectedValue] = useState('home');

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const DropdownButton = ({name, label, placeholder, style, onCategoryChange }) => (
    <div>
      {label && <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{label}</div>}
      <Select
      name={name}
        value={selectedValue}
        placeholder={placeholder}
        style={style}
        onChange={(value) => {
          handleSelectChange(value);
          onCategoryChange(value); // Pass selected category to parent
        }}
        options={[
          { label: 'Home', value: 'home' },
          { label: 'About Us', value: 'aboutus' },
          { label: 'Services', value: 'services' },
          { label: 'Portfolio', value: 'portfolio' },
          { label: 'Domains/Hosting', value: 'domains' },
          { label: 'Business/SMS', value: 'business' },
          { label: 'Team', value: 'team' },
          { label: 'Our Clients', value: 'ourclients' },
          { label: 'Contact', value: 'contact' },
        ]}
      />
    </div>
  );

  return { DropdownButton };
};

export default useDropdown;
