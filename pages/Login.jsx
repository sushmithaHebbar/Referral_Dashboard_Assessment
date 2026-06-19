import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to '/' if user is already authenticated
  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseJson = await response.json();

      if (response.ok && responseJson.data?.token) {
        const token = responseJson.data.token;
        Cookies.set('jwt_token', token, { expires: 7 }); // expires in 7 days
        navigate('/', { replace: true });
      } else {
        // The error text "Invalid email or password" is displayed on the login page.
        const msg = responseJson.message || 'Invalid email or password';
        setErrorMsg(msg);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h1 className="login-brand-title">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email-input" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email-input"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-input" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password-input"
              className="form-input"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <div className="error-alert" role="alert">
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn-signin">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
