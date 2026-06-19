const OverviewSection = ({ metrics }) => {
  // Helper to map metric label to SVG icons
  const renderMetricIcon = (label) => {
    const text = label.toLowerCase();
    if (text.includes('balance')) {
      return (
        <span className="metric-icon-box bg-purple-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5c60f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </span>
      );
    }
    if (text.includes('percentage')) {
      return (
        <span className="metric-icon-box bg-green-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5.5" cy="5.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
            <line x1="19" y1="5" x2="5" y2="19"></line>
          </svg>
        </span>
      );
    }
    if (text.includes('referral')) {
      return (
        <span className="metric-icon-box bg-indigo-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </span>
      );
    }
    if (text.includes('amount') || text.includes('earning')) {
      return (
        <span className="metric-icon-box bg-yellow-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </span>
      );
    }
    if (text.includes('commission')) {
      return (
        <span className="metric-icon-box bg-pink-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </span>
      );
    }
    if (text.includes('transfer')) {
      return (
        <span className="metric-icon-box bg-blue-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </span>
      );
    }
    return (
      <span className="metric-icon-box bg-gray-light">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </span>
    );
  };

  return (
    <section className="dashboard-section" role="region" aria-label="Overview metrics">
      <h2 className="section-title">Overview</h2>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.id || metric.label} className="metric-card">
            <div className="metric-card-top">
              {renderMetricIcon(metric.label)}
            </div>
            <div className="metric-card-bottom">
              <p className="metric-value">{metric.value}</p>
              <p className="metric-label">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverviewSection;
