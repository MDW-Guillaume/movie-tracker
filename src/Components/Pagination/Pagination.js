import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Nombre maximum de numéros de page à afficher dans la navigation
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <li key={1}>
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

    // Ajouter un lien pour la dernière page si elle n'est pas déjà incluse
    if (endPage < totalPages) {
      pageNumbers.push(
        <li key="last" className={`mx-1 ${totalPages === currentPage ? 'active' : ''}`}>
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