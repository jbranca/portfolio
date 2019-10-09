'use strict';

class ResumeHeader extends React.Component {
  render() {
    return (
      <header>
        <div className="header-name">JOHN BRANCA</div>
        <div className="header-info">WEB DEVELOPER</div>
      </header>
    );
  }
}

class ResumeTabs extends React.Component {
  constructor(props) {
    super(props);

    this.tabs = [
      { name: 'about', title: 'About Me', component: <About /> },
      { name: 'resume', title: 'Resume', component: <Resume /> },
      { name: 'contact', title: 'Contact Me', component: <Contact /> }
    ];
    this.state = { currentTab: this.tabs[1] };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(event) {
    const target = event.target.getAttribute('data-tab');

    event.preventDefault();

    if (this.tabs[target] === this.state.currentTab) {
      return;
    }

    this.setState({ currentTab: this.tabs[target]});
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

function About(props) {
  return (
    <div id="about-section">
      <h3>About</h3>
    </div>
  );
}

class Resume extends React.Component {
  getBackgroundColor(colorToInject, percentage) {
    const leftoverPercentage = 100 - percentage;
    return {
      backgroundImage: `linear-gradient(-90deg, #fff ${leftoverPercentage}%,  ${colorToInject} ${percentage}%)`
    }
  }

  render() {
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
        <div id="skills">
          <h3>Skills</h3>
          {skills.map((skillTypeData, skillTypeIndex) => (
          <div key={skillTypeData.type} className="skill-type">
            <h4 className="skill-type-header">{skillTypeData.type}</h4>
            {skillTypeData.data.map((skill, skillIndex) => 
              <div key={ 'skill' + skillIndex } className="skill" style={this.getBackgroundColor(skill.color, skill.experience)}>
                <div className="skill-name">{skill.name}</div>
              </div>
            )}
          </div>
          ))}
        </div>
      </div>
    );
  }
}

function Contact(props) {
  return (
    <div id="contact-section">
      <h3>Contact</h3>
    </div>
  );
}

class ResumeCertifications extends React.Component {
  render() {
    let html = '';

    for (var i = 0; i < certifications.length; i++) {
      html += `${certifications[i].title} - ${certifications[i].company}`;
    }

    return html;
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