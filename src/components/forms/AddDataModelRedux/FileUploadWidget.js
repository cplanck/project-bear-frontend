import { FileUploader } from "react-drag-drop-files";
import React, { useState } from "react";
const fileTypes = ["csv"];
import styles from '@/components/instrument/Instrument.module.css'
import DatasetIcon from '@mui/icons-material/Dataset';


function FileAdded(props){
  return(
      <div className={styles.csvDropArea}>
        <DatasetIcon style={{color: 'var(--dark-theme-blue)', marginRight: '5px'}}/>
        {props.fileName}
        {/* <button onClick={()=>{clearForm}}>Remove</button> */}
      </div>
  )
}

function NoFileAdded(props){
  return(
    <div className={styles.csvDropArea}>Drag and drop a CSV <span className="darkThemeBlueText ms-2" style={{cursor: 'pointer'}}>datasheet</span></div>
  )
}

export default function FileUploadWdiget(props) {

  return (
      <FileUploader
        multiple={false}
        maxSize={20000000}
        minSize={0}
        handleChange={(file)=>props.fileUpload(file)}
        name="file"
        types={fileTypes}
        >
        {/* <FileDropBoxArea text={props.fileName? <span className={styles.csvDropText}><DatasetIcon className="me-3"/>{props.fileName}</span> : <span>Drag and drop a CSV or browse your files</span> }/> */}
        {props.fileName?<FileAdded fileName={props.fileName}/>:<NoFileAdded/>}
        </FileUploader>
      
  );
}