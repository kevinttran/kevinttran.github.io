import './App.css';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaJava, FaPython, FaCode } from 'react-icons/fa';

function App() {
  const languages = [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
    { name: 'Java', icon: FaJava, color: '#ED8B00' },
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'C#', icon: FaCode, color: '#239120' }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={process.env.PUBLIC_URL + '/profile-photo.jpg'}
          alt="Kevin Tuan Tran"
          className="profile-photo"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h1 className="App-title">Kevin Tuan Tran</h1>
        <h2 className="App-subtitle">Full Stack Engineer</h2>
      </header>

      <section className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-text">
          <p>
            I began my career in IT while attending the University of California, Irvine, working on the administrative tech team at the Student Center. Supporting enterprise applications, end users, and networking systems gave me an early foundation in problem-solving and technical operations. After graduating from UC Irvine, I worked in the industry for a year before completing my national service in the United States Navy, where I led teams responsible for maintaining and repairing critical communication and electronic systems. That experience strengthened my leadership, discipline, and ability to work under pressure — skills that have guided me ever since.
          </p>
          <p>
            Returning to civilian life, I transitioned fully into software engineering. I spent several years at USAA, building and optimizing enterprise applications, modernizing legacy systems, and helping resolve major outages for core platforms. From there, I joined Oracle as a Senior Cloud Engineer, where I led development of internal applications, built scalable CI/CD pipelines, and mentored engineers across regions.
          </p>
          <p>
            Most recently, I worked at Salesforce as a Software Engineer MTS, improving key components of Marketing Cloud Contacts. I focused on resolving issues, refining backlogs, integrating metrics, and building large-scale telemetry systems that supported databases with billions of records.
          </p>
          <p>
            Across every role, I've remained committed to building reliable, scalable software and contributing to teams that value innovation, clarity, and impact.
          </p>
        </div>
      </section>

      <section className="languages-section">
        <h2 className="section-title">Programming Languages</h2>
        <div className="languages-grid">
          {languages.map((lang) => {
            const IconComponent = lang.icon;
            return (
              <div key={lang.name} className="language-item">
                <IconComponent className="language-icon" style={{ color: lang.color }} />
                <span className="language-name">{lang.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
