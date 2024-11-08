// Input.tsx
import "./input.scss"
import React from 'react';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // Prop required optionnelle
  placeholder?: string; // Prop placeholder optionnelle
}

export const Input: React.FC<Props> = ({ type, name, value, onChange, required, placeholder }) => {
  return ( 
    <div className='input' >
      <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required} // Définir l'attribut required
      placeholder={placeholder} // Définir le placeholder
    />
    </div>
    
  );
};
