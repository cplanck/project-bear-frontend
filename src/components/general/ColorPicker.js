import { CirclePicker } from 'react-color';
import { useState } from 'react';

export default function ColorPicker(props){

    const [color, setColor] = useState('#321231')

    function colorUpdated(color) {
        setColor(color.hex);
        let temp = JSON.parse(JSON.stringify(props.updatedDeployment));
        temp['instrument_color'] = color.hex
        props.setUpdatedDeployment(temp)
        props.setColorPickerOpen(false)
        props.setCurrentColor(color.hex)
    };
  
      return (
        <CirclePicker
          color={color}
          onChange = {colorUpdated}
        />
      );
  }