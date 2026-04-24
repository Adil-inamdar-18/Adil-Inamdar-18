function Portfolio() {
  const works = [
    {
      image: "/images/portfolio-1.jpg",
      alt: "Web Project",
      title: "Web Development",
      text: "Responsive websites built using HTML, CSS, JavaScript & Bootstrap.",
      link: "https://github.com/Adil-Inamdar-FSD/Adil-Inamdar-FSD.git",
      icon: "fa-solid fa-up-right-from-square",
    },
    {
      image: "/images/portfolio-2.jpg",
      alt: "Video Editing",
      title: "Video Editing",
      text: "YouTube videos, reels and shorts with transitions and subtitles.",
      link: "https://youtube.com/@ai.edits15",
      icon: "fa-brands fa-youtube",
    },
    {
      image: "/images/portfolio-3.jpg",
      alt: "LinkedIn",
      title: "My LinkedIn",
      text: "Check my professional profile and updates.",
      link: "https://www.linkedin.com/in/adil-inamdar/",
      icon: "fa-brands fa-linkedin-in",
    },
  ];

  return (
    <section id="portfolio" className="section-space reveal">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-tag">PORTFOLIO</p>
          <h2 className="section-title">My Work</h2>
        </div>

        <div className="row g-4 mt-4">
          {works.map((work, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="portfolio-card">

                {/* IMAGE */}
                <img src={work.image} alt={work.alt} />

                {/* OVERLAY */}
                <div className="portfolio-layer">
                  <h3>{work.title}</h3>
                  <p>{work.text}</p>

                  <a href={work.link} target="_blank" rel="noreferrer">
                    <i className={work.icon}></i>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;