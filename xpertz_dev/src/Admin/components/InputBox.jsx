import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // Import PlusOutlined icon

export default function InputBox({
  placeholder,
  label,
  name,
  value,
  onChange,
  className = '',
  addonAfter, // Added support for custom addonAfter
}) {
  return (
    <div className={className} style={{ marginBottom: '16px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontWeight: 'bold',
          marginBottom: '8px',
        }}
      >
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            padding: '8px',
            width: '100%',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        {addonAfter && (
          <div style={{ marginLeft: '8px' }}>
            {addonAfter}
          </div>
        )}
      </div>
    </div>
  );
}
