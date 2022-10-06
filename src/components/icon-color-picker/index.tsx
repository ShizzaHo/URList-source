import React, { useState } from 'react';
import './styles.css';
import { Iany } from '../../interfaces/index';

function IconColorPicker({ onChangeColor, initColor }: Iany) {
  const [color, setColor] = useState(initColor);

  return (
    <>
      <div
        className='iconcolorpicker-picker'
        onClick={() => {
          (document.getElementById('test') || {click: ()=>{}}).click();
        }}
        style={{ backgroundColor: color }}
      >
        <input
          type='color'
          className='iconcolorpicker-input'
          id='test'
          onChange={(e) => {
            setColor(e.target.value);
            onChangeColor(e.target.value)
          }}
        />
      </div>
    </>
  );
}

IconColorPicker.defaultProps = {
  onChangeColor: () => {},
  initColor: "#808080",
};

export default IconColorPicker;
