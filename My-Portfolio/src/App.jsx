import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const titleTexts = ["Adil Inamdar", "Web Developer", "Portfolio"];
    let counter = 0;

    const titleInterval = setInterval(() => {
      document.title = titleTexts[counter % titleTexts.length];
      counter++;
    }, 2000);

    const faviconLinks = ["/images/favicon1.png", "/images/favicon2.png"];
    let faviconIndex = 0;

    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    const faviconInterval = setInterval(() => {
      favicon.href = faviconLinks[faviconIndex % faviconLinks.length];
      faviconIndex++;
    }, 1000);

    return () => {
      clearInterval(titleInterval);
      clearInterval(faviconInterval);
    };
  }, []);

  return (
    <div className="app-shell bg-black text-white">
      <Navbar />
      <Home />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;