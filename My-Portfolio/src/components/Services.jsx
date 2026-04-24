function Services() {
  const services = [
    {
      icon: "fa-solid fa-code",
      title: "Web Development",
      text: "I design and develop responsive websites using HTML, CSS, JavaScript and Bootstrap.",
      link: "https://github.com/Adil-Inamdar-FSD/Adil-Inamdar-FSD.git",
      btn: "View Projects",
      image: "/images/service-dev.jpg", // ✅ added
    },
    {
      icon: "fa-solid fa-video",
      title: "Video Editing",
      text: "I edit YouTube videos, reels and shorts with transitions, subtitles and music.",
      link: "https://youtube.com/@ai.edits15",
      btn: "Watch My Work",
      image: "/images/service-edit.jpg", // ✅ added
    },
    {
      icon: "fa-brands fa-linkedin",
      title: "Connect With Me",
      text: "Visit my LinkedIn profile to see my updates and professional details.",
      link: "https://www.linkedin.com/in/adil-inamdar/",
      btn: "Visit LinkedIn",
      image: "/images/about-workspace.jpg", // reuse image
    },
  ];

  return (
    <section id="services" className="section-space reveal section-dark-soft">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-tag">SERVICES</p>
          <h2 className="section-title">What I Offer</h2>
        </div>

        <div className="row g-4 mt-3">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="service-card h-100">

                {/* 🔥 IMAGE */}
                <div className="service-img">
                  <img src={service.image} alt={service.title} />
                </div>

                {/* ICON */}
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>

                <h3>{service.title}</h3>
                <p>{service.text}</p>

                <a href={service.link} target="_blank" rel="noreferrer">
                  {service.btn}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;