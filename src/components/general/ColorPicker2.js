import { CirclePicker } from 'react-color';
import { useState } from 'react';

export default function ColorPicker2(props){

    const [color, setColor] = useState('#321231')

    function colorUpdated(color) {
        setColor(color.hex);
        let temp = JSON.parse(JSON.stringify(props.objectToUpdate));
        temp[props.keyName] = color.hex
        props.setObjectToUpdate(temp)
        props.setColorPickerOpen(!props.colorPickerOpen)
    };
  
      return (
          <CirclePicker
            color={color}
            onChange = {colorUpdated}
            circleSize={28}
          />
      );
  }