import React, { useState } from 'react';
import './styles.css';
import { Iany } from '../../interfaces/index';

function IconColorPicker({ onChangeColor, initColor, service }: Iany) {
  const [color, setColor] = useState(initColor);

  return (
    <>
      <div
        className='customiconcategory-colorpicker'
        onClick={() => {
          (document.getElementById('test') || { click: () => {} }).click();
        }}
      >
        <span>{service.language.universal_iconColor}</span>
        <span style={{color: color}}>{color}</span>
        <input
          type='color'
          className='iconcolorpicker-input'
          id='test'
          onChange={(e) => {
            setColor(e.target.value);
            onChangeColor(e.target.value);
          }}
        />
      </div>
    </>
  );
}

IconColorPicker.defaultProps = {
  onChangeColor: () => {},
  initColor: '#808080',
};

export default IconColorPicker;
