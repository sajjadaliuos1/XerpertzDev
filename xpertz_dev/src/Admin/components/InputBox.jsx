import React from 'react';

export default function InputBox({
  label,
  name,
  value,
  onChange,
  className = '',
}) {
  return (
    <div className={className}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          padding: '8px',
          width: '100%',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
}
