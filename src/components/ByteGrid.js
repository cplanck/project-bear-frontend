function ByteCell(props){
    let style

    if(props.done){
        style = 'byteCellWrapper byteCellDone'
    }
    else if(props.highlighted){
        style = 'byteCellWrapper byteCellHighlighted'
    }
    else if(props.set){
        style = 'byteCellWrapper byteCellSet'
    }
    else{
        style = 'byteCellWrapper'
    }

    return(
        <div className={style}>
            {props.byteValue}
        </div>
    )
}

export default function ByteGrid(props){

        let splitString = props.rawMessageBytes ? props.rawMessageBytes : []
        let cellArray = []
        
        if(props.file){
            for(let i = 0; i < props.file.size; i++){
                if(props.selectionComplete){
                    cellArray.push(<ByteCell byteValue={splitString[i]} done={true} highlighted={false} set={false} key={i}/>)
                }
                else if(i >= parseInt(props.currentSelection['start_byte']) && i <= parseInt(props.currentSelection['end_byte'])){
                    cellArray.push(<ByteCell byteValue={splitString[i]} highlighted={true} set={false} key={i}/>)
                }
                else{
                    cellArray.push(<ByteCell byteValue={splitString[i]} highlighted={false} set={false} key={i}/>)
                }
            }
        }
        else{
            cellArray.push(<div className="fileUpload">{props.fileUpload}</div>)
        }
 
    return(
        <div className="byteGrid">
            {cellArray}
         </div>
    )
}