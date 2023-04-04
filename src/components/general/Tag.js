import dbstyles from '../dashboard/Dashboard.module.css'
import tinycolor from "tinycolor2";

export default function Tag(props){
    return(
        <div className={dbstyles.tag} style={{backgroundColor: `${props.color}` + '80', border: `2px solid ${props.color}` + '70'}}>
            <span className={dbstyles.tagText} style={{color: tinycolor(props.color).lighten(35).toString()}}>{props.name}</span>
        </div>
    )
}