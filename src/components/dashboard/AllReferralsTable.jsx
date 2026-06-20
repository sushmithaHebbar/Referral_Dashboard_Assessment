import { useNavigate } from 'react-router-dom';

const AllReferralsTable = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  currentReferrals,
  totalReferrals,
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  formatDate,
  formatProfit,
  tableLoading,
}) => {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section all-referrals-section">
      <div className="table-header-controls">
        <h2 className="section-title">All referrals</h2>
        <div className="controls-group">
          <div className="search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Name or service…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search referrals"
            />
          </div>

          <div className="sort-wrapper">
            <label className="sort-label">
              Sort by date
              <select
                className="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="table-container" style={{ position: 'relative' }}>
        {tableLoading && (
          <div className="table-loading-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            borderRadius: 'var(--radius-md)'
          }}>
            <div className="loading-spinner" style={{ width: '30px', height: '30px' }}></div>
          </div>
        )}
        <table className="referrals-table" style={{ opacity: tableLoading ? 0.55 : 1, transition: 'opacity 0.15s ease' }}>
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">SERVICE</th>
              <th scope="col">DATE</th>
              <th scope="col">PROFIT</th>
            </tr>
          </thead>
          <tbody>
            {currentReferrals.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-state-cell">
                  No matching entries
                </td>
              </tr>
            ) : (
              currentReferrals.map((row) => (
                <tr
                  key={row.id}
                  className="table-row-clickable"
                  onClick={() => navigate(`/referral/${row.id}`)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/referral/${row.id}`);
                    }
                  }}
                >
                  <td className="font-bold">{row.name}</td>
                  <td>{row.serviceName}</td>
                  <td>{formatDate(row.date)}</td>
                  <td className="profit-value">{formatProfit(row.profit)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table pagination & footer */}
      {totalReferrals > 0 && (
        <div className="table-footer-pagination">
          <div className="pagination-summary">
            Showing {startIndex}–{endIndex} of {totalReferrals} entries
          </div>
          <div className="pagination-buttons">
            <button
              type="button"
              className="btn-pagination"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`btn-pagination btn-page-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

            <button
              type="button"
              className="btn-pagination"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllReferralsTable;
