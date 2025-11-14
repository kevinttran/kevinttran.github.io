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
        <p className="about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </p>
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
