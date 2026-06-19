import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../Navbar';
import Footer from '../Footer';

const ReferralDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    const fetchReferralDetail = async () => {
      setLoading(true);
      setErrorState(false);
      const token = Cookies.get('jwt_token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Not found');
        }

        const responseJson = await response.json();
        const resData = responseJson.data || responseJson;

        let match = null;
        if (resData) {
          // Robust parsing logic
          if (resData.id && String(resData.id) === String(id)) {
            match = resData;
          } else if (resData.referrals && Array.isArray(resData.referrals)) {
            match = resData.referrals.find((item) => String(item.id) === String(id));
          } else if (Array.isArray(resData)) {
            match = resData.find((item) => String(item.id) === String(id));
          }
        }

        if (match) {
          setReferral(match);
        } else {
          setErrorState(true);
        }
      } catch (err) {
        console.error(err);
        setErrorState(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralDetail();
  }, [id, navigate]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.replace(/-/g, '/');
  };

  const formatProfit = (profit) => {
    if (profit === undefined || profit === null) return '';
    const num = Number(profit);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-main-content detail-page-content">
        <div className="back-link-wrapper">
          <Link to="/" className="back-to-dashboard-link">
            &larr; Back to dashboard
          </Link>
        </div>

        {loading && (
          <div className="detail-loading-container">
            <div className="loading-spinner"></div>
            <p>Loading referral details...</p>
          </div>
        )}

        {!loading && errorState && (
          <div className="detail-error-container">
            <h1 className="error-heading">Referral not found</h1>
            <p className="error-message">The requested referral could not be found or does not exist.</p>
            <Link to="/" className="btn-secondary">
              Back to dashboard
            </Link>
          </div>
        )}

        {!loading && !errorState && referral && (
          <div className="detail-card-wrapper">
            <header className="detail-header">
              <h1 className="detail-page-title">Referral Details</h1>
              <p className="detail-subtitle">Full information for this referral partner.</p>
            </header>

            <div className="detail-info-card">
              <div className="detail-card-header">
                <h2 className="detail-partner-name">{referral.name}</h2>
                {referral.serviceName && (
                  <span className="service-badge">{referral.serviceName}</span>
                )}
              </div>

              <dl className="detail-definition-list">
                <div className="detail-dl-row">
                  <dt>REFERRAL ID</dt>
                  <dd className="font-bold">{referral.id}</dd>
                </div>

                <div className="detail-dl-row">
                  <dt>NAME</dt>
                  <dd>{referral.name}</dd>
                </div>

                <div className="detail-dl-row">
                  <dt>SERVICE NAME</dt>
                  <dd>{referral.serviceName}</dd>
                </div>

                <div className="detail-dl-row">
                  <dt>DATE</dt>
                  <dd>{formatDate(referral.date)}</dd>
                </div>

                <div className="detail-dl-row">
                  <dt>PROFIT</dt>
                  <dd className="profit-value font-bold">{formatProfit(referral.profit)}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReferralDetail;
