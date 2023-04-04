import { FileUploader } from "react-drag-drop-files";
import React, { useState } from "react";
const fileTypes = ["csv"];
import styles from '@/components/instrument/Instrument.module.css'



function FileDropBoxArea(props){
  return(
    <div className={styles.csvDropArea}>{props.text}</div>
  )
}

export default function CSVFileUpload(props) {

  return (
      <FileUploader
        multiple={false}
        maxSize={20000000}
        minSize={0}
        handleChange={(file)=>props.fileUpload(file)}
        name="file"
        types={fileTypes}
        // children={}
        >
        <FileDropBoxArea text={props.fileName? `${props.fileName}` : '+ Auto configure from datasheet' }/>
        </FileUploader>
      
  );
}