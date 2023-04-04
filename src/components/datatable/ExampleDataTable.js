import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { TextField, Button } from "@material-ui/core";
// import { DataGrid, GridToolbar } from "@material-ui/data-grid";

function EditableCell({ value: initialValue, row: { index }, column: { id }, updateMyData }) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    updateMyData(index, id, value);
  };
  return <TextField value={value} onChange={onChange} onBlur={onBlur} />;
}

export default function Table({ columns, data, updateMyData }) {

    return('hello')
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     selectedFlatRows,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: {
//         selectedRowIds: {},
//       },
//       updateMyData,
//     },
//     useRowSelect,
//     (hooks) => {
//       hooks.visibleColumns.push((columns) => {
//         return [
//           ...columns,
//           {
//             id: "selection",
//             Header: ({ getToggleAllRowsSelectedProps }) => (
//               <div>
//                 <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
//               </div>
//             ),
//             Cell: ({ row }) => (
//               <div>
//                 <input type="checkbox" {...row.getToggleRowSelectedProps()} />
//               </div>
//             ),
//           },
//         ];
//       });
//     }
//   );
//   const handleDeleteRows = () => {
//     selectedFlatRows.forEach((row) => {
//       const index = data.indexOf(row.original);
//       updateMyData(index, "delete", null);
//     });
//   };
//   return (
//     <div>
//       <GridToolbar />
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           {...getTableProps()}
//           {...getTableBodyProps()}
//           rows={rows}
//           onRowClick={() => {}}
//           components={{
//             Cell: EditableCell,
//           }}
//           rowHeight={45}
//           headerHeight={45}
//         >
//           {headerGroups.map((headerGroup) => (
//             <div {...headerGroup.getHeaderGroupProps()} className="tr">
//               {headerGroup.headers.map((column) => (
//                 <div {...column.getHeaderProps()} className="th">
//                   {column.render("Header")}
//                 </div>
//               ))}
//             </div>
//           ))}
//           {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//               <div {...row.getRowProps()} className="tr">
//                 {row.cells.map((cell) => {
//                   return (
//                     <div {...cell.getCellProps()} className="td">
//                       {cell.render("Cell")}
//                     </div>
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </DataGrid>
//         <Button onClick={handleDeleteRows}>Delete Selected Rows</Button>
//       </div>
//     </div>
//   );
}

// function App() {
//   const [data, setData] = useState([
//     {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       age: 30,
//     },
//     {
//       firstName: "Jane",
//       lastName: "Doe",
//       email: "jane.doe@example.com",
//       age: 25,
//     },
//     {
//       firstName: "Bob",
//       lastName: "Smith",
//     }
// ])

// }
