import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <li key={1} className="mx-3">
          <button onClick={() => onPageChange(1)}>{1}</button>
        </li>
      );
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`mx-1 ${i === currentPage ? 'active' : ''}`}>
          <button onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <li key="last" className={`mx-3 ${totalPages === currentPage ? 'active' : ''}`}>
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination flex justify-center">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
}

export default Pagination;