import React, { useStatem, useEffect } from "react";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';


function MathField(props){

    function removeMathField(index, addOrRemove){
        let updatedSelection = JSON.parse(JSON.stringify(props.currentSelection));

        let removeIndex
        for(let i = 0; i < updatedSelection.math.length; i++){
            if(addOrRemove == 'remove' && i == index){
                removeIndex = i
                break
        }
    }
        updatedSelection.math.splice(removeIndex,1)
        props.setCurrentSelection(updatedSelection)
    }

    function updateMathField(event, field, index){
        let updatedSelection = JSON.parse(JSON.stringify(props.currentSelection));
    
        if(field == 'operation'){
            updatedSelection.math[index]['operation'] = event
            props.setCurrentSelection(updatedSelection)
        }
        else if(field == 'input'){
            updatedSelection.math[index]['value'] = event
            props.setCurrentSelection(updatedSelection)
        }
    }

    return(
        <div className='byteMapInputGridWrapper'>
             <div className='inputSelectWrapper'>
                <span className='inputSelectLabel'>Math Operation {props.index + 1}</span>
                <select className='styledSelect' onChange={e => updateMathField(e.target.value, 'operation', props.index)}>
                    <option value={'add'} selected={props.operation == 'add'?true:false}>Add</option>
                    <option value={'subtract'} selected={props.operation == 'subtract'?true:false}>Subtract</option>
                    <option value={'multiply'} selected={props.operation == 'multiply'?true:false}>Multiply</option>
                    <option value={'divide'} selected={props.operation == 'divide'?true:false}>Divide</option>
                </select>
            </div>
            <div className='inputSelectWrapper'>
                <span className='inputSelectLabel'>Value</span>
                <input className='styledInput' onChange={(e) => updateMathField(parseFloat(e.target.value || ""), 'input', props.index)}></input>
            </div>
            <Button className='textButton' style={{marginBottom: '-13px'}} variant="text" size='small' onClick={() => removeMathField(props.index, 'remove')}>Remove</Button>
        </div>
    )
}


export default function ByteMapInput(props){

    let mathFields = []

    // useEffect(() => {
        
    //     if(props.binaryMap.length > 0){
    //         if(props.selectionComplete){
    //             props.setErrorMessage({message: 'All bytes mapped!', type: 'success'})
    //         }
    //     }
    //     else if(props.currentSelection.end_byte >= props.fileSize){
    //         props.setErrorMessage({message: 'Your selection goes past the end of your file.', type: 'warning'})
    //     }
    //     else{
    //         props.setErrorMessage({})
    //     }
    //   },);
    

    function updateCurrentSelection(key, value){

        let updatedSelection = JSON.parse(JSON.stringify(props.currentSelection));
        updatedSelection[key] = value

        if(key == 'format'){
            if(value != 'char'){
                if(value == 'uint8' || value ==  'int8'){
                    updatedSelection['end_byte'] =  updatedSelection['start_byte']
                }
                else if(value == 'uint16' || value == 'int16'){
                    updatedSelection['end_byte'] =  updatedSelection['start_byte'] + 1

                }
                else if(value == 'uint32' || value == 'int32'){
                    updatedSelection['end_byte'] =  updatedSelection['start_byte'] + 3

                }
                else if(value == 'uint64' || value == 'int64'){
                    updatedSelection['end_byte'] =  updatedSelection['start_byte'] + 7
                }
            }
        }
        props.setCurrentSelection(updatedSelection)
    }

    function addMathField(){
        let updatedSelection = JSON.parse(JSON.stringify(props.currentSelection));
        updatedSelection.math.push({'operation': 'add', 'value': ''})
        props.setCurrentSelection(updatedSelection)
    }

    let fieldOptions = []
    for(let i = 0; i < props.dataModelFields.length; i++){
        fieldOptions.push(<option key={i} value={props.dataModelFields[i]} selected={props.currentSelection['field'] == props.dataModelFields[i] ? true: false}>{props.dataModelFields[i]}</option>)
    }

    let fieldFormatOptionTypes = {'uint8': 'Unsigned 8-bit Integer', 'int8': 'Signed 8-bit Integer', 'uint16': 'Unsigned 16-bit Integer', 'int16': 'Signed 16-bit Integer', 'uint32': 'Unsigned 32-bit Integer', 'int32': 'Signed 32-bit Integer', 'ascii': 'ASCII'}
    let fieldFormatOptions = []
    let count = 0
    for (let field in fieldFormatOptionTypes){
        if(field == props.currentSelection['format']){
            fieldFormatOptions.push(<option key={count} selected={true} value={field?field:''}>{fieldFormatOptionTypes[field]}</option>)
        }else{
            fieldFormatOptions.push(<option key={count} value={field}>{fieldFormatOptionTypes[field]}</option>)
        }
        count++
    }

    let endianOptionTypes = {'big': 'Big Endian', 'little': 'Little Endian'}
    let endianOptions = []
    count = 0
    for (let endian in endianOptionTypes){
        let needEndian = props.currentSelection['format'] == 'int8' || props.currentSelection['format'] == 'uint8' ? true: false
        endianOptions.push(<option key={count} value={endian?endian:''} disabled={needEndian} selected={props.currentSelection['endianness'] == endian ? true: false}>{endianOptionTypes[endian]}</option>)
        count++
    }

    for(let i = 0; i < props.currentSelection.math.length; i++){
        let fieldOptions = props.currentSelection.math[i]
        mathFields.push(
                <MathField key={i} 
                index={i} 
                operation={fieldOptions.operation} 
                value={fieldOptions.value} 
                currentSelection={props.currentSelection} 
                setCurrentSelection={props.setCurrentSelection}/>
            )
        }

    return(
        props.fileSize > 0?
        <div>
            <div className='binaryInputTableHeading'>
                <div className='binaryInputBytesSizeWrapper'>
                    <h4>
                    {props.currentSelection.format == 'uint8' || props.currentSelection.format == 'int8'?
                    <span>Mapping Byte {props.currentSelection.start_byte}</span>:
                    <span>Mapping Bytes {props.currentSelection.start_byte} - {props.currentSelection.end_byte}</span>}
                    </h4>
                    <h4>{props.fileSize} Bytes in Message</h4> 
                </div>
            </div>
            <div className='byteMapInputGridWrapper'>
                <div className='inputSelectWrapper'>
                    <span className='inputSelectLabel'>
                        Database Field
                        <Tooltip className='toolTip' placement="top" title="The column in your database that the decoded value of these bytes will be mapped to.">
                            <HelpIcon fontSize='small' />
                        </Tooltip>
                        </span>
                    <select className='styledSelect' onChange={e => updateCurrentSelection('field', e.target.value)}>
                        {fieldOptions}
                    </select>
                </div>
                <div className='inputSelectWrapper'>
                    <span className='inputSelectLabel'>
                        Binary Format
                    <Tooltip className='toolTip' placement="top" title="The format to decode the binary in your message. Large values require more bytes to encode, and signed values (i.e., 
                        values that can be negative) require using a signed integer.">
                            <HelpIcon fontSize='small' />
                    </Tooltip>
                    </span>
                    <select className='styledSelect' label='Format' onChange={e => updateCurrentSelection('format', e.target.value)} >
                        {fieldFormatOptions}
                    </select>
                </div>
                <div className='inputSelectWrapper'>
                    <span className='inputSelectLabel'>Endian
                    <Tooltip className='toolTip' placement="top" title="Endianness is the direction of the byte order. Little endian means the most significant bytes comes last. Big endian means the most significant
                    byte comes last. ">
                            <HelpIcon fontSize='small' />
                    </Tooltip>
                    </span>
                    <select className='styledSelect' onChange={e => updateCurrentSelection('endianness', e.target.value)} >
                        {endianOptions}
                    </select>
                </div>
                <div className='fieldOptionsWrapper'>
                    <Button variant='text' className='textButton' onClick={() => addMathField()}>Add Math</Button>
                </div>
            </div>
            {mathFields.length !=0 ?
                <div>
                    {mathFields}
                </div>: ''}
                <span className="inputErrorMessage" style={{color: props.errorMessage.type == 'warning'?'orange':'green'}}>{props.errorMessage.message}</span>
                <div className='optionButtonWrapper'>
                    <h3 className='decodedValue'>Decoded Value: {props.decodedValue}</h3>
                    <div>
                        <Button className='textButton' variant="text" size='small' onClick={() => props.goBack()}>Undo</Button>
                        <Button className='filledButton' variant="contained" disabled={props.currentSelection.end_byte >= props.fileSize?true:false} size='small' onClick={() => props.saveMap()}>Save Row</Button>
                    </div>
                </div>
        </div>
        : ''
    )}