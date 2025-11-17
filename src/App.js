import './App.css';
import { 
  FaHtml5, FaCss3Alt, FaJsSquare, FaJava, FaPython, FaCode,
  FaNodeJs, FaReact, FaAngular, FaDocker, FaGithub,
  FaGitlab, FaCubes, FaLinkedin, FaEnvelope
} from 'react-icons/fa';

function App() {
  const languages = [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
    { name: 'Java', icon: FaJava, color: '#ED8B00' },
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'C#', icon: FaCode, color: '#239120' }
  ];

  // Organized by category: JavaScript/Node.js, Java, Container/Orchestration, Cloud/Infrastructure, Data/Streaming, DevOps/Tools
  const frameworks = [
    // JavaScript/Node.js frameworks
    { name: 'Express.js', icon: FaCode, color: '#000000', category: 'JavaScript/Node.js' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'JavaScript/Node.js' },
    { name: 'React', icon: FaReact, color: '#61DAFB', category: 'JavaScript/Node.js' },
    { name: 'Angular', icon: FaAngular, color: '#DD0031', category: 'JavaScript/Node.js' },
    { name: 'Angular.js', icon: FaAngular, color: '#DD0031', category: 'JavaScript/Node.js' },
    // Java frameworks
    { name: 'Spark', icon: null, image: 'Apache_Spark_logo.svg.png', color: '#E25A1C', category: 'Java' },
    { name: 'Hadoop', icon: null, image: 'Hadoop_logo.svg.png', color: '#66CCFF', category: 'Java' },
    { name: 'JBoss', icon: null, image: 'JBoss_logo.svg.png', color: '#FF0000', category: 'Java' },
    // Container/Orchestration
    { name: 'Kubernetes', icon: FaCubes, color: '#326CE5', category: 'Container/Orchestration' },
    { name: 'Docker', icon: FaDocker, color: '#0db7ed', category: 'Container/Orchestration' },
    { name: 'Openshift', icon: null, image: 'open_shift_logo.png', color: '#EE0000', category: 'Container/Orchestration' },
    // Cloud/Infrastructure
    { name: 'Oracle OCI', icon: null, image: 'Oracle-Cloud-Logo.png', color: '#F80000', category: 'Cloud/Infrastructure' },
    { name: 'Apache Web Server', icon: null, image: 'Apache_HTTP_server_logo_(2019-present).svg.png', color: '#D22128', category: 'Cloud/Infrastructure' },
    // Data/Streaming
    { name: 'Kafka', icon: null, image: 'Apache_Kafka_logo.svg.png', color: '#231F20', category: 'Data/Streaming' },
    { name: 'Splunk', icon: null, image: 'Splunk_logo.png', color: '#000000', category: 'Data/Streaming' },
    // DevOps/Tools
    { name: 'Control M', icon: null, image: 'Control-m_logo.svg.png', color: '#0078D4', category: 'DevOps/Tools' },
    { name: 'Postman', icon: null, image: 'Postman_logo.svg.png', color: '#FF6C37', category: 'DevOps/Tools' },
    { name: 'Github', icon: FaGithub, color: '#181717', category: 'DevOps/Tools' },
    { name: 'Gitlab', icon: FaGitlab, color: '#FC6D26', category: 'DevOps/Tools' },
    { name: 'Oracle OJet', icon: null, image: 'Oracle_OJet_logo.png', color: '#F80000', category: 'DevOps/Tools' },
    // Databases / Search
    { name: 'Microsoft SQL Server', icon: null, image: 'Microsoft_SQL_Server_Logo.svg.png', color: '#CC2927', category: 'Databases' },
    { name: 'Couchbase', icon: null, image: 'couchbase.svg', color: '#DE3C3C', category: 'Databases' },
    { name: 'Elasticsearch', icon: null, image: 'Elastic_search.svg', color: '#005571', category: 'Data/Streaming' }
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
        <div className="socials-row">
          {[
            { name: 'GitHub', url: 'https://github.com/kevinttran', icon: FaGithub, color: '#181717' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kevintuli', icon: FaLinkedin, color: '#0A66C2' },
            { name: 'Email', url: 'mailto:kevinttran@gmail.com', icon: FaEnvelope, color: '#D14836' }
          ].map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                className="social-link"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
              >
                <Icon className="social-icon" style={{ color: s.color }} />
              </a>
            );
          })}
        </div>
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

      <section className="frameworks-section">
        <h2 className="section-title">Development Frameworks and Libraries</h2>
        <div className="frameworks-grid">
          {frameworks.map((framework) => {
            const IconComponent = framework.icon;
            return (
              <div key={framework.name} className="framework-item">
                {framework.image ? (
                  <img 
                    src={process.env.PUBLIC_URL + '/' + framework.image} 
                    alt={framework.name}
                    className="framework-icon framework-image"
                  />
                ) : (
                  <IconComponent className="framework-icon" style={{ color: framework.color }} />
                )}
                <span className="framework-name">{framework.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
