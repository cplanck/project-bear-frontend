import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



  
export default function ByteTable(props){

    let entryTable = []
    let mathOperation
    let mathValue
    for(let i = 0; i < props.binaryMap.length; i++){
        for(let j = 0; j < props.binaryMap[i]['math'].length; j++){
            mathOperation = props.binaryMap[i]['math'][j]['operation']
            mathValue = props.binaryMap[i]['math'][j]['value']

        }
        entryTable.push(<p>{props.binaryMap[i]['field']}  {props.binaryMap[i]['format']}  {props.binaryMap[i]['start_byte']}  {props.binaryMap[i]['end_byte']} {mathOperation} {mathValue}   {props.binaryMap[i]['decoded_value']}</p>)
    }

    function createData(field, format, endianness, startByte, endByte, decodedValue) {
        return {field, format, endianness, startByte, endByte, decodedValue};
    }

    let rows = []
    for(let i = 0; i < props.binaryMap.length; i++){
        rows.push(createData(props.binaryMap[i]['field'], props.binaryMap[i]['format'], props.binaryMap[i]['endianness'], props.binaryMap[i]['start_byte'], props.binaryMap[i]['end_byte'], props.binaryMap[i]['decoded_value']))
    }


    return(
        rows.length == 0?
        <div className='binaryTableWrapperNoRows'>
            <div>Table will populate after bytes are assigned.</div>
        </div>:
        <div className='binaryTableWrapper'>
            <TableContainer>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}}>
                <TableCell className='binaryTableHeading'>Data Model Field</TableCell>
                <TableCell className='binaryTableHeading' align="right">Format</TableCell>
                <TableCell className='binaryTableHeading' align="right">Endianness</TableCell>
                <TableCell className='binaryTableHeading' align="center">Start Byte</TableCell>
                <TableCell className='binaryTableHeading' align="center">End Byte</TableCell>
                <TableCell className='binaryTableHeading' align="center">Decoded Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                >
                    <TableCell sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}} component="th" scope="row">
                    {row.field}
                    </TableCell>
                    <TableCell sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}} align="right">{row.format}</TableCell>
                    <TableCell sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}} align="right">{row.endianness}</TableCell>
                    <TableCell sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}} align="center">{row.startByte}</TableCell>
                    <TableCell sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}} align="center">{row.endByte}</TableCell>
                    <TableCell sx={{borderBottom: '2px solid var(--dark-theme-grey-outline)'}} align="center" className='binaryTableHeading'>{row.decodedValue}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
      </div>
        
        )
}