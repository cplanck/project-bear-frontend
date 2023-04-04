import styles from './Deployment.module.css'
import dbstyles from '../dashboard/Dashboard.module.css'
import tinycolor from "tinycolor2";

export function TagsList(props){

    let tagList = []
    for(let i = 0; i<props.deployment.tags.length; i++){
        tagList.push(
        <div className={dbstyles.tag} style={{backgroundColor: `${props.deployment.tags[i]['color']}` + '80', border: `2px solid ${props.deployment.tags[i]['color']}` + '70'}}>
            <span className={dbstyles.tagText} style={{color: tinycolor(props.deployment.tags[i]['color']).lighten(35).toString()}}>{props.deployment.tags[i]['name']}</span>
        </div>)
    }
    return(<div className={dbstyles.tagList}>{tagList}</div>)
}

export default function DeploymentTags(props){
    return(
        <TagsList deployment={props.deployment}/>
    )}