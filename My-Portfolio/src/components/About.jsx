import { useState } from "react";

function About() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section id="about" className="section-space reveal">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-tag">ABOUT ME</p>
          <h2 className="section-title">Know More About Me</h2>
        </div>

        <div className="row align-items-center g-5 mt-2">
          <div className="col-lg-5">
            <div className="about-image-card text-center">
              <img
                src="./images/about-workspace.jpg"
                alt="Adil"
                className="img-fluid about-image"
              />
              <a
                href="/images/FRONTEND_DEVLOPER.pdf"
                className="btn btn-danger mt-4 px-4 py-2"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="about-content-card">
              <h3 className="about-heading">Front-End Developer & Video Editor</h3>
              <p className="about-text">
                Hello! My name is Adil, and I am a Front-End Developer and Video
                Editor from India. I enjoy building websites as well as creating
                visually engaging videos.
              </p>
              <p className="about-text">
                My goal is to grow as a full-stack developer and professional
                content creator while building projects that look modern, clean,
                responsive and user-friendly.
              </p>

              <div className="about-tabs">
                <button
                  className={activeTab === "skills" ? "tab-btn active" : "tab-btn"}
                  onClick={() => setActiveTab("skills")}
                >
                  My Skills
                </button>
                <button
                  className={activeTab === "experience" ? "tab-btn active" : "tab-btn"}
                  onClick={() => setActiveTab("experience")}
                >
                  Experience
                </button>
                <button
                  className={activeTab === "education" ? "tab-btn active" : "tab-btn"}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </button>
                <button
                  className={
                    activeTab === "video-editing" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setActiveTab("video-editing")}
                >
                  Editing Skills
                </button>
              </div>

              <div className="tab-panel">
                {activeTab === "skills" && (
                  <div className="tab-content-box">
                    <h4>
                      <span>Web</span> Development
                    </h4>
                    <ul className="custom-list">
                      <li>HTML5</li>
                      <li>CSS3</li>
                      <li>JavaScript</li>
                      <li>DOM Manipulation</li>
                      <li>Bootstrap</li>
                      <li>Responsive Design</li>
                      <li>Git & GitHub</li>
                    </ul>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="tab-content-box">
                    <ul className="custom-list">
                      <li>
                        <span>2018</span>
                        <br />
                        Essential Store Manager & Cashier
                      </li>
                      <li>
                        <span>2024</span>
                        <br />
                        Video Editing for YouTube & Instagram using CapCut and
                        DaVinci Resolve
                      </li>
                      <li>
                        <span>2024</span>
                        <br />
                        Canva, PicsArt, Pixlab, Photoshop for thumbnails and
                        photo editing
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "education" && (
                  <div className="tab-content-box">
                    <ul className="custom-list">
                      <li>
                        <span>2025</span>
                        <br />
                        MERN Stack Training at Codempower
                      </li>
                      <li>
                        <span>2025</span>
                        <br />
                        BCA From Sandip University Nashik
                      </li>
                      <li>
                        <span>2027</span>
                        <br />
                        MCA From Sandip University Nashik
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "video-editing" && (
                  <div className="tab-content-box">
                    <h4>
                      <span>Video</span> Editing
                    </h4>
                    <ul className="custom-list">
                      <li>CapCut</li>
                      <li>Basic After Effects</li>
                      <li>Color Correction & Color Grading</li>
                      <li>Transitions & Effects</li>
                      <li>Subtitles & Captions</li>
                      <li>Reels & Shorts Editing</li>
                      <li>YouTube Video Editing</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;