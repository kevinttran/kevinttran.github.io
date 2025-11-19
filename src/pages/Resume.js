import React from 'react';
import { FaFileDownload, FaBriefcase } from 'react-icons/fa';
import './Resume.css';

function Resume() {
  const experiences = [
    {
      company: 'Salesforce',
      title: 'Software Engineer MTS',
      period: 'Recent',
      achievements: [
        'Stub: Achievement 1 for Salesforce',
        'Stub: Achievement 2 for Salesforce',
        'Stub: Achievement 3 for Salesforce'
      ]
    },
    {
      company: 'Oracle',
      title: 'Senior Cloud Engineer SMTS',
      period: 'Previous',
      achievements: [
        'Stub: Achievement 1 for Oracle',
        'Stub: Achievement 2 for Oracle',
        'Stub: Achievement 3 for Oracle'
      ]
    },
    {
      company: 'USAA',
      title: 'Software Engineer',
      period: 'Previous',
      achievements: [
        'Stub: Achievement 1 for USAA',
        'Stub: Achievement 2 for USAA',
        'Stub: Achievement 3 for USAA'
      ]
    },
    {
      company: 'United States Navy',
      title: 'Petty Officer Second Class',
      period: 'Previous',
      achievements: [
        'Stub: Achievement 1 for US Navy',
        'Stub: Achievement 2 for US Navy',
        'Stub: Achievement 3 for US Navy'
      ]
    },
    {
      company: 'University of California, Irvine SCES',
      title: 'Programmer Analyst',
      period: 'Previous',
      achievements: [
        'Stub: Achievement 1 for UCI',
        'Stub: Achievement 2 for UCI',
        'Stub: Achievement 3 for UCI'
      ]
    }
  ];

  return (
    <div className="resume-page">
      <header className="resume-header">
        <h1>Resume</h1>
        <a 
          href="#" 
          className="download-btn"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaFileDownload className="btn-icon" />
          Download Resume (PDF)
        </a>
      </header>

      <section className="experience-section">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-icon">
                <FaBriefcase />
              </div>
              <div className="timeline-content">
                <h3 className="company-name">{exp.company}</h3>
                <h4 className="role-title">{exp.title}</h4>
                <span className="period">{exp.period}</span>
                <ul className="achievements-list">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Resume;
