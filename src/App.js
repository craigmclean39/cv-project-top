import React from "react";
import ResumeOutput from "./components/ResumeOutput";
import "./styles/normalize.css";
import Resume from "./cv/Resume";
import ContactInformation from "./cv/ContactInformation";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const contactInfo = new ContactInformation();
    contactInfo._firstName = "Craig";
    contactInfo._lastName = "McLean";
    contactInfo._title = "Full Stack Web Developer";

    this.state = {
      contactInformation: contactInfo,
    };
  }
  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <ResumeOutput contactInformation={this.state.contactInformation} />
      </div>
    );
  }
}
