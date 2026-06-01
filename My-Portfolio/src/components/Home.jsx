function Home() {
  return (
    <section id="home" className="hero-section reveal">
      <div className="container">
        <div className="hero-content text-center">

          {/* 🔥 PROFILE IMAGE */}
          <div className="hero-img">
            <img src="/images/user.png" alt="Adil" />
          </div>

          <p className="hero-mini-title">WELCOME TO MY PORTFOLIO</p>

          <h1 className="hero-title">
            Hi, I'm <span>Adil</span>
          </h1>

          <h3 className="hero-subtitle">Mern-Stack Developer & Video Editor</h3>

          <p className="hero-text">
            I create modern responsive websites and engaging videos.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-danger hero-btn">
              Hire Me
            </a>
            <a href="#portfolio" className="btn btn-outline-light hero-btn">
              View Work
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;