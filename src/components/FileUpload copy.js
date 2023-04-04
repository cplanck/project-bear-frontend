import { FileUploader } from "react-drag-drop-files";
import React, { useState } from "react";
import {DebounceInput} from 'react-debounce-input';



const fileTypes = ["SBD"];

function arrayBufferToHex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
}

function BoxArea(props){
  return(
    <div className='dropArea'>{props.text}</div>
  )
}

function ByteCell(props){
    return(
        <div className="byteCellWrapper">
            {props.byteValue}
        </div>
    )
}

function RawBinaryTable(props){

        let splitString = props.binary.split(" ")
        let cellArray = []
        for(let i = 0; i < 275; i++){
            cellArray.push(<ByteCell byteValue={splitString[i]} key={i}/>)
            console.log(splitString[i])
        }
 
    return(
        <div>
            {cellArray}
         </div>
    )
}

// psuedocode for highlighting depending on start/end bytes

// function RawBinaryTable(props){

//     let splitString = props.binary.split(" ")
//     let cellArray = []
//     for(let i = 0; i < 275; i++){
//         if(i <= props.startByte && i < props.endByte)
//              cellArray.push(<ByteCell byteValue={splitString[i]} highlight={true} saved={false} key={i}/>)
//         else if(i in props.savedBytes){
//              cellArray.push(<ByteCell byteValue={splitString[i]} highlight={false} saved={true} key={i}/>)
//         }
//              cellArray.push(<ByteCell byteValue={splitString[i]} highlight={false} saved={false} key={i}/>)
//     }

// return(
//     <div>
//         {cellArray}
//      </div>
// )
// }

function DataMapRow(props){

    const handleChange = (event) => {
        console.log(event.target.value);
      };

    return(
        <tr className="dataMapRow">
            <td>{props.field}</td>
            <td>
                <DebounceInput debounceTimeout={300} onChange={event => handleChange(event)} />
            </td>
            <td>
                <DebounceInput debounceTimeout={300} onChange={event => handleChange(event)} />
            </td>
            <td><select>
                    <option value=""></option>
                    <option value="uint8">Unsigned 8-bit Integer</option>
                    <option value="uint16">Unsigned 16-bit Integer</option>
                    <option value="uint32">Unsigned 32-bit Integer</option>
                </select>
            </td>
            <td><button>Calc</button></td>
        </tr>
    )
}

function DataMap(props){

    let field = ['time_stamp', 'latitude', 'longitude', 'air_temp', 'water_temp']
    let dataMapArray = []
    for(let i = 0; i < 5; i++){
        dataMapArray.push(<DataMapRow field={field[i]}/>)
    }
    return(
        <div className='dataMap'>
            <table className="dataMapTable">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Byte Start</th>
                        <th>Byte End</th>
                        <th>Format</th>
                        <th>Math</th>
                    </tr>
                    </thead>
                    <tbody>
                        {dataMapArray}
                    </tbody>
            </table>
        </div>
    )
}

function FileUpload() {

  const [file, setFile] = useState(null);
  const [fileContents, setFileContents] = useState(null);


  function openFile(file){
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      let readerResult = arrayBufferToHex(reader.result)
      setFileContents(readerResult)
    };
  }

  const handleChange = (file) => {
    setFile(file);
    openFile(file)
  };

  return (
    <div className="App">
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        children={<BoxArea text={file? `${file.name}` : '+ Add an SBD file'}/>}
      />

        <div className='rawBinaryTablWrapper'>
            <p>{file ? `File size: ${file.size} Bytes` : ""}</p>
            {fileContents? <RawBinaryTable binary={fileContents}/> : null}
        </div>
    </div>
  );
}


export default function BinaryMap(){

    return(
        <div>
            <FileUpload />
            <DataMap />
        </div>

    )
}