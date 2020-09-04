import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ columns, sortColumns, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumns={sortColumns}
        onSort={onSort}
      />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
