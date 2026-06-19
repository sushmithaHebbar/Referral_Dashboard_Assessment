const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="footer-brand">Go Business</span>
        <nav className="footer-nav" aria-label="Footer">
          <a href="#about" className="footer-link">About</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
        </nav>
        <p className="footer-copyright">
          &copy; 2024 Go Business, Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
