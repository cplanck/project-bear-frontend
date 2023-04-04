import Tooltip from '@mui/material/Tooltip';
import ReplayIcon from '@mui/icons-material/Replay';
import HelpIcon from '@mui/icons-material/Help';


export default function DataModelSelection(){

    let modelOptions = ['SIMB3 (without temp string)', 'SIMB3']
    let modelOptionsList = []
    for(let i = 0; i < modelOptions.length; i++){
        modelOptionsList.push(<option key={i} >{modelOptions[i]}</option>)
    }

    return(
        <div>
            <h2>Select a Database Model</h2>
            <div className='inputSelectWrapper'>
                    <span className='inputSelectLabel'>
                        Database Model
                        <Tooltip className='toolTip' placement="top" title="The column in your database that the decoded value of these bytes will be mapped to.">
                            <HelpIcon fontSize='small' />
                        </Tooltip>
                        </span>
                    <select className='styledSelect' >
                        {modelOptionsList}
                    </select>
                </div>
        </div>
    )
}