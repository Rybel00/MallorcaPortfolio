import { useEffect } from "react";
import AOS from "aos";
import profileImg from "./assets/profile.jpg";
import hulabImg from "./assets/hulab.jpg";
import bljImg from "./assets/blj.jpg";
import radarImg from "./assets/radar.jpg";

/*
  AOS note: AOS animates the `transform` of whatever element has data-aos.
  So anywhere an element ALSO has its own transform/hover effect (rotated
  side labels, scaling profile photo, project cards), the data-aos attribute
  lives on a wrapper element and the hover/rotation lives on the child.
*/

function SkillBar({ name, percent }) {
  return (
    <div
      className="skill-card"
      data-aos="flip-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      <div className="skill-top">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function ProjectCard({ image, title, description }) {
  return (
    <div
      className="project-item"
      data-aos="flip-right"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      <div className="project-card">
        <img src={image} alt={title} className="project-image" />
        <div className="project-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true, // animate each element only the first time it scrolls in
      // Respect visitors who turned off animations in their OS settings
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    // Re-measure positions once images/fonts finish loading
    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-logo">My Portfolio</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="section hero-section">
        <div className="hero-left">
          <p className="small-title">My Portfolio</p>
          <h1 className="hero-name">Bryle Adam Mallorca</h1>
          <h3>Student Web Developer</h3>

          <div className="line"></div>

          <h2
            data-aos="fade-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            What&apos;s Up!
          </h2>
          <p
            className="hero-text"
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            I&apos;m Bryle Adam Mallorca, a student developer with a passion for
            coding and creating innovative solutions. I am currently learning
            and exploring different programming languages and technologies to
            improve my skills and grow in the field of software development.
          </p>
          <p
            className="hero-text"
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            Feel free to explore my portfolio to see some of the projects
            I&apos;ve worked on and the skills I&apos;ve developed. I&apos;m
            always eager to learn more and continue improving as a developer.
          </p>
        </div>

        {/* AOS on the wrapper, hover-zoom on .profile-circle */}
        <div
          className="hero-right"
          data-aos="fade-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <div className="profile-circle">
            <img src={profileImg} alt="Bryle Adam Mallorca" />
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        {/* AOS on the wrapper, rotation + hover colour on .side-label */}
        <div
          className="side-label-wrap"
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          <div className="side-label">About Me</div>
        </div>

        {/* AOS on the wrapper, saturation hover on the <p> */}
        <div
          className="about-content"
          data-aos="fade-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
        >
          <p>
            I am a passionate developer with experience in creating web
            applications. I enjoy solving complex problems and learning new
            technologies. My goal is to continue growing as a developer while
            building useful and creative digital solutions.
          </p>
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <h2
          className="section-title"
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          My Skills
        </h2>

        <div className="skills-list">
          <SkillBar name="ReactJS" percent={72} />
          <SkillBar name="JavaScript" percent={68} />
          <SkillBar name="HTML" percent={80} />
          <SkillBar name="CSS" percent={78} />
          <SkillBar name="Node.js" percent={55} />
          <SkillBar name="Python" percent={48} />
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <h2
          className="section-title"
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          My Projects
        </h2>

        <div className="projects-grid">
          <ProjectCard
            image={hulabImg}
            title="Hulab"
            description="A website that manages equipment and logs student activities whenever they borrow items."
          />
          <ProjectCard
            image={bljImg}
            title="BLJ - Study Hub & Cafe"
            description="A management system for sales, inventory, and daily operations."
          />
          <ProjectCard
            image={radarImg}
            title="Ultrasonic Radar Detection System"
            description="An Arduino-based project focused on distance detection and object monitoring."
          />
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div
          className="side-label-wrap"
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <div className="side-label">GET IN TOUCH</div>
        </div>

        <div className="contact-box">
          <h2
            data-aos="fade-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            Contact Me
          </h2>
          <a
            href="https://github.com/dashboard"
            data-aos="zoom-in"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <p>GitHub: Rybel00/MallorcaB</p>
          </a>
          <a
            href="mailto:bryleadammallorca@gmail.com"
            data-aos="zoom-in"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <p>Email: bryleadammallorca@gmail.com</p>
          </a>
          <a
            href="https://www.facebook.com/bryle.adam.mallorca"
            data-aos="zoom-in"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <p>Facebook: Bryle Adam Mallorca</p>
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Bryle Adam Mallorca. All rights reserved.</p>
      </footer>
    </div>
  );
}
