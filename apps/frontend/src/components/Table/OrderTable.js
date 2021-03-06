import React, { useEffect, useMemo, useState } from 'react'
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'




// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className="ml-2">
      Buscar:{' '}
      <input
        value={value || ""}
        className="p-2"
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} resultados`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}


function SelectStatusFilter({
  statusColumn,
  preGlobalFilteredRows,
  globalFilter,
  setFilter,
}) {

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = () => {
    fetch("/status")
      .then(res => res.json())
      .then(({ res }) => setStatuses(res))
  }
  
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setFilter(statusColumn, value || [])
  }, 200)

  return (
    <span className="ml-2">
      Estado:{' '}
      <select
        className="uppercase w-1/5"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      >
        <option className="uppercase" value="">TODOS</option>
        {statuses.map(({ id, status }) => (
          <option className="uppercase" key={id} value={status} >
            {status}
          </option>
        ))}
      </select>
    </span>

  )
}

function SelectTechniciansFilter({
  techColumn, 
  preGlobalFilteredRows,
  globalFilter,
  setFilter
}) {
  const [technicians, setTechnicians] = useState([])

  useEffect(() => {
    fetchTechnicians()
  }, [])

  const fetchTechnicians = () => {
    fetch("/technician")
      .then(res => res.json())
      .then(({ res }) => setTechnicians(res))
  }

  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setFilter(techColumn, value || [])
  }, 200)

  return (
    <span className="ml-2">
      T??cnico:{' '}
      <select
        className="uppercase w-1/5"
        value={value || ""}
        onChange={e => {
          // console.log(e.target.value)
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      >
        <option className="uppercase" value="">TODOS</option>
        {technicians.map(({ id, name }) => (
          <option className="uppercase" key={id} value={name} >
            {name}
          </option>
        ))}
      </select>
    </span>
  )

}




function DefaultColumnFilter() {
  return (<></>)
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { threshold: matchSorter.rankings.CONTAINS, keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({
  setIndex,
  toggleModal,
  techColumn,
  statusColumn,
  children,
  columns,
  data,
  orders,
  color = "light"
}) {

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        {
          children
        }
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse" {...getTableProps()}>
            <thead>
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: 'left',
                  }}
                >
                  
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                  
                  <SelectStatusFilter
                    statusColumn={statusColumn}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setFilter={setFilter}
                    />
                  
                  <SelectTechniciansFilter
                    techColumn={techColumn}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setFilter={setFilter}
                  />


                </th>
              </tr>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}
                      className={
                        "px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-gray-100 text-gray-600 border-gray-200"
                          : "bg-blue-800 text-blue-300 border-blue-700")
                      }
                    >
                      {column.render('Header')}
                      {/* Render the columns filter UI */}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}

            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr 
                    {...row.getRowProps()}
                    onClick={() => {
                      if ( setIndex && toggleModal ) {
                        setIndex(orders.filter( order => order.folio === row.original.col2)[0]?.id)
                        toggleModal()
                      }
                    }}
                    className="cursor-default"
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()} className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs uppercase whitespace-no-wrap p-4" >
                            {// Render the cell contents
                              cell.render('Cell')}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table;