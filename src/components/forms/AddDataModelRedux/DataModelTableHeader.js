

import styles from '@/components/instrument/Instrument.module.css'
import Tag from '@/components/general/Tag'

export default function DataModelTableHeader(props){

    let errorCount = 0
    props.currentFieldNameErrors.map((error)=>{error.length!=0?errorCount=errorCount+1:''})


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
                <button className="textButton darkThemeBlueText" onClick={()=>{props.saveUpdatedDataModel()}}>Finish Editing</button>
            </div>
            :
            <div className="flexCenterAndSpaceBetween"> 
             {props.numFields>0?
             <>
                <button className="textButton greyText3" onClick={()=>{clearDataModel()}}>Reset</button>
                <button className="textButton darkThemeBlueText" onClick={()=>{props.setIsEditing(!props.isEditing)}}>Edit</button>
            </>
            :''
            }
            </div>
            
            }
           

        </div>
        <div className='flexStartFlexStartColumn'>
            <span className='greyText3 smallText'>{props.numFields}/200 Fields Configured</span>
            {errorCount != 0 && !props.isEditing?
            <span className='inputErrorMessage dataModel'> {errorCount} field name errors. Click Edit to fix and save.</span>
            :
            // <span className='greenText'>Your database is good to save :)</span>
            ''
            }
        </div>
        </div>
    )
}