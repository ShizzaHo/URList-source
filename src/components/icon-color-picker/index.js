import React, { useState } from 'react';
import './styles.css';

function IconColorPicker({ onChangeColor, initColor }) {
  const [color, setColor] = useState(initColor);

  return (
    <>
      <div
        className='iconcolorpicker-picker'
        onClick={() => {
          document.getElementById('test').click();
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
