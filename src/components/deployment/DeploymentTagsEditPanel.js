import { useState } from "react";
import DeploymentTags from "./DeploymentTags";
import dbstyles from '../dashboard/Dashboard.module.css'

export default function DeploymentTagsEditPanel(props){

     return(<div style={{border: '0px solid blue'}}>
                {props.updatedDeployment.tags?<DeploymentTags deployment={props.updatedDeployment}/>:''}
                <button className={dbstyles.tag} style={{backgroundColor: 'inherit', border: '1px solid grey', cursor: 'pointer'}} onClick={()=>{props.setTagModalOpen(true)}}>
                    <span className={dbstyles.tagText} style={{color: 'grey'}}>+ Add Tag</span>
                </button>
            </div>)
}