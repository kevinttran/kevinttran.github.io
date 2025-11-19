import React from 'react';
import { FaFileDownload, FaBriefcase } from 'react-icons/fa';
import './Resume.css';

function Resume() {
  const experiences = [
    {
      company: 'Salesforce',
      title: 'Software Engineer MTS',
      period: 'October 2022 - May 2024',
      achievements: [
        'Resolved critical bugs, integrated comprehensive metrics, and significantly improved the efficiency of Marketing Cloud Contacts applications.',
        'Refined product backlogs and collaborated with stakeholders to prioritize deliverables for each release cycle.',
        'Architected and implemented large-scale telemetry systems for client billing on Microsoft SQL Server, handling datasets exceeding billions of records.'
      ]
    },
    {
      company: 'Oracle',
      title: 'Senior Cloud Engineer SMTS',
      period: 'July 2020 - September 2022',
      achievements: [
        'Led the end-to-end development of new internal applications, driving projects from inception to General Availability (GA).',
        'Interviewed, onboarded, and mentored engineers for a cross-regional team, fostering a culture of technical excellence.',
        'Developed robust CI/CD pipelines to ensure scalable, consistent, and automated builds and deployments.'
      ]
    },
    {
      company: 'USAA',
      title: 'Software Engineer',
      period: 'January 2017 - July 2020',
      achievements: [
        'Designed and implemented full-stack applications serving the enterprise data and operations communities.',
        'Developed innovative Proof of Concepts (PoCs) during Hackathons to drive enterprise solution strategies.',
        'Diagnosed and resolved critical system outages for core applications under high-pressure emergency conditions.',
        'Led the migration of critical legacy applications to modern, cloud-native frameworks, accelerating delivery velocity.',
        'Optimized application performance across both frontend interfaces and API layers, enhancing user experience and system throughput.'
      ]
    },
    {
      company: 'United States Navy',
      title: 'Petty Officer Second Class',
      period: 'March 2014 - October 2016',
      achievements: [
        'Led a team in the comprehensive overhaul of the military command’s inventory of technical equipment and weapons systems.',
        'Resolved complex internal communication and electronic issues by analyzing technical manuals and schematics, performing troubleshooting, and executing repairs.'
      ]
    },
    {
      company: 'University of California, Irvine SCES',
      title: 'Programmer Analyst',
      period: 'September 2009 - February 2014',
      achievements: [
        'Provided technical support for enterprise application deployments, end users, and networking infrastructure.',
        'Spearheaded the overhaul of the legacy Point of Sale system to a modern, secure payment processing solution.'
      ]
    }
  ];

  return (
    <div className="resume-page">
      <header className="resume-header">
        <h1>Resume</h1>
        <a 
          href={process.env.PUBLIC_URL + '/SD_Resume.pdf'} 
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
