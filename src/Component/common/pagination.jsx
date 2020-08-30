import React from "react";
import _ from "lodash";
const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  // array is made to map pages with PagesCount
  //[1 ... pagesCount].map()

  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 1) return null;
  console.log("current Page" + currentPage);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              href="/#"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
  // );
};

export default Pagination;
