import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: -0.025em;
  }

  input {
    padding: 0.625rem;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #0f172a;
    transition: all 0.2s;
    outline: none;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
      background-color: white;
    }
  }
`;

export function Input({ label, value, onChange, placeholder, type = "text", onBlur }) {
  return (
    <InputContainer>
      <label>{label}</label>
      <input 
        type={type} 
        value={value || ''} 
        onChange={e => onChange && onChange(e.target.value)} 
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}
