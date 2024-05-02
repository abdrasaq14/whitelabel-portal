import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSingleState } from "../../hooks/useSingleState";
import { ErrorBoundary } from "../../shared_components/ErrorBoundary";
import Action, { ActionOptionProps } from "../Action/Action";
import Filter from "../Filter/Filter";
import Spinner from "../spinner/Spinner";
import { Paginator } from "./Paginator";
// import { useTable, Column } from "react-table";

export interface ITableProps<TRow> {
  id?: string;
  tableName?: string;
  bulkAction?: Array<{
    text: React.ReactNode;
    action: (ids: string[]) => void;
    type?: "info" | "warning" | "danger" | "success";
  }>;
  topSlot?: React.ReactNode;
  data?: NonNullable<TRow[]> | undefined;
  loading: boolean;
  emptyMessage?: React.ReactNode;
  onSelectRows?: (e:any) => any;
  columns: Array<{
    header: React.ReactNode;
    view: (
      row: TRow,
      index: number
    ) =>
      | React.ReactNode
      | {
        mobile?: React.ReactNode | false;
        desktop: React.ReactNode;
      };
  }>;
  clickRowAction?: (row: TRow, index: number) => void;
  rowActions?: (row: TRow, index: number) => Array<ActionOptionProps>;
  hideActionName?: boolean;
  pagination?: {
    setPage?: (page: number) => void;
    page?: number;
    pageSize?: number;
    setPageSize?: (pageSize: number) => void;
    totalRows?: number;
  };
  noDivider?: boolean;
}

export function Table<TRow extends {}>({
  id = "",
  columns,
  hideActionName = false,
  noDivider = false,
  onSelectRows,
  ...props
}: ITableProps<TRow>) {
  const data = props.data ?? [];
  const [filter, setFilter] = useState<boolean>(false)
  const isMobile = useSingleState(false);
  const [selectAll, setSelectAll] = useState(false); // State to track select all
  const [selectedRows, setSelectedRows] = useState<Map<number, TRow>>(new Map()); // State to track selected rows by index
  useEffect(() => {
    const handleResize = () => {
      isMobile.set(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(selectedRows)

  useEffect(() => {
    if (selectAll) {
      const selectedRowsMap = new Map<number, TRow>();
      data.forEach((row, index) => {
        selectedRowsMap.set(index, row);
      });
      // onSelectRows && (onSelectRows(selectedRows))
      setSelectedRows(selectedRowsMap);
    } else {
      setSelectedRows(new Map());
    }

  
  }, [selectAll, data]);

  console.log(selectedRows)

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  useEffect(() => {
   onSelectRows && onSelectRows(selectedRows)
  }, [selectedRows])


  const handleRowSelect = (rowIndex: number, row: TRow) => {
    
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Map(prevSelectedRows);
      if (newSelectedRows.has(rowIndex)) {
        newSelectedRows.delete(rowIndex);
      } else {
        newSelectedRows.set(rowIndex, row);
      }
      return newSelectedRows;
    });
  };



  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }: { indeterminate: any }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef: any = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            className="rounded focus:ring-pc-secondaryshade1 form-checkbox border-[#E4E7EC] text-pc-secondaryshade1"
            type="checkbox"
            ref={resolvedRef}
            {...rest}
          />
        </>
      );
    }
  );

  return (
    <ErrorBoundary>
      <Filter open={filter} onClose={() => setFilter(false)} />
      <div
        className={clsx([
          "flex flex-col relative overflow-y-hidden overflow-x-auto w-full h-full bg-white rounded-lg",
        ])}
      >
        {/* <!-- body --> */}
        <div className="flex-1 overflow-hidden relative px-4">
          {props.loading && (
            <div className="absolute top-0 w-full  z-10 text-center">
              {/* <Loader type="bar" /> */}
              <Spinner />
            </div>
          )}
          <div className="flex justify-between py-6">
            <h4 className="my-auto">{props.tableName}</h4>
            {/* <div className="flex">
                <div className="flex mr-4">
                  <p className="my-auto mr-2">Show or hide columns</p>
                  <ChevronDownIcon
                    width={16}
                    fontWeight={700}
                    className="my-auto font-black"
                  />
                </div>
                <div onClick={() => setFilter(true)} className="bg-[#EAEAEA] flex  p-2 rounded cursor-pointer">
                  <span>
                    <img src="/icons/filter.svg" alt="" className="mr-2" />
                  </span>
                  Filter
                </div>
              </div> */}
          </div>
          <div>
            {props.topSlot && <div className="px-3  py-3">{props.topSlot}</div>}
          </div>
          <div className="h-full w-full overflow-x-hidden hover:overflow-x-auto custom-scrollbar relative">
            <table className="table  table-auto w-full border-collapse border-[#E4E7EC] ">
              <thead className=" sticky top-0">
                <tr className="py-1  border-b !border-[#E4E7EC] h-[2.813rem]">
                  {props.bulkAction && <th></th>}
                  <th className="px-4 mx-2 bg-[#F4F5F6] w-0">
                    <input

                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      name=""
                      id=""
                      className="w-4 h-4 bg-red-500"
                    />
                  </th>
                  {columns.map((col) => {
                    const view = data[0] && col.view(data[0], 0);
                    const isAnObject =
                      typeof view !== "string" &&
                      typeof view !== "boolean" &&
                      typeof view !== "number" &&
                      view &&
                      "desktop" in view;
                    if (id) {
                      return null;
                    }
                    if (
                      isMobile.get &&
                      isAnObject &&
                      view &&
                      view?.mobile === false
                    )
                      return null;
                    return (
                      <th
                        key={`${col.header}-head`}
                        className="text-mid-night-80 whitespace-nowrap text-[12px] capitalize font-normal text-left px-5 py-3 bg-[#F4F5F6]   max-w-sm"
                      >
                        <span>{col.header}</span>
                      </th>
                    );
                  })}
                  {props.rowActions &&
                    props.rowActions({} as any, 0).length > 0 && (
                      <th
                        className="text-mid-night-80 text-[14px] font-normal bg-[#F4F5F6]  text-right px-6 py-3 whitespace-nowrap
                      pc-bg-gray-2  first:rounded-tl-lg last:rounded-tr-lg max-w-sm"
                      >
                        {hideActionName ? "" : "Action"}
                      </th>
                    )}
                </tr>
              </thead>
              <tbody className="px-4 mt-5 text-mid-night-80/80 ">
                {data.length < 1 && !props.loading && (
                  <tr className=" text-base">
                    <td colSpan={columns.length + 1} className="py-40">
                      <div className="w-full grid place-content-center">
                        {props.emptyMessage ?? (
                          <TableEmpty
                            title="Nothing to see yet"
                            subtitle="Records will be listed here"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                )}
                {data.map((row, rowIndex) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className={clsx(
                      "px-5 py-1 h-[4.5rem]",
                      "text-sm",
                      noDivider
                        ? ""
                        : "border-b last:border-b-0 border-[#E4E7EC]",
                      "bg-white ",
                      props.clickRowAction &&
                      "hover:bg-fara-blue/10 cursor-pointer"
                    )}
                  >
                    <td className="px-4">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={selectedRows.has(rowIndex)}
                        onChange={() => handleRowSelect(rowIndex, row)}
                        className="w-4 h-4 checked:shadow-xl border border-gray-500"
                      />
                    </td>
                    {columns.map((col, colIndex) => (
                      <TableCol
                        key={`row-${rowIndex} + col-${colIndex}`}
                        {...{
                          col,
                          row,
                          rowIndex,
                          id,
                          isMobile: isMobile.get,
                          clickRowAction: props.clickRowAction,
                        }}
                      />
                    ))}
                    {props.rowActions &&
                      props.rowActions({} as any, 0).length > 0 && (
                        <td className="px-2">
                          <div className="flex justify-end pr-6 pl-5">
                            <Action
                              variant="vertical"
                              options={props.rowActions(row, rowIndex)}
                            />
                          </div>
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* footer */}
        {props.pagination && (
          <div className="border-t h-14 mx-4 border-[#E4E7EC] relative z-0 bg-white">
            {/* pagination */}
            <Pagination
              {...props.pagination}
              currentLength={data.length}
              loading={props.loading}
              withNumber
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

const TableCol = <TRow,>({
  col,
  rowIndex,
  id,
  isMobile,
  row,
  clickRowAction,
}: {
  rowIndex: number;
  id: string;
  isMobile: boolean;
  col: ITableProps<TRow>["columns"][number];
  row: TRow;
  clickRowAction: ITableProps<TRow>["clickRowAction"];
}) => {
  const view = col.view(row, rowIndex);
  const viewIsAnObject =
    typeof view !== "string" &&
    typeof view !== "boolean" &&
    typeof view !== "number" &&
    view &&
    "desktop" in view;
  if (id) {
    return null;
  }
  if (isMobile && viewIsAnObject && view.mobile === false) return null;
  return (
    <td
      className={clsx(
        "px-6 py-5 text-left font-normal max-w-sm whitespace-nowrap",
        clickRowAction && "cursor-pointer"
      )}
      onClick={() => clickRowAction?.(row, rowIndex)}
    >
      {!viewIsAnObject
        ? view
        : isMobile && view.mobile
          ? view.mobile
          : view.desktop}
    </td>
  );
};

const Pagination = ({
  page = 1,
  pageSize = 1,
  totalRows = 0,
  setPage,
  setPageSize,
  currentLength,
  loading,
  withNumber,
}: {
  setPage?: (page: number) => void;
  page?: number;
  pageSize?: number;
  setPageSize?: (pageSize: number) => void;
  totalRows?: number;
  currentLength: number;
  loading: boolean;
  withNumber: boolean;
}) => {
  const pageStart = pageSize * (page - 1);
  const lastPage = Math.ceil(totalRows / pageSize);
  return (
    <div className="flex items-center justify-center h-full px-4 py-1 text-sm text-gm-blue-main">
      {/* <div className="mr-10">
          <span className="">Items per page</span>
          <select
            className="border border-fara-blue/30 w-12 ml-2 h-8 bg-transparent"
            value={pageSize}
            onChange={(e) => setPageSize?.(+e.target.value)}
          >
            {[10, 20, 25, 30, 40, 50, 100].map((size) => (
              <option key={size.toString()}>{size}</option>
            ))}
          </select>
        </div> */}

      {withNumber ? (
        <Paginator
          page={page}
          pageSize={pageSize}
          loading={loading}
          currentLength={currentLength}
          setPage={setPage}
          totalRows={totalRows}
        />
      ) : (
        <div className="flex items-center ">
          <button
            disabled={page <= 1}
            onClick={() => setPage?.(1)}
            className={clsx(
              "mr-3 bg-fara-blue text-white p-1.5",
              page <= 1 ? "opacity-50" : ""
            )}
          >
            <ChevronDoubleLeftIcon className="w-4 h-4" strokeWidth={1} />
          </button>
          <button
            onClick={() => setPage?.(page - 1)}
            disabled={page <= 1}
            className={clsx(
              "mr-3 bg-fara-blue text-white p-1.5",
              page <= 1 ? "opacity-50" : ""
            )}
          >
            <ChevronLeftIcon strokeWidth={1} className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage?.(page + 1)}
            disabled={page >= lastPage}
            className={clsx(
              "mr-3 bg-fara-blue text-white p-1.5",
              page >= lastPage ? "opacity-50" : ""
            )}
          >
            <ChevronRightIcon strokeWidth={3} className="w-4 h-4" />
          </button>
          <button
            disabled={page >= lastPage}
            onClick={() => setPage?.(lastPage)}
            className={clsx(
              "bg-fara-blue text-white p-1.5",
              page >= lastPage ? "opacity-50" : ""
            )}
          >
            <ChevronDoubleRightIcon strokeWidth={1} className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export const TableEmpty = (props: {
  title: string;
  subtitle: string;
  image?: string;
}) => {
  return (
    <div className="max-w-[264px]  text-center flex flex-col items-center ">
      <img src={props.image ?? "/icons/table-empty.svg"} />
      <p className="text-base font-medium text-mid-night-80 mt-4">
        {props.title}
      </p>
      <p className="text-sm text-mid-night-40 mt-2">{props.subtitle}</p>
    </div>
  );
};
