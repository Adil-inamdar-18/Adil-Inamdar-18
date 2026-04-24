function Contact() {
  return (
    <section id="contact" className="section-space reveal section-dark-soft">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-tag">CONTACT</p>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="row align-items-center mt-4">

          {/* 🔥 LEFT IMAGE */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="contact-image">
              <img src="/images/contact-bg.jpg" alt="contact" />
            </div>
          </div>

          {/* FORM */}
          <div className="col-lg-7">
            <div className="contact-card">
              <form
                action="https://formspree.io/f/mlgwjgyv"
                method="POST"
                className="contact-form"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="form-control"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="form-control"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="form-control"
                />

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="form-control"
                ></textarea>

                <button type="submit" className="btn btn-danger w-100 py-3">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;