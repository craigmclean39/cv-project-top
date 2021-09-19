import React from "react";
import ResumeOutput from "./components/ResumeOutput";
import "./styles/normalize.css";
import Resume from "./cv/Resume";
import ContactInformation from "./cv/ContactInformation";
import WorkExp from "./cv/WorkExp";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const myResume = new Resume();
    const contactInfo = new ContactInformation();
    contactInfo._firstName = "Craig";
    contactInfo._lastName = "McLean";
    contactInfo._title = "Full Stack Web Developer";
    contactInfo._email = "craig@craigmclean.dev";
    contactInfo._phoneNumber = "604-555-5555";
    contactInfo._website = "www.craigmclean.dev";

    const workExp1 = new WorkExp();
    workExp1._jobTitle = "Software Developer";
    workExp1._orgName = "WFH International";
    workExp1._location = "Squamish, BC, CA";
    workExp1._startDate = "Jan 1, 2001";
    workExp1._endDate = "Mar 1, 2020";
    workExp1._description.push(
      "I did some work, it was work. I was good at the work."
    );
    workExp1._description.push(
      "I also did some other work, I was great at that work."
    );

    const workExp2 = new WorkExp();
    workExp2._jobTitle = "Software Developer";
    workExp2._orgName = "WFH International";
    workExp2._location = "Squamish, BC, CA";
    workExp2._startDate = "Jan 1, 2001";
    workExp2._endDate = "Mar 1, 2020";
    workExp2._description.push(
      "I did some work, it was work. I was good at the work."
    );
    workExp2._description.push(
      "I also did some other work, I was great at that work."
    );

    myResume._contactInformation = contactInfo;
    myResume._workHistory.push(workExp1);
    myResume._workHistory.push(workExp2);

    this.state = {
      resume: myResume,
    };
  }
  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <ResumeOutput resume={this.state.resume} />
      </div>
    );
  }
}
