const ServiceSummarySection = ({ serviceSummary }) => {
  if (!serviceSummary) return null;

  return (
    <section className="dashboard-section" aria-label="Service summary">
      <h2 className="section-title">Service summary</h2>
      <div className="service-summary-card">
        <div className="summary-item">
          <span className="summary-label">SERVICE</span>
          <span className="summary-value text-primary-highlight">
            {serviceSummary.service || 'N/A'}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">YOUR REFERRALS</span>
          <span className="summary-value">
            {serviceSummary.yourReferrals || '0 + 0'}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">ACTIVE REFERRALS</span>
          <span className="summary-value">
            {serviceSummary.activeReferrals || '0 + 0'}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">TOTAL REF. EARNINGS</span>
          <span className="summary-value">
            {serviceSummary.totalRefEarnings || '$0.00'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummarySection;
