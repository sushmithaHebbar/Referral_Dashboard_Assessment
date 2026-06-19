const ShareReferralSection = ({
  referralShare,
  copiedLink,
  copiedCode,
  handleCopyLink,
  handleCopyCode,
}) => {
  return (
    <section className="dashboard-section" aria-label="Share referral">
      <div className="share-panel">
        <h2 className="share-panel-title">Refer friends and earn more</h2>
        <div className="share-grid">
          <div className="share-field-group">
            <label className="share-field-label">YOUR REFERRAL LINK</label>
            <div className="share-input-wrapper">
              <input
                type="text"
                readOnly
                value={referralShare.link || ''}
                className="share-input"
                onClick={(e) => e.target.select()}
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`btn-copy ${copiedLink ? 'copied' : ''}`}
              >
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="share-field-group">
            <label className="share-field-label">YOUR REFERRAL CODE</label>
            <div className="share-input-wrapper">
              <input
                type="text"
                readOnly
                value={referralShare.code || ''}
                className="share-input font-mono"
                onClick={(e) => e.target.select()}
              />
              <button
                type="button"
                onClick={handleCopyCode}
                className={`btn-copy ${copiedCode ? 'copied' : ''}`}
              >
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareReferralSection;
