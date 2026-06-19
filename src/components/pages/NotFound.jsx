import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page-wrapper">
      <div className="not-found-container">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">Page not found</p>
        <Link to="/" className="back-to-dashboard-link">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
