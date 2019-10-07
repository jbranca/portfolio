'use strict';

const resumeElement = React.createElement;

class ResumeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    const className = this.state.clicked ? 'pinned' : 'notpinned';

    return (
      <header className={className} onClick={() => { this.state.clicked = !this.state.clicked } }>
        <div className="header-name">JOHN BRANCA</div>
        <div className="header-info">
          <div><a href="mailto:john.branca@gmail.com">john.branca@gmail.com</a></div>
          <div><a href="https://github.com/jbranca">https://github.com/jbranca</a></div>
          <div>(508) 241-8605</div>
          <div>Charlotte, NC</div>
        </div>
      </header>
    );
  }
}

function ResumeJobDescription(props) {
  return (
    <li key={props.keyId}>{props.description}</li>
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

function ResumeJob(props) {
  let jobDescriptions = [];
  let jobImg = props.job.img;
  const viewportWidth = Math.max(
    document.documentElement.clientWidth, 
    window.innerWidth || 0
  );

  if (viewportWidth < 541) {
    jobImg = props.job.mobileImg;
  }

  for (var i = 0; i < props.job.description.length; i++) {
    jobDescriptions.push(
      ResumeJobDescription(
        { 
          description: props.job.description[i],
          keyId: props.keyId + '-description-' + i
        }
      )
    );
  }

  return (
    <div className="job" key={props.keyId} style={{backgroundImage: 'url(' + jobImg + ')'}}>
      <div className="job-header">
        <div className="job-title">
          {props.job.title} - {props.job.company} - {props.job.location}
        </div>
        <div className="job-dates">
          {props.job.dates}
        </div>
      </div>
      <div className="job-description">
        <ul>
          {jobDescriptions}
        </ul>
      </div>
    </div>
  );
}

function App() {
  let resumeJobs = [];

  for (var i = 0; i < jobs.length; i++) {
    resumeJobs.push(ResumeJob({ job: jobs[i], keyId: 'job' + i }));
  }

  return (
    <div className="resume">
      <ResumeHeader />
      <div className="resume-jobs">
        {resumeJobs}
      </div>
    </div>
  );
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);