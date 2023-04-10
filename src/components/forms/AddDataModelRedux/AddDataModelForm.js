import { Container } from "@mui/system"
import { Grid } from "@mui/material";
import styles from '@/components/instrument/Instrument.module.css'
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CSVtoDataModel from "./CSVtoDataModel";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useContext } from 'react';
import { AppContext } from '@/components/Context'
import structuredClone from "@ungap/structured-clone";
import DataModelTable from "./DataModelTable";
import { DataArray } from "@mui/icons-material";

const getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

const checkDuplicateFieldNames = (fieldList, fieldName, occuranceNum) => {
    let existingFieldNames = fieldList.map(row=>row.fieldName)
    if(getOccurrence(existingFieldNames,fieldName) > occuranceNum){return true}
    else{return false}
}

const sanitizeUserInput = (userInput) => {
        if(userInput.length > 0){
        const regex = /^[0-9a-z_]+$/
        const isSanitized = regex.exec(userInput)
        return(isSanitized?true:false)
    }
    return(true)
}


export default function AddDataModelForm(props){

    const [dataModel, setDataModel] = useState([])
    const [currentField, setCurrentField] = useState({fieldName: '', type: 'number', required: false, unique: false})
    const [fieldName, setFieldName] = useState('')
    const [fieldNameError, setFieldNameError] = useState('')
    const [context, setContext] = useContext(AppContext)
    const [csvFileName, setCsvFileName] = useState('')
    const [uniqueChecked, setUniqueChecked] = useState({defaultChecked: ''})
    const [requiredChecked, setRequiredChecked] = useState({defaultChecked: ''})

    useEffect(()=>{
        // fetch routine on mount to get template data model selected
        if(props.templateInstrument){
            setDataModel([{fieldName:'time_stamp', type: 'number', required: true, unique: true, id: 0},{fieldName:'longitude', type: 'number', required: false, unique: false, id: 1}])
        }
        else{
            setDataModel([
            // {fieldName:'time_stamp', type: 'number', required: true, unique: true, id: 0},
            // {fieldName:'longitude', type: 'number', required: false, unique: false, id: 1},
            // {fieldName:'latitude', type: 'number', required: false, unique: false, id: 2},
            // {fieldName:'water_temp', type: 'number', required: false, unique: false, id: 3},
            // {fieldName:'counter', type: 'number', required: false, unique: false, id: 4},
            // {fieldName:'version', type: 'number', required: false, unique: false, id: 5},
            // {fieldName:'latitude', type: 'number', required: false, unique: false, id: 6},

        ])
    }
    },[]) 

    function handleAlerts(alertType, alertSeverity, alertMessage){
        setContext(structuredClone(context.alert.status=false))
        let newContext = context
        newContext[alertType].status = true
        newContext[alertType].type = alertSeverity
        newContext[alertType].message = alertMessage
        setContext(structuredClone(newContext))
    }

    const fieldTypes = ['Number', 'Character']
    
    const dataModelFieldTypes = fieldTypes.map((type, index)=><option key={index} id={type}>{type}</option>)

    const validateInput = (dataModel, userInput) =>{

        if(checkDuplicateFieldNames(dataModel, userInput, 0)){
            setFieldNameError('This field name already exists')
        }
        else if(!sanitizeUserInput(userInput)){
            setFieldNameError('Field names can only contain a-z letters, 0-9 numbers, and hyphens and underscores')
        }
        else if(userInput.length < 2){
            setFieldNameError('Field names must be greater than 2 characters')
        }
        else if(userInput.length > 50){
            setFieldNameError('Field names must be less than 50 characters')
        }
        else{
            setFieldNameError('')
        }
    }

    function handleUserInput(event, id){
        let temp = structuredClone(currentField)
        if(id == 'fieldName'){
            let val = event.target.value
            setFieldName(val)
            validateInput(dataModel, val)
            temp[id] = val

            uniqueChecked.defaultChecked=='defaultChecked'?temp['unique'] = true:temp['unique'] = false
            requiredChecked.defaultChecked=='defaultChecked'?temp['required'] = true:temp['required'] = false
            setCurrentField(temp)
        }
        else if(id == 'unique'){
            temp[id] = event.target.checked
            setCurrentField(temp)
            temp[id]?setUniqueChecked({defaultChecked: 'defaultChecked'}):setUniqueChecked({defaultChecked: ''})
        }
        else if(id == 'required'){
            temp[id] = event.target.checked
            setCurrentField(temp)
            temp[id]?setRequiredChecked({defaultChecked: 'defaultChecked'}):setRequiredChecked({defaultChecked: ''})
        }

    }

    const handleAddFieldClick = (e) =>{
        e.preventDefault()
        let temp = structuredClone(dataModel)
        let nextIndex
        if(dataModel.length>0){
            nextIndex = temp.map(item=>item.id)
            nextIndex = Math.max(...nextIndex) + 1
        }
        else{
            nextIndex = 0
        }
        currentField.id = nextIndex
        temp.push(currentField)
        setFieldName('')
        setDataModel(temp)
        setCurrentField({fieldName: '', type: 'number', required: false, unique: false})
    }



    return(
        <Container maxWidth={false} style={{ maxHeight: '700px', paddingTop: '0px', overflow: 'auto'}}>
            <div>
                {props.templateInstrument?
                <span className=''>You configured this instrument from a template, so we've prepopulated your database fields for you. You can still add or subtract fields, or reconfigure it completely from a spreadsheet below.</span>
                :
                <span className=''>Already have a CSV datasheet? Drop it below and we'll autoconfigure you're database.</span>  
                }
                <CSVtoDataModel dataModel={dataModel} setDataModel={setDataModel} setCsvFileName={setCsvFileName} csvFileName={csvFileName} setIsEditing={props.setIsEditing}/>
                <span className='smallText greyText3'>Note: The first row in your CSV should be the headers of your spreadsheet. Your headers should only include a-z letters, 0-9 numbers, or hyphens (-) and underscores (_). <a className="darkThemeBlueText">Click here</a> to download an example. </span>
            </div>
            <h3 className=''>Add a field</h3>
                <Grid container rowSpacing={1} columnSpacing={3}>
                <Grid item xs={12} lg={5} style={{maxWidth: '300px'}}>
                <span className='inputSelectLabel'>Name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                <input 
                id='data-model-name' 
                name='data-model-name'
                className='styledInput small' 
                placeholder="Ex: time_stamp" 
                onChange={(e)=>handleUserInput(e, 'fieldName')}
                value={fieldName}
                />
                </Grid>
                <Grid item xs={12} lg={6} style={{maxWidth: '200px'}}>
                    <span className='inputSelectLabel'>Field Type<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <select className={'styledSelect fullWidth'} onChange={(e)=>handleUserInput(e, 'type')}>
                        {dataModelFieldTypes}
                    </select>
                </Grid>
                <Grid item xs={12} lg={2}>
                    <FormGroup className={styles.radioButton}>
                        <FormControlLabel control={<Checkbox {...requiredChecked} onChange={(e)=>handleUserInput(e, 'required')}/>} label="Required"/>
                    </FormGroup>
                </Grid> 
                <Grid item xs={12} lg={2} >
                    <FormGroup className={styles.radioButton}>
                        <FormControlLabel control={<Checkbox {...uniqueChecked} onChange={(e)=>handleUserInput(e, 'unique')}/>} label="Unique" />
                    </FormGroup>
                </Grid> 
                </Grid>
                <div className={"smallText redText boldText"} style={{minHeight: '20px', border: '0px solid blue'}}>{fieldNameError}</div>
                <div className={'leftButtonGroup'}>
                    {fieldNameError || props.isEditing || currentField.fieldName.length < 2?
                <button disabled className='greyButton' onClick={(e)=>{handleAddFieldClick(e)}}><span className="flexCenterAndSpaceBetween">Add field<ArrowDownwardIcon className="ms-3" fontSize="small"/></span></button>
                :
                <button className='greyButton' onClick={(e)=>{handleAddFieldClick(e)}}><span className="flexCenterAndSpaceBetween">Add field<ArrowDownwardIcon className="ms-3" fontSize="small"/></span></button>
                    }
            </div>
                <hr className='hr my-4'/>

        <DataModelTable 
            dataModel={dataModel} 
            setDataModel={setDataModel} 
            isEditing={props.isEditing} 
            setIsEditing={props.setIsEditing} 
            dataModelFieldTypes={dataModelFieldTypes} 
            handleAlerts={handleAlerts} 
            csvFileName={csvFileName}
            checkDuplicateFieldNames={checkDuplicateFieldNames}
            sanitizeUserInput={sanitizeUserInput}
            setOkayToSave={props.setOkayToSave}
            />
        
        <div className={'rightButtonGroup'}>
        </div>
    </Container>
    )
}