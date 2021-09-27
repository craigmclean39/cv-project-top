import React from "react";
import Resume from "./cv/Resume";
import ContactInformation from "./cv/ContactInformation";
import WorkExp from "./cv/WorkExp";
import Education from "./cv/Education";
import ResumeOutput from "./components/ResumeOutput";
import AddToResumeSpeedDial from "./components/AddToResumeSpeedDial";
import AppHeader from "./components/AppHeader";
import { Box } from "@mui/system";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import uniqid from "uniqid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { LocalStorageHelper } from "./localStorageHelper";
import DeleteConfirmation from "./components/DeleteConfirmation";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.storageHelper = new LocalStorageHelper();
    let storedResume = this.storageHelper.retrieveItem("resume");

    const myResume = new Resume();
    const contactInfo = new ContactInformation();
    contactInfo._firstName = "";
    contactInfo._lastName = "";
    contactInfo._title = "";
    contactInfo._email = "";
    contactInfo._phoneNumber = "";
    contactInfo._website = "";

    if (storedResume != null) {
      contactInfo._firstName = storedResume._contactInformation._firstName;
      contactInfo._lastName = "";
      contactInfo._title = storedResume._contactInformation._title;
      contactInfo._email = storedResume._contactInformation._email;
      contactInfo._phoneNumber = storedResume._contactInformation._phoneNumber;
      contactInfo._website = storedResume._contactInformation._website;

      for (let i = 0; i < storedResume._skills.length; i++) {
        myResume.addSkill(storedResume._skills[i].skill);
      }

      for (let i = 0; i < storedResume._workHistory.length; i++) {
        const work = new WorkExp();
        work._jobTitle = storedResume._workHistory[i]._jobTitle;
        work._orgName = storedResume._workHistory[i]._orgName;
        work._location = storedResume._workHistory[i]._location;
        work._startDate = storedResume._workHistory[i]._startDate;
        work._endDate = storedResume._workHistory[i]._endDate;
        work._description = storedResume._workHistory[i]._description;
        myResume._workHistory.push(work);
      }

      for (let i = 0; i < storedResume._educationHistory.length; i++) {
        const edu = new Education();
        edu._educationTitle = storedResume._educationHistory[i]._educationTitle;
        edu._orgName = storedResume._educationHistory[i]._orgName;
        edu._location = storedResume._educationHistory[i]._location;
        edu._startDate = storedResume._educationHistory[i]._startDate;
        edu._endDate = storedResume._educationHistory[i]._endDate;
        edu._description = storedResume._educationHistory[i]._description;
        myResume._educationHistory.push(edu);
      }
    }

    myResume._contactInformation = contactInfo;

    let mode = this.storageHelper.retrieveItem("mode");
    if (mode === null) {
      mode = "light";
    }

    this.state = {
      resume: myResume,
      mode: mode,
      deleteConfirmationOpen: false,
      deleteWorkKey: "",
      deleteEduKey: "",
    };

    this.updateContactInfo = this.updateContactInfo.bind(this);
    this.updateWorkInfo = this.updateWorkInfo.bind(this);
    this.updateEducationInfo = this.updateEducationInfo.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.saveResumeToPdf = this.saveResumeToPdf.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.closeDeleteConfirmation = this.closeDeleteConfirmation.bind(this);
    this.confirmDeleteWorkInfo = this.confirmDeleteWorkInfo.bind(this);
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
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });
  }

  updateWorkInfo(info) {
    const work = new WorkExp();
    work._jobTitle = info.title;
    work._orgName = info.company;
    work._location = info.location;
    work._startDate = info.startDate;
    work._endDate = info.endDate;
    work._description = info.description;

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._workHistory = [...resume._workHistory, work];
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });
  }

  editWorkInfo = (info) => (event) => {};

  deleteWorkInfo = (info) => (event) => {
    this.setState({
      deleteConfirmationOpen: true,
      deleteWorkKey: info,
    });
  };

  closeDeleteConfirmation() {
    this.setState({
      deleteConfirmationOpen: false,
    });
  }

  confirmDeleteWorkInfo(e) {
    e.preventDefault();
    // console.log("DELETE " + this.state.deleteWorkKey);

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._workHistory = resume._workHistory.filter((element) => {
        if (element._id === this.state.deleteWorkKey) {
          return false;
        }
        return true;
      });
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });

    this.closeDeleteConfirmation();
  }

  updateEducationInfo(info) {
    // console.log(info);
    const education = new Education();
    education._educationTitle = info.title;
    education._orgName = info.company;
    education._location = info.location;
    education._startDate = info.startDate;
    education._endDate = info.endDate;
    education._description = info.description;

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._educationHistory = [...resume._educationHistory, education];
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });
  }

  updateSkills(info) {
    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._skills = [...resume._skills, { skill: info, id: uniqid() }];
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });
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
        //document.body.appendChild(canvas);
      }
    );
  }

  toggleDarkMode() {
    let newMode = this.state.mode === "light" ? "dark" : "light";
    this.setState({
      mode: newMode,
    });

    this.storageHelper.saveItem("mode", newMode);
  }

  render() {
    const myTheme = createTheme({
      palette: {
        mode: this.state.mode,
      },
    });

    return (
      <React.Fragment>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />

          <AppHeader
            saveResumeToPdf={this.saveResumeToPdf}
            toggleDarkMode={this.toggleDarkMode}
            mode={this.state.mode}
          />

          <AddToResumeSpeedDial
            resume={this.state.resume}
            updateContactInfo={this.updateContactInfo}
            updateWorkInfo={this.updateWorkInfo}
            updateEducationInfo={this.updateEducationInfo}
            updateSkills={this.updateSkills}
          />
          <DeleteConfirmation
            open={this.state.deleteConfirmationOpen}
            handleClose={this.closeDeleteConfirmation}
            deleteWork={this.confirmDeleteWorkInfo}
          />
        </ThemeProvider>
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.paper",
          }}
        >
          <ResumeOutput
            resume={this.state.resume}
            editWorkInfo={this.editWorkInfo}
            deleteWorkInfo={this.deleteWorkInfo}
          />
        </Box>
      </React.Fragment>
    );
  }
}
