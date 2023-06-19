
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsSearch,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";

const DynamicTable = ({tableColums, data}) => {

  const colums = useMemo(() => tableColums, []);
  const tableData = useMemo(() => data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns: colums,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;


  return (
    <div className="p-8">
      {/* {JSON.stringify(tableData)} */}
      <div className="bg-blue-700 mb-4 py-4 flex gap-4 justify-between items-center pr-8  ">
        <p className="pl-8 text-2xl font-bold text-gray-200 italic">
          Liste des utilisateurs
        </p>
        <SearchInputCpn filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      {globalFilter
        ? rows.length == 0 && (
            <p className="text-center font-bold text-white w-full bg-red-300 py-3">
              Aucune correspondance retrouvée
            </p>
          )
        : null}
      {rows.length !== 0 && (
        <table {...getTableProps()} className="bg-gray-200 w-full py-4">
          <thead className="border-b-4 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-blue-700 text-white rounded-[20px]"
              >
                {headerGroup.headers.map((colum) => (
                  <th
                    {...colum.getHeaderProps(colum.getSortByToggleProps())}
                    className="px-6 py-2  "
                  >
                    <span className="flex gap-2 justify-center items-center">
                      {colum.render("Header")}

                      {colum.isSorted ? (
                        colum.isSortedDesc ? (
                          <BsCaretDownFill className="text-md" />
                        ) : (
                          <BsCaretUpFill className="text-md font-bold" />
                        )
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="text-center font-bold text-gray-700 py-1"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <TableFooter
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default DynamicTable;

const SearchInputCpn = ({ filter, setFilter }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.style = "none";
  }, []);

  return (
    <div className="font-bold text-lg text-gray-200">
      <div className="flex gap-2 items-center text-gray-800 py-2 px-4 bg-gray-100 text-slate-700 font-bold focus:ring-white">
        <span>
          <BsSearch />
        </span>
        <input
          className="text-gray-600 py-2 px-4 bg-white/75 font-medium italic"
          ref={inputRef}
          placeholder="Effectuer une recherche"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

const TableFooter = ({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  gotoPage,
  pageSize,
  setPageSize,
}) => {
  return (
    <>
      <div className="flex justify-around items-center gap-2 bg-gray-300 py-2">
        <div className="flex justify-center items-center gap-2 font-bold">
          <div className="flex justify-center items-center gap-2 bg-gray-300 py-2">
            show per page
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-1"
            >
              {[10, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>{" "}
        </div>

        <div className="flex gap-2">
          {canPreviousPage && (
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="flex items-center justify-center font-bold w-[150px] border-4 border-slate-700 py-1 px-3 rounded-lg"
            >
              <BsCaretLeftFill className="text-lg" />
              previous page
            </button>
          )}

          {canNextPage && (
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="flex items-center justify-center font-bold w-[150px] border-4 border-slate-700 py-1 px-3 rounded-lg"
            >
              next page
              <BsCaretRightFill />
            </button>
          )}
        </div>

        <div className="flex justify-center items-center gap-2 font-bold">
          <div className="flex justify-center items-center gap-2 bg-gray-300 py-2">
            <select
              value={pageIndex + 1}
              onChange={(e) => gotoPage(e.target.value - 1)}
              className="px-3 py-1"
            >
              {pageOptions.map((index) => (
                <option key={index} value={index + 1}>
                  Page {index + 1}
                </option>
              ))}
            </select>
          </div>{" "}
          of {pageOptions.length}
        </div>
      </div>
    </>
  );
};
