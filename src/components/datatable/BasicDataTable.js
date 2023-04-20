import React, { useCallback, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

const Example = () => {
  //should be memoized or stable
  let [tableData, setTableData] = useState(data)
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
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
        !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  return( 
  <MaterialReactTable 
  columns={columns} 
  data={tableData} 
  enableEditing
  enableRowSelection
  onRowSelectionChange={setRowSelection}
  state={{ rowSelection }}

  muiToolbarAlertBannerProps={{sx: {backgroundColor: '#02040A', color: 'grey'}}} // alert 

  // muiTableFooterProps={{sx: {fill: 'pink', border: '20px solid pink'}}} // footer 

  // muiTableBodyRowProps={{sx: {backgroundColor: 'red', borderBottom: '10px solid yellow'}}} // row style

  muiTablePaperProps={{sx: {backgroundColor: 'var(--main-bg-color)', border: '0px solid red', color: 'grey'}}} // row style after selection

  // muiTableProps={{sx: {backgroundColor: '#02040A', color: 'pink', border: '0px solid blue'}}} // row style after selection

  muiTableBodyCellProps={{sx: {backgroundColor: 'var(--main-bg-color)', color: 'var(--dark-theme-text-main)', borderBottom: '1px solid var(--dark-theme-grey-4)'}}} // table row

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


