import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const corporateProjects = [
    {
      name: 'Hoodoo',
      description: 'A comprehensive digital experience platform that integrates content management with customer data to deliver personalized user journeys. Leveraged modern web technologies to improve site performance and user engagement metrics significantly.',
      tech: ['React', 'Node.js', 'AWS']
    },
    {
      name: 'Accelerator',
      description: 'An internal developer productivity tool designed to streamline the software development lifecycle. Automated key parts of the CI/CD pipeline, reducing deployment times and minimizing manual errors for engineering teams.',
      tech: ['Python', 'Docker', 'Jenkins']
    },
    {
      name: 'Arena',
      description: 'A real-time data visualization dashboard for monitoring system health and operational metrics. Provided actionable insights through interactive charts and graphs, enabling rapid incident response and resolution.',
      tech: ['Angular', 'D3.js', 'Java']
    },
    {
      name: 'Marketing Cloud Contacts',
      description: 'A high-scale contact management system capable of handling billions of records. Optimized database queries and implemented caching strategies to ensure low-latency access to critical customer information.',
      tech: ['C#', 'SQL Server', 'Azure']
    }
  ];

  const demos = [
    { name: 'Demo Project 1', url: '#', icon: FaGithub },
    { name: 'Demo Project 2', url: '#', icon: FaGithub },
    { name: 'Demo Project 3', url: '#', icon: FaExternalLinkAlt },
  ];

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1>Projects & Demos</h1>
        <p>A showcase of my professional work and personal experiments.</p>
      </header>

      <section className="projects-section">
        <h2 className="section-title">Notable Corporate Projects</h2>
        <div className="projects-grid">
          {corporateProjects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="demos-section">
        <h2 className="section-title">Project Demos</h2>
        <div className="demos-grid">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            return (
              <a 
                key={index} 
                href={demo.url} 
                className="demo-card"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Icon className="demo-icon" />
                <span>{demo.name}</span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Projects;
