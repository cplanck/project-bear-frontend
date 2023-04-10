

import styles from '@/components/instrument/Instrument.module.css'
import Tag from '@/components/general/Tag'

export default function DataModelTableHeader(props){

    const clearDataModel = ()=>{
        console.log('clearning data model...')
        props.setDataModel([])
    }
    return(
        <div>
        <div className={styles.dataModelTableHeader}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <h3 className='removeHeaderMargin me-3' style={{marginRight: '5px'}}>Your Database</h3>
                {props.csvFileName?<Tag name='Auto Configured' color={'#2ca302'}/>:''}
            </div>
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
            <div className="flexCenterAndSpaceBetween"> 
             {props.numFields>0?
             <>
                <button className="textButton greyText3" onClick={()=>{clearDataModel()} }>Reset</button>
                <button className="textButton" onClick={()=>{props.setIsEditing(!props.isEditing)}}>Edit</button>
            </>
            :''
            }
            </div>
            
            }
           

        </div>
        <span className='greyText3 smallText'>{props.numFields}/200 Fields Configured</span>
        </div>
    )
}