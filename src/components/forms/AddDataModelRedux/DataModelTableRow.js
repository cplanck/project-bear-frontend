import styles from '@/components/instrument/Instrument.module.css'
import deploymentStyles from '@/components/deployment/Deployment.module.css'
import React, { useEffect, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Grid } from '@mui/material';

export default function DataModelTableRow(props){

    const handleRowEdit = (e, field, id)=>{

        const editedRow = props.editedDataModel.filter(row=>row.id==id)[0]
        let editedRowIndex = props.editedDataModel.map((row,index)=>row.id==id?index:'').filter(item=>item=='')[0]
        
        if(field == 'fieldName'){
            editedRow[field] = e.target.value
        }
        else if(field == 'required' || field=='unique'){
            editedRow[field] = e.target.checked
            console.log('THIS WORKED!')
        }
        const updatedRow = structuredClone(props.editedDataModel)
        console.log('UPDATED ROW:')
        console.log(updatedRow)

        updatedRow[editedRowIndex] = editedRow
        console.log(updatedRow)
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
                <Checkbox className='darkThemeBlueText' onChange={e=>handleRowEdit(e, 'unique', props.dm.id)}/>}
            </Grid>
            <Grid item xs={1} className='greyText2 smallText'><button className="iconButton"  onClick={(e)=>{props.handleRowDelete(e, 'delete', props.dm.id)}}><DeleteForeverOutlinedIcon  className="iconButton" />{props.dm.id}</button></Grid>
            <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}> <span className="inputErrorMessage dataModel">{props.editedFieldNameErrors}</span></Grid>
            </Grid>
        </Grid>
    :
        <Grid container spacing={0} className={deploymentStyles.deploymentDetailsTableRow} id={props.n}>
            <Grid item xs={1} className='boldText smallText'>{props.n}</Grid>
            <Grid item xs={4} className='boldText smallText'><div className='flexCenterFlexStart'>{props.dm.fieldName}{props.currentFieldNameErrors?<div className='smallDot'></div>:''}</div></Grid>
            <Grid item xs={3} className='greyText2 smallText'>{props.dm.type.charAt(0).toUpperCase() + props.dm.type.slice(1)}</Grid>
            <Grid item xs={2} className='greyText2 smallText'>{props.dm.required?<CheckBoxIcon fontSize="small"/>:<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Grid>
            <Grid item xs={2} className='greyText2 smallText'>{props.dm.unique?<CheckBoxIcon fontSize="small"/>:<CheckBoxOutlineBlankOutlinedIcon fontSize="small"/>}</Grid>
        </Grid>
    )
}