import React from 'react';
import { Input } from 'antd';

const TextareaBox = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      <Input.TextArea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoSize={{ minRows: 4, maxRows: 8 }} // Automatically adjust height
      />
    </div>
  );
};

export default TextareaBox;
