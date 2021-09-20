import React from "react";
import ResumeOutput from "./components/ResumeOutput";
import "./styles/normalize.css";
import Resume from "./cv/Resume";
import ContactInformation from "./cv/ContactInformation";
import WorkExp from "./cv/WorkExp";
import Skills from "./cv/Skills";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import AddDataButtons from "./components/AddDataButtons";

const myTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.openContactDialog = this.openContactDialog.bind(this);

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
    workExp2._startDate = "Jan 1, 2001";
    workExp2._endDate = "Mar 1, 2020";
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
  }

  openContactDialog(e) {
    console.log(e);
  }

  render() {
    return (
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            bgcolor: "background.paper",
          }}
        >
          <AddDataButtons contactClick={this.openContactDialog} />
          <ResumeOutput resume={this.state.resume} />
        </Box>
      </ThemeProvider>
    );
  }
}
