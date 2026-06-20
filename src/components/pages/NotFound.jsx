import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page-wrapper">
      <div className="not-found-container">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">404 - Page Not Found</p>
        <Link to="/" className="back-to-dashboard-link" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
