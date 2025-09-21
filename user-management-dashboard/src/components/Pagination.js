import React from 'react';

function Pagination({ totalItems, pageSize, currentPage, onPageSizeChange, onPageChange }) {
  const pageSizes = [10, 25, 50, 100];
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
      <label>
        Page size:
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ marginLeft: 5 }}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </label>

      <div>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => onPageChange(idx + 1)}
            disabled={currentPage === idx + 1}
            style={{
              marginLeft: 5,
              padding: '5px 10px',
              backgroundColor: currentPage === idx + 1 ? '#007bff' : '#fff',
              color: currentPage === idx + 1 ? '#fff' : '#000',
              border: '1px solid #007bff',
              cursor: currentPage === idx + 1 ? 'default' : 'pointer',
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
