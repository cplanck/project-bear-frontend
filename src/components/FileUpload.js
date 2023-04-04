import { FileUploader } from "react-drag-drop-files";
import React, { useState } from "react";
import { useContext } from 'react'
import { AppContext } from '../components/Context'

const fileTypes = ["SBD"];
const fileSizeLimit = 1000;


function arrayBufferToHex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
}

function FileDropBoxArea(props){
  return(
    <div className='dropArea'>{props.text}</div>
  )
}


export default function FileUpload(props) {

    const [context, setContext] = useContext(AppContext)

    function renderAlert(alertType, alertSeverity, alertMessage){
        let newContext = context
        newContext[alertType].status = true
        newContext[alertType].type = alertSeverity
        newContext[alertType].message = alertMessage
        setContext( JSON.parse(JSON.stringify(newContext)))
    }

    function closeAlert(alertType){
        let newContext = context
        if(alertType == 'all'){
            newContext['alert'].status = false
            newContext['snackbar'].status = false
        }else{
            newContext[alertType].status = false
        }
        setContext( JSON.parse(JSON.stringify(newContext)))
    }

    function openFile(file){

        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        props.resetForm();
    
        reader.onload = function() {
            let readerResult = arrayBufferToHex(reader.result)
            props.setRawMessageBytes(readerResult.split(' '))
            props.setFileSize(readerResult.split(' ').length)
            props.setFile(file);
            props.setFileName(file['name'])
        };
      }

  const handleChange = (file) => {
        openFile(file)
        closeAlert('all')
  };

  return (
    <div className="App">
      <FileUploader
        multiple={false}
        maxSize={275/1000000}
        minSize={0}
        onSizeError={() => renderAlert('snackbar', 'error', 'Please upload a .sbd file between 0 and 340 bytes!')}
        handleChange={handleChange}
        name="file"
        types={fileTypes}/>

        <FileDropBoxArea text={props.fileName? `${props.fileName}` : '+ Add an SBD file to get started'}/>
      <FileUploader/>
      
    </div>
  );
}