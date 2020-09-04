import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort(path) {
    const sortColumnsReceived = { ...this.props.sortColumns };
    if (sortColumnsReceived.path === path) {
      sortColumnsReceived.order =
        sortColumnsReceived.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnsReceived.path = path;
      sortColumnsReceived.order = "asc";
    }
    this.props.onSort(sortColumnsReceived);
  }

  renderSortIcon = (column) => {
    const { sortColumns } = this.props;

    if (column.path !== sortColumns.path) return null;
    if (sortColumns.order === "asc")
      return <i class="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i class="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th
                className="clickable"
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label}
                {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
