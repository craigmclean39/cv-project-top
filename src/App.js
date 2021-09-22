import React from "react";
import ResumeOutput from "./components/ResumeOutput";
//import "./styles/normalize.css";
import Resume from "./cv/Resume";
import ContactInformation from "./cv/ContactInformation";
import WorkExp from "./cv/WorkExp";
import Skills from "./cv/Skills";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import AddDataButtons from "./components/AddDataButtons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const myResume = new Resume();
    const contactInfo = new ContactInformation();
    contactInfo._firstName = "Your";
    contactInfo._lastName = "Name";
    contactInfo._title = "Your Title";
    contactInfo._email = "";
    contactInfo._phoneNumber = "";
    contactInfo._website = "";

    const workExp1 = new WorkExp();
    workExp1._jobTitle = "Software Developer";
    workExp1._orgName = "WFH International";
    workExp1._location = "Vancouver, BC, CA";
    workExp1._startDate = Date.now();
    workExp1._endDate = Date.now();
    workExp1.addDescription(
      "I did some work, it was work. I was good at the work."
    );
    workExp1.addDescription(
      "I also did some other work, I was great at that work."
    );

    const workExp2 = new WorkExp();
    workExp2._jobTitle = "Software Developer";
    workExp2._orgName = "WFH International";
    workExp2._location = "Squamish, BC, CA";
    workExp2._startDate = Date.now();
    workExp2._endDate = Date.now();
    workExp2.addDescription(
      "I did some work, it was work. I was good at the work."
    );
    workExp2.addDescription(
      "I also did some other work, I was great at that work."
    );

    myResume._contactInformation = contactInfo;
    myResume._workHistory.push(workExp1);
    myResume._workHistory.push(workExp2);

    const skills = new Skills();
    skills.addSkill("Nunchuck");
    skills.addSkill("Bow Hunting");
    skills.addSkill("Computer Hacking");

    myResume._skills = skills;

    this.state = {
      resume: myResume,
    };

    this.updateContactInfo = this.updateContactInfo.bind(this);
    this.saveResumeToPdf = this.saveResumeToPdf.bind(this);
  }

  updateContactInfo(info) {
    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._contactInformation._firstName = info.name;
      resume._contactInformation._lastName = "";
      resume._contactInformation._title = info.title;
      resume._contactInformation._email = info.email;
      resume._contactInformation._phoneNumber = info.phone;
      resume._contactInformation._website = info.website;
      return { resume };
    });
  }

  updateWorkInfo() {
    console.log("Update Work Info");
  }

  saveResumeToPdf() {
    const options = { scale: 2 };
    html2canvas(document.querySelector(".resume-to-capture"), options).then(
      function (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          unit: "in",
          format: [8.5, 11],
        });
        pdf.addImage(imgData, "JPEG", 0, 0.25, 8.5, 10.75);
        pdf.save("download.pdf");
        document.body.appendChild(canvas);
      }
    );
  }

  render() {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          bgcolor: "background.paper",
        }}
      >
        <AddDataButtons
          resume={this.state.resume}
          updateContactInfo={this.updateContactInfo}
          updateWorkInfo={this.updateWorkInfo}
        />
        <Box>
          <Button variant="contained" onClick={this.saveResumeToPdf}>
            Save as PDF
          </Button>
        </Box>
        <ResumeOutput resume={this.state.resume} />
      </Box>
    );
  }
}
