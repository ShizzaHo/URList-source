import React from 'react';
import './styles.css';

import { Iany } from '../../interfaces/index';

function SzhInput({ value, placeholder, className, id, onChange }: Iany) {
  return (
    <div className='szhinputpanel'>
      <input className={className + ' szhinput'} value={value} id={id} required onChange={onChange}></input>
      <label htmlFor={id} className='szhinput-label'>{placeholder}</label>
    </div>
  );
}

SzhInput.defaultProps = {
  value: undefined,
  placeholder: undefined,
  id: "SZH-INPUT"
};

export default SzhInput;
