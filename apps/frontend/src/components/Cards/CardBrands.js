import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from 'react-router-dom';
// components
import CardEditDeleteDropdown from "components/Dropdowns/CardEditDeleteDropdown";
import Table from "components/Table/Table";

export default function CardBrands({ color="light" }) {

  const [brands, setBrands] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = () => {
    fetch("/marcas")
      .then(res => res.json())
      .then(({ res }) => setBrands(res))
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Marca',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Editar',
        accessor: 'col2',
        disableFilters: true,
      },
    ], []);

  const data = useMemo(() => {

    const brandsFiltered = brands.map(({ id, marca }) => ({
      col1: marca,
      col2: <CardEditDeleteDropdown
        path={`/admin/brand-new/${id}?last_url=${location.pathname}`}
        id={ id }
        table="marcas"
        fetchFunction={ fetchBrands }
      />
    }))

    return brandsFiltered
  }, [ brands, location.pathname ])

  return (
    <Table columns={columns} data={data}>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="flex justify-between">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-gray-800" : "text-white")
                  }
                >
                  Marcas
              </h3>
                <Link to={`/admin/brand-new?last_url=${location.pathname}`}>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Nueva Marca
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </Table>
  )

  // const tableInstance = useTable({ columns, data })
  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = tableInstance;

  // return (
  //   <>
  //     <div
  //       className={
  //         "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
  //         (color === "light" ? "bg-white" : "bg-blue-900 text-white")
  //       }
  //     >
  //       <div className="rounded-t mb-0 px-4 py-3 border-0">
  //         <div className="flex flex-wrap items-center">
  //           <div className="relative w-full px-4 max-w-full flex-grow flex-1">
  //             <div className="flex justify-between">
  //               <h3
  //                 className={
  //                   "font-semibold text-lg " +
  //                   (color === "light" ? "text-gray-800" : "text-white")
  //                 }
  //               >
  //                 Marcas
  //             </h3>
  //               <Link to={`/admin/brand-new?last_url=${location.pathname}`}>
  //                 <button
  //                   className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
  //                   type="button"
  //                 >
  //                   Nueva Marca
  //                 </button>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="block w-full overflow-x-auto">
  //         {/* Projects table */}
  //         <table className="mt-12 items-center w-full bg-transparent border-collapse" {...getTableProps()}>
  //           <thead>
  //             {
  //               headerGroups.map(headerGroup => (
  //                 <tr {...headerGroup.getHeaderGroupProps()}>
  //                   {// Loop over the headers in each row
  //                     headerGroup.headers.map(column => (
  //                       // Apply the header cell props
  //                       <th {...column.getHeaderProps()}
  //                         className={
  //                           "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
  //                           (color === "light"
  //                             ? "bg-gray-100 text-gray-600 border-gray-200"
  //                             : "bg-blue-800 text-blue-300 border-blue-700")
  //                         }
  //                       >
  //                         {// Render the header
  //                           column.render('Header')}
  //                       </th>
  //                     ))}
  //                 </tr>
  //               ))
  //             }
  //           </thead>
  //           <tbody {...getTableBodyProps()} >
  //             {
  //               rows.map(row => {
  //                 // Prepare the row for display
  //                 prepareRow(row)
  //                 return (
  //                   // Apply the row props
  //                   <tr {...row.getRowProps()}>
  //                     {
  //                       // Loop over the rows cells
  //                       row.cells.map(cell => {
  //                         // Apply the cell props
  //                         return (
  //                           <td {...cell.getCellProps()} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4" >
  //                             {// Render the cell contents
  //                               cell.render('Cell')}
  //                           </td>
  //                         )
  //                       })
  //                     }
  //                   </tr>
  //                 )
  //               })
  //             }
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </>
  // );
};
