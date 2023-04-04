import { Container } from "@mui/system"
import { Grid } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from "react";
import styles from '@/components/instrument/Instrument.module.css'
import deploymentStyles from '@/components/deployment/Deployment.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CSVtoDataModel from "@/components/widgets/CSVtoDataModel";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useContext } from 'react';
import { AppContext } from '@/components/Context'
import structuredClone from "@ungap/structured-clone";
import CSVFileUpload from "./CSVFileUpload";


const checkDuplicateFieldNames = (fieldList, fieldName) => {
    let existingFieldNames = fieldList.map(row=>row.fieldName)
    if(existingFieldNames.includes(fieldName)){return true}
    else{return false}
}

const checkDuplicateFieldNamesEdit = (fieldList, fieldName) => {
    let existingFieldNames = fieldList.map(row=>row.fieldName)
    if(getOccurrence(existingFieldNames,fieldName) > 1){return true}
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

const getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function DataModelTableHeader(props){
    return(
        <div className={styles.dataModelTableHeader}>
            <h3 className='removeHeaderMargin'>Your Database</h3>
            {props.isEditing?
            <div className="flexCenterAndSpaceBetween">
                <button className="textButton" onClick={()=>{props.setIsEditing(!props.isEditing)}}>Close</button>
                {props.fieldError?
                <button disabled className="textButton" onClick={()=>{props.saveUpdatedDataModel()}}>Save</button>
                :
                <button className="textButton" onClick={()=>{props.saveUpdatedDataModel()}}>Save</button>
            }
            </div>
            :
            <button className="textButton" onClick={()=>{props.setIsEditing(!props.isEditing)}}>Edit</button>
            }
        </div>
    )
}

function DataModelTable(props){

    const [editedDataModel, setEditedDataModel] = useState(structuredClone(props.dataModel))
    const [fieldError, setFieldError] = useState(false)

    useEffect(()=>{
        setEditedDataModel(structuredClone(props.dataModel))
     },[props.isEditing])

    const handleEditChanges = (event, id) => {
        if(id = 'fieldName'){
            let val = event.target.value
            let temp = structuredClone(props.editedDataModel)
            if(!checkDuplicateFieldNames(props.editedDataModel, val)){
                setFieldName(val)
                temp[id] = val
            }else{
                setFieldNameError
            }
        }
    }

    const handleModifyFieldClick = (e, method, rowID) =>{
        e.preventDefault()
        console.log('this runn???')
        let temp = editedDataModel.filter((dmrow)=>dmrow['id']!=rowID)
        setEditedDataModel(temp)
    }

    const saveUpdatedDataModel = () => {
        const temp = structuredClone(editedDataModel)
        props.setDataModel(temp)
        props.setIsEditing(!props.isEditing)
        props.handleAlerts('snackbar', 'success', 'Changes saved!')
    }

    let dataModelEntries
    if(props.isEditing){
        dataModelEntries = editedDataModel.map((dataModel, index)=><DataModelTableRow 
            dm={dataModel} 
            n={index} 
            key={dataModel.id} 
            isEditing={props.isEditing} 
            setIsEditing={props.setIsEditing} 
            handleEditChanges={handleEditChanges} 
            handleModifyFieldClick={handleModifyFieldClick} 
            dataModelFieldTypes={props.dataModelFieldTypes} 
            editedDataModel={editedDataModel} 
            setEditedDataModel={setEditedDataModel} 
            fieldError={fieldError} 
            setFieldError={setFieldError}
        />)
    }
    else{
        dataModelEntries = props.dataModel.map((dataModel, index)=><DataModelTableRow 
            dm={dataModel} 
            n={index} 
            key={dataModel.id} 
            isEditing={props.isEditing} 
            setIsEditing={props.setIsEditing} 
            handleEditChanges={handleEditChanges} 
            handleModifyFieldClick={handleModifyFieldClick} 
            dataModelFieldTypes={props.dataModelFieldTypes} 
            editedDataModel={editedDataModel} 
            setEditedDataModel={setEditedDataModel} 
            fieldError={fieldError} 
            setFieldError={setFieldError}
        />)
    }

    return(          
        <>
            <DataModelTableHeader isEditing={props.isEditing} setIsEditing={props.setIsEditing} saveUpdatedDataModel={saveUpdatedDataModel} fieldError={fieldError}/>
            <div className={deploymentStyles.deploymentDetailsTableWrapper}>
                <div className={deploymentStyles.deploymentDetailsTableRow} style={{backgroundColor: 'var(--dark-theme-header)', borderTopLeftRadius: '6px', borderTopRightRadius: '6px'}}>
                    <Grid container>
                        <Grid item xs={props.isEditing?1:1}>
                            <span className="boldText">#</span>
                        </Grid>
                        <Grid item xs={props.isEditing?3:4}>
                            <span className="boldText">Field name</span>
                        </Grid>
                        <Grid item xs={props.isEditing?3:3}>
                        <span className="boldText">Type</span>
                        </Grid>
                        <Grid item xs={props.isEditing?2:2}>
                        <span className="boldText">Required</span>
                        </Grid>
                        <Grid item xs={props.isEditing?2:2}>
                        <span className="boldText">Unique</span>
                        </Grid>
                        {props.isEditing?
                        <Grid item xs={1}>
                        <span className="boldText greyText2">Delete</span>
                        </Grid>
                        :''}
                    </Grid>
                </div>
                {dataModelEntries}
            </div>
        </> 
    )
}


function DataModelTableRow(props){

    const [fieldNameError, setFieldNameError] = useState('')

    const validateInput = (editedDataModel, userInput) =>{
        if(checkDuplicateFieldNamesEdit(editedDataModel, userInput)){
            setFieldNameError('This field name already exists')
            props.setFieldError(true)
        }
        else if(!sanitizeUserInput(userInput)){
            setFieldNameError('Field names can only have lowercase a-z letters, numbers or underscores')
            props.setFieldError(true)
        }
        else if(userInput.length < 2){
            setFieldNameError('Field names must have at least 2 letters')
            props.setFieldError(true)
        }
        else{
            setFieldNameError('')
            props.setFieldError(false)
        }
    }

    useEffect(()=>{
        setFieldNameError('')
    },[props.isEditing])

    const handleRowEdit = (e, field, id)=>{

        const editedRow = props.editedDataModel.filter(row=>row.id==id)[0]
        const editedRowIndex = props.editedDataModel.map((row,index)=>row.id==id?index:' ').filter(item=>item=='')[0]
        
        if(field == 'fieldName'){
            editedRow[field] = e.target.value
            validateInput(props.editedDataModel, e.target.value)
        }
        else if(field == 'required' || field=='unique'){
            editedRow[field] = e.target.checked
        }
        const updatedRow = [...props.editedDataModel]
        updatedRow[editedRowIndex] = editedRow
        props.setEditedDataModel(updatedRow)
    }

    return(
        props.isEditing?
        <Grid container spacing={0} className={deploymentStyles.deploymentDetailsTableRow} id={props.n}>
            <Grid item xs={1} className='boldText smallText'>{props.n}</Grid>
            <Grid item xs={3} className='boldText smallText'><input maxLength={20} className="styledInput small" defaultValue={props.dm.fieldName} onChange={e=>handleRowEdit(e, 'fieldName', props.dm.id)}/>
            
            </Grid>
            <Grid item xs={3} className='greyText2 smallText'>
                <select className="styledSelect" style={{maxWidth: '150px'}}>
                    {props.dataModelFieldTypes}
                </select>
            </Grid>
            <Grid item xs={2} className='greyText2 smallText'>
                {props.dm.required?
                <Checkbox defaultChecked onChange={e=>handleRowEdit(e, 'required', props.dm.id)}/>
                :
                <Checkbox onChange={e=>handleRowEdit(e, 'required', props.dm.id)}/>}
            </Grid>
            <Grid item xs={2} className='greyText2 smallText'>
                {props.dm.unique?<Checkbox defaultChecked onChange={e=>handleRowEdit(e, 'unique', props.dm.id)}/>
                :
                <Checkbox onChange={e=>handleRowEdit(e, 'unique', props.dm.id)}/>}
            </Grid>
            <Grid item xs={1} className='greyText2 smallText'><button className="iconButton"  onClick={(e)=>{props.handleModifyFieldClick(e, 'delete', props.dm.id)}}><DeleteOutlineOutlinedIcon  className="iconButton" /></button></Grid>
                <span className="boldText smallText redText">{fieldNameError}</span>
        </Grid>
    :
        <Grid container spacing={0} className={deploymentStyles.deploymentDetailsTableRow} id={props.n}>
            <Grid item xs={1} className='boldText smallText'>{props.n}</Grid>
            <Grid item xs={4} className='boldText smallText'>{props.dm.fieldName}</Grid>
            <Grid item xs={3} className='greyText2 smallText'>{props.dm.type.charAt(0).toUpperCase() + props.dm.type.slice(1)}</Grid>
            <Grid item xs={2} className='greyText2 smallText'>{props.dm.required?<CheckBoxIcon fontSize="small"/>:<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Grid>
            <Grid item xs={2} className='greyText2 smallText'>{props.dm.unique?<CheckBoxIcon fontSize="small"/>:<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Grid>
        </Grid>
    )
}


export default function AddDataModelForm(props){

    const [dataModel, setDataModel] = useState([
        {fieldName:'time_stamp', type: 'number', required: true, unique: true, id: 0},
        {fieldName:'longitude', type: 'number', required: false, unique: false, id: 1},
        {fieldName:'latitude', type: 'number', required: false, unique: false, id: 2},
        {fieldName:'water_temp', type: 'number', required: false, unique: false, id: 3},
        {fieldName:'counter', type: 'number', required: false, unique: false, id: 4},
        {fieldName:'version', type: 'number', required: false, unique: false, id: 5},
    ])

    const [currentField, setCurrentField] = useState({fieldName: '', type: 'number', required: false, unique: false})
    const [isEditing, setIsEditing] = useState(false)
    const [fieldName, setFieldName] = useState('')
    const [fieldNameError, setFieldNameError] = useState('')
    const [context, setContext] = useContext(AppContext)
    const [csvFileName, setCsvFileName] = useState('')


    function handleAlerts(alertType, alertSeverity, alertMessage){
        setContext(structuredClone(context.alert.status=false))
        let newContext = context
        newContext[alertType].status = true
        newContext[alertType].type = alertSeverity
        newContext[alertType].message = alertMessage
        setContext(structuredClone(newContext))
      }

    const fieldTypes = ['Number', 'Character']

    const formik = useFormik({
        initialValues: {
          name: '', 
        },
        validationSchema: Yup.object({
            name: Yup.string().min(0, 'too short').max(10, 'too long').required('You must specify an instrument name'),
          }),
  
        onSubmit: values => {
        },
      });
    
    const dataModelFieldTypes = fieldTypes.map((type, index)=><option key={index} id={type}>{type}</option>)

    function handleUserInput(event, id){
        let temp = structuredClone(currentField)
        if(id == 'fieldName'){
            let val = event.target.value
            setFieldName(val)
            let duplicateName = checkDuplicateFieldNames(dataModel, val)
            temp[id] = val
            !duplicateName?setCurrentField(temp):console.log('ERROR: this name already exisits')
            if(!duplicateName){
                setCurrentField(temp)
                setFieldNameError('')
            }
            else{
                setFieldNameError('This name already exisits')
                console.log('ERROR: this name already exisits')
            }
        }
        else if(id == 'unique' || id == 'required'){
            temp[id] = event.target.checked
            setCurrentField(temp)
        }
    }

    const handleAddFieldClick = (e) =>{
        e.preventDefault()
        let temp = structuredClone(dataModel)
        let nextIndex = temp.map(item=>item.id)
        nextIndex = Math.max(...nextIndex) + 1
        currentField.id = nextIndex
        temp.push(currentField)
        setFieldName('')
        setDataModel(temp)
        setCurrentField({fieldName: '', type: 'number', required: false, unique: false})
    }

    return(
        <Container maxWidth={false} style={{ maxWidth: '900px', paddingTop: '50px'}}>
            {/* <form> */}
                <h2 className='removeHeaderMargin'>Configure Instrument Database</h2>
                <span className='greyText3 smallText'>Your instrument database is the central store of your instruments data. Once configured, you can add data via spreadsheet, REST API, or by adding real-time decoding.</span>
                <hr className='hr my-4'/>
                {/* <span className='inputSelectLabel'>Configure from datasheet</span> */}
                {/* <input 
                id='data-model-name' 
                name='data-model-name'
                className='styledInput small' 
                placeholder="Prototype instrument #3" 
                style={{maxWidth: '400px'}}
                onChange={(e)=>handleUserInput(e, 'dataModelName')}
                /> */}

                <CSVtoDataModel dataModel={dataModel} setDataModel={setDataModel} setCsvFileName={setCsvFileName} csvFileName={csvFileName}/>
                 {/* <hr className='hr my-4'/> */}
                 <h3 className=''>Add a Field</h3>
                 <Grid container rowSpacing={1} columnSpacing={3}>
                    <Grid item xs={12} lg={5}>
                    <span className='inputSelectLabel'>Name<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                    <input 
                    id='data-model-name' 
                    name='data-model-name'
                    className='styledInput small' 
                    placeholder="Ex: time_stamp" 
                    onChange={(e)=>handleUserInput(e, 'fieldName')}
                    value={fieldName}
                    />
                    <span className={"smallText redText boldText"}>{fieldNameError}</span>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <span className='inputSelectLabel'>Field Type<span className='redText boldText ms-2' style={{fontSize: '1.5em'}}>*</span></span>
                        <select className={'styledSelect fullWidth'} onChange={(e)=>handleUserInput(e, 'type')}>
                            {dataModelFieldTypes}
                        </select>
                    </Grid>
                    <Grid item xs={12} lg={12} >
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={(e)=>handleUserInput(e, 'required')}/>} label="Require a value for this field in all rows" />
                        </FormGroup>
                    </Grid> 
                    <Grid item xs={12} lg={12} >
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={(e)=>handleUserInput(e, 'unique')}/>} label="Each row in this column should be unique" />
                        </FormGroup>
                    </Grid> 
                 </Grid>
                 <div className={'leftButtonGroup'}>
                     {fieldNameError || isEditing || currentField.fieldName?.length < 2?
                    <button disabled className='greyButton' onClick={(e)=>{handleAddFieldClick(e)}}><span className="flexCenterAndSpaceBetween">Add field<ArrowDownwardIcon className="ms-3" fontSize="small"/></span></button>
                    :
                    <button className='greyButton' onClick={(e)=>{handleAddFieldClick(e)}}><span className="flexCenterAndSpaceBetween">Add field<ArrowDownwardIcon className="ms-3" fontSize="small"/></span></button>
                     }
                </div>
                 <hr className='hr my-4'/>

            {/* </form> */}

            <DataModelTable dataModel={dataModel} setDataModel={setDataModel} isEditing={isEditing} setIsEditing={setIsEditing} dataModelFieldTypes={dataModelFieldTypes} handleAlerts={handleAlerts}/>
            
            <div className={'rightButtonGroup'}>
                {isEditing?<button disabled type="submit" className='greenButton'>Create Data Model</button>:<button type="submit" className='greenButton'>Submit Data Model</button>}
            </div>
        </Container>
    )
}