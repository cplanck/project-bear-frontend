import React, { useState, useEffect } from "react";
import FileUpload from './FileUpload'
import ByteGrid from './ByteGrid'
import ByteMapInput from "./ByteMapInput";
import ByteTable from './ByteTable'
import DataModelSelection from './DataModelSelection'
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AppContext } from '../components/Context';
import { useContext } from 'react';


export default function ByteMap(){

    // File, data model, and raw data
    let [file, setFile] = useState(null)
    let [fileName, setFileName] = useState('')
    let [fileSize, setFileSize] = useState('')
    let [rawMessageBytes, setrawMessageBytes] = useState(null);
    let [dataModelFields, setDataModelFields] = useState(['time_stamp', 'dtc_value_1', 'dtc_value_2', 'dtc_value_3', 'latitude', 'longitude'])

    // Current/Form state   
    let [currentSelection, setCurrentSelection] = useState({'field': dataModelFields[0], 'format': 'uint8', 'start_byte': 0, 'end_byte': 0, 'endianness': 'big', 'math': []})
    let [selectionComplete, setSelectionComplete] = useState(false)
    let [decodedValue, setDecodedValue] = useState('')
    let [userConfirm, setUserConfirm] = useState(false)
    let [errorMessage, setErrorMessage] = useState('')

    // Final map
    let [binaryMap, setBinaryMap] = useState([]);

    // useEffect(() => {
    //     if(binaryMap.length > 0){

    //         for(let i = 0)


    //         let lastSave = binaryMap[binaryMap.length - 1]
    //         if(lastSave['end_byte'] == fileSize - 1){
    //             setSelectionComplete(true)
    //         }
    //         else{
    //             setSelectionComplete(false)
    //         }
    //     }
    // },[binaryMap.length])

    function resetForm(){
        setUserConfirm(true)
        setrawMessageBytes(null)
        setFile(null)
        setFileName(null)
        setCurrentSelection({'field': dataModelFields[0], 'format': 'uint8', 'start_byte': 0, 'end_byte': 0, 'endianness': 'big', 'math': []})
        setBinaryMap([])
        setDecodedValue('')
    }


    function DisplayDecodedBinary(props){

        if(props.rawMessageBytes){
            let hexMessageBytes = []
            for(let i = props.currentSelection['start_byte']; i <= props.currentSelection['end_byte']; i++){
                hexMessageBytes.push('0x' + props.rawMessageBytes[i])
            }

            if(props.currentSelection['endianness'] == 'little'){
                hexMessageBytes = hexMessageBytes.reverse()
            }

            var u8 = new Int8Array(hexMessageBytes);
            var view = new DataView(u8.buffer)
            let decodedValue = null
            try
            {   
                if(props.currentSelection['format'] == 'uint8'){
                    decodedValue = view.getUint8()
                }
                else if(props.currentSelection['format'] == 'int8'){
                    decodedValue = view.getInt8()
                }
                else if(props.currentSelection['format'] == 'uint16'){ 
                    decodedValue = view.getUint16()
                }
                else if(props.currentSelection['format'] == 'int16'){
                    decodedValue = view.getInt16() 
                }
                else if(props.currentSelection['format'] == 'uint32'){
                    decodedValue = view.getUint32() 
                }
                else if(props.currentSelection['format'] == 'int32'){
                    decodedValue = view.getInt32()  
                }

                for(let i = 0; i < props.currentSelection.math.length; i++){
                    let math = props.currentSelection.math[i]
                    if(math.operation == 'add'){
                        decodedValue = decodedValue + (math.value ? parseFloat(math.value) : 0)
                    }
                    else if(math.operation == 'subtract'){
                        decodedValue = decodedValue - (math.value ? parseFloat(math.value) : 0)
                    }
                    else if(math.operation == 'multiply'){
                        decodedValue = decodedValue * (math.value ? parseFloat(math.value) : 1)
                    }
                    else if(math.operation == 'divide'){
                        decodedValue = decodedValue/(math.value ? parseFloat(math.value) : 1)
                    }
                }
                setDecodedValue(decodedValue)
                setDecodedValue(Math.round((decodedValue + Number.EPSILON) * 1000000) / 1000000)
            }
            catch{
                console.log('ERROR. NO VALID END BYTE')
            }
        }
        
    }


    function advanceBinaryGrid(){

        let updatedSelection = JSON.parse(JSON.stringify(currentSelection));
        let field = updatedSelection['field']
        let fieldFormat = updatedSelection['format']
        let endByte = updatedSelection['end_byte']

        updatedSelection['start_byte'] = endByte + 1
        if(fieldFormat == 'uint8' || fieldFormat == 'int8'){
                    updatedSelection['end_byte'] = endByte + 1
    
                }
                else if(fieldFormat == 'uint16' || fieldFormat == 'int16'){
                    updatedSelection['end_byte'] = endByte + 2
                }
                else if(fieldFormat == 'uint32' || fieldFormat == 'int32'){
                    updatedSelection['end_byte'] = endByte + 4        
                }
                else if(fieldFormat == 'uint64' || fieldFormat == 'int64'){
                    updatedSelection['end_byte'] = endByte + 8
                }

        let currentFieldIndex = dataModelFields.indexOf(field)
        updatedSelection['field'] = dataModelFields[currentFieldIndex + 1]
        setCurrentSelection(updatedSelection)

    }

    function saveMap(){
        if(currentSelection['format'] != '' && currentSelection['field'] != undefined){
            let currentMap = binaryMap
            currentSelection['decoded_value'] = decodedValue
            currentMap.push(currentSelection)
            setBinaryMap(currentMap)
            advanceBinaryGrid()
        }
    }

    function goBack(){
        
        if(binaryMap.length > 0){
            setCurrentSelection(binaryMap[binaryMap.length - 1])
            binaryMap.pop()
        }
        setBinaryMap(binaryMap)
    }



    return(
        <Container className={'byteMapWrapper'}>
            {/* <AlertDialog open={userConfirm}/> */}
            <h1>Add an Iridium SBD Binary Map</h1>
            <span>A data map connects your binary Iridium file coming from your instrument and your data model. It is what our system uses to make the Iridium message human readable. <a className="link">Learn more.</a></span>
            <DataModelSelection dataModelFields={dataModelFields}/>
            <div className="flexCentered">
                <h2>Map your binary file to database fields</h2>
                <Button variant='text' className='textButton' onClick={() => resetForm()}>Reset File</Button>
            </div>
            <ByteGrid 
                rawMessageBytes={rawMessageBytes} 
                currentSelection={currentSelection} 
                file={file} 
                selectionComplete={selectionComplete}
                fileUpload={<FileUpload file={file} setFile={setFile} fileName={fileName} setFileName={setFileName} fileSize={fileSize} setFileSize={setFileSize} setRawMessageBytes={setrawMessageBytes} resetForm={resetForm}/>}/>
            {fileSize != 0?
            <ByteMapInput 
                dataModelFields={dataModelFields}
                currentSelection={currentSelection}
                binaryMap={binaryMap}
                setCurrentSelection={setCurrentSelection}
                decodedValue={decodedValue}
                file={file}
                fileSize={fileSize}
                selectionComplete={selectionComplete}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                saveMap={saveMap}
                resetForm={resetForm}
                goBack={goBack}
            />
            :''}
            <DisplayDecodedBinary rawMessageBytes={rawMessageBytes} currentSelection={currentSelection} setDecodedValue={setDecodedValue}/>
            {fileSize != 0?
            <div>
                <div className="flexCentered">
                    <h2>Mapped Output</h2>
                    <Button variant='text' className='textButton link' onClick={() => resetForm()}>Start Over</Button>
                </div>
                <ByteTable binaryMap={binaryMap}/>
            </div>
            
            : ''}
            {fileSize != 0?
            <div className='optionButtonWrapper'>
                <h4 className='decodedValue'>{fileSize - currentSelection.end_byte - 1} Bytes left to go</h4>
                <div>
                    <Button className='filledButton' variant="contained" size='small' onClick={() => props.saveMap()}>Save Binary Map</Button>
                </div>
            </div>
            : ''}
            
        </Container>

    )
}

// function AlertDialog(props) {
//   const [open, setOpen] = useState(props.open);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }