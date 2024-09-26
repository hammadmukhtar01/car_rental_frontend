import React from "react";
import classnames from "classnames";
import { usePagination } from "./usePagination";
import "./vehicleDetails.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <>
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        <span>
          Page <b>{currentPage}</b> of <b>{lastPage}</b>
        </span>
        <li
          className={classnames("pagination-item first", {
            disabled: currentPage === 1,
          })}
          onClick={currentPage > 1 ? onPrevious : null}
        >
          <div className="arrow left" />
        </li>
        <li
          className={classnames("pagination-item last", {
            disabled: currentPage === lastPage,
          })}
          onClick={currentPage < lastPage ? onNext : null}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
