function Footer() {
  return (
    <footer className="footer-section">
      <div className="container text-center">
        <div className="footer-line"></div>

        <h2 className="footer-logo">Adil Inamdar</h2>
        <p className="footer-tagline">
          Front-End Developer • Video Editor • Content Creator
        </p>

        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/adil-inamdar/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a
            href="https://github.com/Adil-Inamdar-FSD/Adil-Inamdar-FSD.git"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>

          <a href="https://youtube.com/@ai.edits15" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-youtube"></i>
          </a>

          <a href="mailto:adilinamdar617@gmail.com">
            <i className="fa-solid fa-envelope"></i>
          </a>

          <a href="https://t.me/lootdealsindia91" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </div>

        <p className="copyright">
          © 2026 <span>Adil Inamdar</span> — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;