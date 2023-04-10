import styles from '@/components/instrument/Instrument.module.css'
import deploymentStyles from '@/components/deployment/Deployment.module.css'
import React, { useEffect, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/CheckBox'
import { Grid } from '@mui/material';

export default function DataModelTableRow(props){

    const [fieldNameError, setFieldNameError] = useState('')

    const validateInput = (dataModel, userInput) =>{

        if(props.checkDuplicateFieldNames(dataModel, userInput, 1)){
            setFieldNameError('This field name already exists')
            props.setFieldError(true)
            props.setFieldErrorNum()
        }
        else if(!props.sanitizeUserInput(userInput)){
            setFieldNameError('Field names can only have lowercase a-z letters, numbers or underscores')
            props.setFieldError(true)
        }
        else if(userInput.length < 2){
            setFieldNameError('Field names must have at least 2 letters')
            props.setFieldError(true)
        }
        else if(userInput.length > 50){
            setFieldNameError('Field names must be less than 50 characters long')
            props.setFieldError(true)
        }
        else{
            setFieldNameError('')
            // props.setFieldError(null)
        }
    }

    useEffect(()=>{
        setFieldNameError('')
        validateInput(props.editedDataModel, props.dm.fieldName)
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
            <Grid item xs={3} className='boldText smallText'><input maxLength={20} className="styledInput small" defaultValue={props.dm.fieldName} onFocus={e=>handleRowEdit(e, 'fieldName', props.dm.id)} onChange={e=>handleRowEdit(e, 'fieldName', props.dm.id)}/>
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
            <Grid item xs={4} className='boldText smallText'>{props.dm.fieldName}{fieldNameError?<span className="boldText smallText redText">E</span>:''}</Grid>
            <Grid item xs={3} className='greyText2 smallText'>{props.dm.type.charAt(0).toUpperCase() + props.dm.type.slice(1)}</Grid>
            <Grid item xs={2} className='greyText2 smallText'>{props.dm.required?<CheckBoxIcon fontSize="small"/>:<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Grid>
            <Grid item xs={2} className='greyText2 smallText'>{props.dm.unique?<CheckBoxIcon fontSize="small"/>:<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Grid>
        </Grid>
    )
}