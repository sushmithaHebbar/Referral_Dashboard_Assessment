import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import DashboardHeader from '../src/components/dashboard/DashboardHeader';
import OverviewSection from '../src/components/dashboard/OverviewSection';
import ServiceSummarySection from '../src/components/dashboard/ServiceSummarySection';
import ShareReferralSection from '../src/components/dashboard/ShareReferralSection';
import AllReferralsTable from '../src/components/dashboard/AllReferralsTable';

const Dashboard = () => {
  const navigate = useNavigate();

  // State for data
  const [metrics, setMetrics] = useState([]);
  const [serviceSummary, setServiceSummary] = useState(null);
  const [referralShare, setReferralShare] = useState({ link: '', code: '' });
  const [referrals, setReferrals] = useState([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' is default

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Copy feedback state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Fetch referrals data from API
  const fetchData = useCallback(async (searchVal, sortVal) => {
    setLoading(true);
    setErrorMsg('');
    const token = Cookies.get('jwt_token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Build query string
      const params = new URLSearchParams();
      if (searchVal.trim()) {
        params.append('search', searchVal.trim());
      }
      params.append('sort', sortVal);

      const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errText = `Error ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson.message) {
            errText = `${errJson.message} (${response.status})`;
          }
        } catch {
          // Ignore parse errors, fall back to default errText
        }
        throw new Error(errText);
      }

      const responseJson = await response.json();

      // Support data sitting nested in data or on the root object
      const resData = responseJson.data || responseJson;

      if (resData) {
        setMetrics(resData.metrics || []);
        setServiceSummary(resData.serviceSummary || null);
        setReferralShare(resData.referral || { link: '', code: '' });
        setReferrals(resData.referrals || []);
      }
      setCurrentPage(1); // Reset to page 1 on new filter/sort
    } catch (err) {
      setErrorMsg(err.message || 'Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Debounced search trigger
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData(searchQuery, sortOrder);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, sortOrder, fetchData]);

  // Handle Copy Actions
  const handleCopyLink = () => {
    if (referralShare.link) {
      navigator.clipboard.writeText(referralShare.link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
    }
  };

  const handleCopyCode = () => {
    if (referralShare.code) {
      navigator.clipboard.writeText(referralShare.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    }
  };

  // Helper formatting methods
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.replace(/-/g, '/'); // ISO YYYY-MM-DD to YYYY/MM/DD
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

  // Client Side Pagination slicing
  const itemsPerPage = 10;
  const totalReferrals = referrals.length;
  const totalPages = Math.ceil(totalReferrals / itemsPerPage) || 1;

  const currentReferrals = referrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startIndex = totalReferrals === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalReferrals);

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-main-content">
        <DashboardHeader />

        {/* Loading state indicator */}
        {loading && (
          <div className="dashboard-loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading your referral insights...</p>
          </div>
        )}

        {/* Error region */}
        {errorMsg && (
          <div className="dashboard-error-alert" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="error-alert-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {!loading && !errorMsg && (
          <>
            {/* Overview Region */}
            <OverviewSection metrics={metrics} />

            {/* Service Summary Section */}
            <ServiceSummarySection serviceSummary={serviceSummary} />

            {/* Share Referral Section */}
            <ShareReferralSection
              referralShare={referralShare}
              copiedLink={copiedLink}
              copiedCode={copiedCode}
              handleCopyLink={handleCopyLink}
              handleCopyCode={handleCopyCode}
            />

            {/* All Referrals Section */}
            <AllReferralsTable
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              currentReferrals={currentReferrals}
              totalReferrals={totalReferrals}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              formatDate={formatDate}
              formatProfit={formatProfit}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
