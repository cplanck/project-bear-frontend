import styles from '@/components/instrument/Instrument.module.css'
import deploymentStyles from '@/components/deployment/Deployment.module.css'
import DataModelTableRow from './DataModelTableRow'
import { useState, useEffect } from 'react'
import DataModelTableHeader from './DataModelTableHeader'
import { Grid } from '@mui/material'
import validateInput from './validateUserInput'

export default function DataModelTable(props){

    const [editedDataModel, setEditedDataModel] = useState(structuredClone(props.dataModel))
    const [fieldError, setFieldError] = useState(true)
    const [fieldErrorNum, setFieldErrorNum] = useState(0)

    useEffect(()=>{
        setEditedDataModel(structuredClone(props.dataModel))
     },[props.isEditing])

    const handleEditChanges = (event, id) => {
        if(id = 'fieldName'){
            let val = event.target.value
            let temp = structuredClone(props.editedDataModel)
            if(!props.checkDuplicateFieldNamesEdit(props.editedDataModel, val)){
                setFieldName(val)
                temp[id] = val
            }else{
                setFieldNameError
            }
        }
    }

    const handleRowDelete = (e, method, rowID) =>{
        e.preventDefault()
        console.log('delete clicked!')
        console.log(rowID)
        let temp = editedDataModel.filter(dmrow=>dmrow['id']!=rowID)
        setEditedDataModel(temp)
    }

    const saveUpdatedDataModel = () => {
        const temp = structuredClone(editedDataModel)
        props.setDataModel(temp)
        props.setIsEditing(!props.isEditing)
        props.handleAlerts('snackbar', 'success', 'Changes saved!')
    }

    let currentFieldNameErrors = props.dataModel.map((dataModelRow, index)=>validateInput(props.dataModel, dataModelRow.fieldName, 1))
    let editedFieldNameErrors = editedDataModel.map((dataModelRow, index)=>validateInput(editedDataModel, dataModelRow.fieldName, 1))

    useEffect(()=>{
        let errorNum = 0
        currentFieldNameErrors.map((error)=>{error.length!=0?errorNum=errorNum+1:''})
        console.log(errorNum)
        errorNum!=0?props.setOkayToSave(false):props.setOkayToSave(true)
    },[props.dataModel])


    let dataModelEntries
    if(props.isEditing){
        dataModelEntries = editedDataModel.map((dataModel, index)=><DataModelTableRow 
            dm={dataModel} 
            n={index} 
            key={dataModel.id} 
            isEditing={props.isEditing} 
            setIsEditing={props.setIsEditing} 
            handleEditChanges={handleEditChanges} 
            handleRowDelete={handleRowDelete} 
            dataModelFieldTypes={props.dataModelFieldTypes} 
            editedDataModel={editedDataModel} 
            setEditedDataModel={setEditedDataModel} 
            fieldError={fieldError} 
            setFieldError={setFieldError}
            checkDuplicateFieldNames={props.checkDuplicateFieldNames}
            sanitizeUserInput={props.sanitizeUserInput}
            csvFileName={props.csvFileName}
            fieldErrorNum={fieldErrorNum}
            setFieldErrorNum={setFieldErrorNum}
            editedFieldNameErrors={editedFieldNameErrors[index]}
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
            handleRowDelete={handleRowDelete} 
            dataModelFieldTypes={props.dataModelFieldTypes} 
            editedDataModel={editedDataModel} 
            setEditedDataModel={setEditedDataModel} 
            fieldError={fieldError} 
            setFieldError={setFieldError}
            checkDuplicateFieldNames={props.checkDuplicateFieldNames}
            sanitizeUserInput={props.sanitizeUserInput}
            csvFileName={props.csvFileName}
            fieldErrorNum={fieldErrorNum}
            setFieldErrorNum={setFieldErrorNum}
            currentFieldNameErrors={currentFieldNameErrors[index]}
        />)
    }

    return(          
        <>
            <DataModelTableHeader 
                isEditing={props.isEditing} 
                setIsEditing={props.setIsEditing} 
                saveUpdatedDataModel={saveUpdatedDataModel} 
                fieldError={fieldError} 
                setEditedDataModel={setEditedDataModel} 
                setDataModel={props.setDataModel} 
                numFields={dataModelEntries.length} 
                csvFileName={props.csvFileName} c
                currentFieldNameErrors={currentFieldNameErrors} 
                setOkayToSave={props.setOkayToSave}
            />
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
                {dataModelEntries.length != 0?dataModelEntries:
                <div className='flexCenterAndCenter'>
                    <p className='greyText3 smallText'>Add rows above to configure your database</p>
                </div>
                }
            </div>
        </> 
    )
}