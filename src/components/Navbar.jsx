import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="brand-logo" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <nav className="navbar-nav" aria-label="Primary">
          <Link to="/" className="nav-link home-link">
            Home
          </Link>
          <button type="button" className="btn-try">
            Try for free
          </button>
          <button
            type="button"
            className="btn-logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
