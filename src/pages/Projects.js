import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const corporateProjects = [
    {
      name: 'Hoodoo',
      description: 'Hoodoo is an internal scheduling tool I supported for the USAA operations development team, designed to manage on-call shifts and display them on an interactive calendar. It provides automated notifications, shift reminders, and dashboards showing who is on call across different responsibility areas.',
      tech: ['Angular', 'Java', 'ServiceNow', 'OpenShift', 'Kubernetes', 'Docker', 'GitLab CICD', 'Control M']
    },
    {
      name: 'Accelerator',
      description: 'Accelerator is an internal enterprise messaging system built at USAA that unified SMS, internal chat-style messaging, and email delivery. It alerted teams about system outages, sent on-call paging notifications, and supported organization-wide communication. The platform enabled rapid, reliable messaging across multiple channels within the company.',
      tech: ['Angular.JS', 'Java', 'JBoss', 'Jenkins']
    },
    {
      name: 'Model Manager UI',
      description: 'A centralized interface for managing enterprise data models used in analytics. It allowed users to register and maintain new models built in Tableau, Python, and other languages, streamlining the governance and accessibility of analytical assets at USAA.',
      tech: ['React', 'Spring Boot Java', 'ELK Stack']
    },
    {
      name: 'Enterprise Data Platforms',
      description: 'An application built around Hadoop and Spark to enable efficient data access within a Hadoop Cluster. It automated data processing workflows and produced relevant information into Kafka topics for downstream consumption.',
      tech: ['Scala', 'Spark', 'Hadoop', 'Kafka']
    },
    {
      name: 'Arena',
      description: 'Arena is an internal platform application built on Oracle OCI that enabled other teams to develop and deploy applications on top of it. It streamlined onboarding with CLI tools that allowed new projects to integrate quickly and efficiently.',
      tech: ['Oracle OJet', 'Python', 'Flask', 'GraphQL', 'OCI Cloud', 'Kubernetes', 'Docker', 'Gitlab CICD']
    },
    {
      name: 'Marketing Cloud Contacts',
      description: 'A high-scale contact management system capable of handling billions of records. Optimized database queries and implemented caching strategies to ensure low-latency access to critical customer information.',
      tech: ['C#', 'SQL Server', 'Azure', 'Kubernetes', 'Docker', 'Splunk']
    }
  ];

  const demos = [
    { name: 'Pokédex', url: '/pokedex', image: process.env.PUBLIC_URL + '/demo/Pokedex.png', internal: true },
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
            const content = (
              <>
                {demo.image ? (
                  <img src={demo.image} alt={demo.name} className="demo-icon demo-image" />
                ) : (
                  <Icon className="demo-icon" />
                )}
                <span>{demo.name}</span>
              </>
            );
            
            return demo.internal ? (
              <Link 
                key={index} 
                to={demo.url} 
                className="demo-card"
              >
                {content}
              </Link>
            ) : (
              <a 
                key={index} 
                href={demo.url} 
                className="demo-card"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Projects;
