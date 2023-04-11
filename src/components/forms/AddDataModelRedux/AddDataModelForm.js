import { Container } from "@mui/system"
import { Grid } from "@mui/material";
import styles from '@/components/instrument/Instrument.module.css'
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CSVtoDataModel from "./CSVtoDataModel";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useContext } from 'react';
import { AppContext } from '@/components/Context'
import structuredClone from "@ungap/structured-clone";
import DataModelTable from "./DataModelTable";
import validateInput from "./validateUserInput";

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
        ])
    }
    },[props.templateInstrument]) 

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

    function handleUserInput(event, id){
        let temp = structuredClone(currentField)
        if(id == 'fieldName'){
            let val = event.target.value
            setFieldName(val)
            console.log(val)
            setFieldNameError(validateInput(dataModel, val, 0))
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
                <span>You configured this instrument from a template, so we have prepopulated your database fields for you. You can still add or subtract fields, or reconfigure it completely from a spreadsheet below.</span>
                :
                <span>Already have a CSV datasheet? Drop it below and we will autoconfigure your database.</span>  
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
            setOkayToSave={props.setOkayToSave}
            />
        
        <div className={'rightButtonGroup'}>
        </div>
    </Container>
    )
}