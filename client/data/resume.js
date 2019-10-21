'use strict';

import 'web-animations-js';
import React from 'react';
import ReactDOM from 'react-dom';

import contact from './contact';
import about from './about';
import jobs from './jobs';
import skills from './skills';

const mobileWidth = 540;

function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function isMobile() {
  if (getViewportWidth() <= mobileWidth) {
    return true;
  }

  return false;
}

function ResumeHeader() {
  return (
    <header>
      <div className="header-name">JOHN BRANCA</div>
      <div className="header-info">WEB DEVELOPER</div>
    </header>
  );
}

class ResumeTabs extends React.Component {
  constructor(props) {
    super(props);

    this.setInitialState(1);

    this.changeTab = this.changeTab.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  setInitialState(onLoad) {
    if (isMobile()) {
      this.tabs = [
        { name: 'about', title: 'About Me', component: <About /> },
        { name: 'resume', title: 'Resume', component: <Resume /> },
        { name: 'skills', title: 'Skills', component: <Skills /> }
      ];
    } else {
      this.tabs = [
        { name: 'about', title: 'About Me', component: <About /> },
        { name: 'resume', title: 'Resume', component: <Resume /> }
      ];
    }

    if (onLoad === 1) {
      this.state = { currentTab: this.tabs[1] };
    } else {
      this.setState({ currentTab: this.tabs[1] });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setInitialState);
  }

  changeTab(event) {
    const target = event.target.getAttribute('data-tab');

    event.preventDefault();

    if (this.tabs[target] === this.state.currentTab) {
      return;
    }

    this.setState({ currentTab: this.tabs[target] });
  }

  render() {
    return (
      <div className="resume">
        <ul className="resume-tabs">
          {this.tabs.map((tab, index) => (
            <li className={ this.state.currentTab === tab ? 'active' : 'notactive' } key={tab.name} onClick={this.changeTab} data-tab={index}>{tab.title}</li>
          ))}
        </ul>
        <div id="resume-detail">
        {this.state.currentTab.component}
        </div>
      </div>
    );
  }
}

class About extends React.Component {
  render() {
    const mailTo = 'mailto:' + contact.email;

    return (
      <div id="about-section">
        <h3>About</h3>
        <div id="about-summary">
          <strong>{about.summary.title}</strong> {about.summary.content}
        </div>
        <h4>Education</h4>
        <div>{about.education.degree} in <strong>{about.education.concentration}</strong> from <em>{about.education.university}</em>, {about.education.graduation_date}</div>
        <h4>Certifications</h4>
        <div>{about.certifications[0]}</div>
        <h4>Contact Me</h4>
        <div>Email: <a href={mailTo}>{contact.email}</a></div>
        <div>Github: <a target="_blank" rel="noopener noreferrer" href={contact.github}>{contact.github}</a></div>
        <div>LinkedIn: <a target="_blank" rel="noopener noreferrer" href={contact.linkedin}>{contact.linkedin}</a></div>
      </div>
    );
  }
}

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = { firstPaint: true, animated: false };
    this.animationList = [];
  }

  animate() {
    let animationDelay = 0;

    if (this.state.animated === true) {
      return true;
    }

    for (var i = 0; i < this.animationList.length; i++) {
      document.getElementById(this.animationList[i].elementId).animate([
        { width: '1%' },
        { width: this.animationList[i].percentage + '%' }
      ], {
        delay: animationDelay,
        duration: 1000,
        fill: 'forwards'
      });

      animationDelay += 250;
    }

    return true;
  }

  componentDidMount() {
    this.setState({
      firstPaint: false,
      animated: this.animate()
    });
  }

  getSkillStyle(elementId, colorToInject, percentage) {
    this.animationList.push({
      elementId: elementId,
      percentage: percentage
    });

    return {
      backgroundColor: colorToInject
    }
  }

  render() {
    return (
      <div id="skills">
        <h3>Skills</h3>
        {skills.map((skillTypeData, skillTypeIndex) => (
        <div key={skillTypeData.type} className="skill-type">
          <h4 className="skill-type-header">{skillTypeData.type}</h4>
          {skillTypeData.data.map((skill, skillIndex) => 
            <div key={ 'skill' + skillIndex } className="skill">
              <div className="skill-name">
                <div className="skill-bg" id={ 'skill-' + skillTypeIndex + '-bg-' + skillIndex} style={this.getSkillStyle('skill-' + skillTypeIndex + '-bg-' + skillIndex, skill.bgColor, skill.experience)}>{skill.name}</div>
              </div>
            </div>
          )}
        </div>
        ))}
      </div>
    );
  }
}

class Resume extends React.Component {
  render() {
    let skills = '';

    if (!isMobile()) {
      skills = <Skills />;
    }

    return (
      <div id="resume-section">
        <div id="work-experience">
          <h3>Work Experience</h3>
          {jobs.map((job, index) => (
            <div key={ 'job-' + index} className="job">
              <div className="job-header">
                <div className="job-title">{job.title} - {job.company} - {job.location}</div>
                <div className="job-dates">{job.dates}</div>
              </div>
              <ul className="job-details">
              {job.description.map((description, descriptionIndex) => (
                <li key={ 'job-' + index + '-desc-' + descriptionIndex } className="job-detail">{description}</li>
              ))}
              </ul>
            </div>
          ))}
        </div>
        {skills}
      </div>
    );
  }
}

function App() {
  return (
    <div className="portfolio">
      <ResumeHeader />
      <ResumeTabs />
    </div>
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
