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
              <h3 className="about-heading">
                Mern-Stack Developer & Video Editor
              </h3>

              <p className="about-text">
                Hello! My name is Adil, and I am a Mern-Stack Developer and Video
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
                  className={
                    activeTab === "skills" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setActiveTab("skills")}
                >
                  My Skills
                </button>

                <button
                  className={
                    activeTab === "education" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </button>

                <button
                  className={
                    activeTab === "projects" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
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
                      <li>React.js</li>
                      <li>Bootstrap</li>
                      <li>Tailwind CSS</li>
                      <li>Responsive Design</li>
                      <li>Git & GitHub</li>
                      <li>Node.js</li>
                      <li>Express.js</li>
                      <li>MongoDB</li>
                      <li>Mongoose</li>
                      <li>Firebase</li>
                      <li>VsCode</li>
                      <li>JWT Authentication</li>
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

                {activeTab === "projects" && (
                  <div className="tab-content-box">
                    <ul className="custom-list">
                      <li>
                        <span>🚀 AI Website Builder</span>
                        <br />
                        AI-powered website generator that creates responsive
                        websites from user prompts with dynamic content and
                        real-time preview functionality.
                        <br />
                        <strong>Tech Stack:</strong> React, JavaScript,
                        Bootstrap, AI Integration
                        <br />
                        <a
                          href="https://genweb-ai-client.onrender.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      </li>

                      <br />

                      <li>
                        <span>👨‍💼 Employee Management System</span>
                        <br />
                        Full-stack MERN application with role-based
                        authentication, employee management, attendance
                        tracking, leave requests, salary records, and admin
                        dashboard.
                        <br />
                        <strong>Tech Stack:</strong> React, Node.js, Express.js,
                        MongoDB, JWT
                        <br />
                        <a
                          href="https://ems-frontend-8tz1.onrender.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                        <div className="mt-2">
                          <small>
                            <strong>Admin Login</strong>
                            <br />
                            Email: admin@example.com
                            <br />
                            Password: admin123
                            <br />
                            <br />
                            <strong>User Login</strong>
                            <br />
                            Email: brad@example.com
                            <br />
                            Password: brad1234
                          </small>
                        </div>
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
