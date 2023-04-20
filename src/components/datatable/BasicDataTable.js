import React, { useCallback, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';

const data = [
  {
    name: 'John',
    lastName: 'Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    id: 10
  },
  {
      name: 'Jane',
      lastName: 'Doe',
      address: '769 Dominic Grove',
      city: 'Columbus',
      state: 'Ohio',
      id: 11
  },
  {
    name: 'Joe',
    lastName: 'Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    id: 12
  },
  {
    name: 'Kevin',
    lastName: 'Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    id: 13
  },
  {
    name:'Joshua',
    lastName: 'Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    id: 14
  },
];

const Example = () => {
  //should be memoized or stable
  let [tableData, setTableData] = useState(data)
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      setRowSelection({})
    },
    [tableData],
  );

  const handleGroupDelete = ()=>{
    console.log(rowSelection)
    if (
      !confirm(`Are you sure you want to delete these rows?`)
    ) {
      return;
    }
    //send api delete request here, then refetch or update local table data for re-render
    const filteredValues = tableData.filter(row=>rowSelection.hasOwnProperty(row.id)?'':row)
    setTableData(filteredValues);
  }

  return( 
  <MaterialReactTable 
  columns={columns} 
  data={tableData} 
  enableEditing
  enableRowSelection
  onRowSelectionChange={setRowSelection}
  getRowId={(originalRow) => originalRow.id}
  state={{ rowSelection }}
  muiToolbarAlertBannerProps={{sx: {backgroundColor: 'var(--dark-theme-input)', color: 'var(--dark-theme-text-main)'}, icon: <button className='iconButton flexCentered' style={{marginLeft: '10px'}} onClick={()=>handleGroupDelete()}><DeleteOutlineOutlinedIcon fontSize='small'/></button> }} // alert 
  muiTablePaperProps={{sx: {backgroundColor: '#131518', color: 'grey', minHeight: '100%'}}} // row style after selection #013978
  muiTableBodyCellProps={{sx: {color: 'var(--dark-theme-text-main)', borderBottom: '1px solid var(--dark-theme-grey-4)'}}} // table row
  muiTableHeadCellProps={{sx: {borderBottom: '1px solid var(--dark-theme-grey-4) '}}}
  renderRowActions={({ row, table }) => (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Tooltip arrow placement="right" title="Delete">
        <button onClick={() => handleDeleteRow(row)} className={'iconButton'}>
          <DeleteOutlineOutlinedIcon fontSize='small' className={'iconButton innerIcon'}/>
        </button>
      </Tooltip>
    </Box>
  )}
  />
  )
};

export default Example;


