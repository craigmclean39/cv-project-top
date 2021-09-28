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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import EditContactForm from "./components/EditContactForm";
import EditWorkExpForm from "./components/EditWorkExpForm";
import EditSkillsForm from "./components/EditSkillsForm";
import CustomizeForm from "./components/CustomizeForm";
import { format } from "date-fns";
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from "@mui/material/colors";

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
      contactInfo._firstName =
        storedResume._contactInformation._firstName.trim();
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

    let resColor = this.storageHelper.retrieveItem("color");
    if (resColor === null) {
      resColor = blue;
    }

    this.state = {
      resume: myResume,
      mode: mode,
      deleteConfirmationOpen: false,
      deleteWorkKey: "",
      deleteEduKey: "",
      deleteMode: "",
      contactOpen: false,
      workOpen: false,
      workMode: "work",
      addEditMode: "add",
      skillsOpen: false,
      customizeOpen: false,
      idToPopulate: "",
      resumeColor: resColor,
    };

    this.customColors = [
      red,
      pink,
      purple,
      deepPurple,
      indigo,
      blue,
      lightBlue,
      cyan,
      teal,
      green,
      lightGreen,
      lime,
      yellow,
      amber,
      orange,
      deepOrange,
    ];

    this.updateContactInfo = this.updateContactInfo.bind(this);
    this.updateWorkInfo = this.updateWorkInfo.bind(this);
    this.updateEducationInfo = this.updateEducationInfo.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.saveResumeToPdf = this.saveResumeToPdf.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.closeDeleteConfirmation = this.closeDeleteConfirmation.bind(this);
    this.confirmDeleteWorkInfo = this.confirmDeleteWorkInfo.bind(this);
    this.confirmDeleteEducationInfo =
      this.confirmDeleteEducationInfo.bind(this);
    this.openEditContactInformationDialog =
      this.openEditContactInformationDialog.bind(this);
    this.setContactOpen = this.setContactOpen.bind(this);
    this.handleContactClose = this.handleContactClose.bind(this);
    this.setWorkOpen = this.setWorkOpen.bind(this);
    this.setEducationOpen = this.setEducationOpen.bind(this);
    this.handleWorkClose = this.handleWorkClose.bind(this);
    this.setSkillsOpen = this.setSkillsOpen.bind(this);
    this.handleSkillsClose = this.handleSkillsClose.bind(this);
    this.setCustomizeOpen = this.setCustomizeOpen.bind(this);
    this.handleCustomizeClose = this.handleCustomizeClose.bind(this);
  }

  setAddEditMode(value) {
    this.setState({
      addEditMode: value,
    });
  }

  setContactOpen() {
    this.setState({
      contactOpen: true,
    });
  }

  setWorkOpen() {
    this.setWorkMode("work");
    this.setAddEditMode("add");
    this.setState({
      workOpen: true,
      idToPopulate: "",
    });
  }

  setEducationOpen() {
    this.setWorkMode("education");
    this.setAddEditMode("add");
    this.setState({ workOpen: true, idToPopulate: "" });
  }

  setSkillsOpen() {
    this.setState({ skillsOpen: true });
  }

  setCustomizeOpen() {
    this.setState({ customizeOpen: true });
  }

  setWorkMode(value) {
    this.setState({
      workMode: value,
    });
  }

  handleWorkClose() {
    this.setState({ workOpen: false });
  }

  handleSkillsClose() {
    this.setState({ skillsOpen: false });
  }

  handleCustomizeClose() {
    this.setState({ customizeOpen: false });
  }

  handleContactClose() {
    this.setState({ contactOpen: false });
  }

  openEditContactInformationDialog = () => {
    this.setContactOpen(true);
  };

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

  updateWorkInfo(info, edit) {
    let work;

    if (!edit) {
      work = new WorkExp();
    } else {
      work = this.state.resume._workHistory.filter((element) => {
        if (element._id === this.state.idToPopulate) {
          return true;
        }
        return false;
      })[0];
    }
    work._jobTitle = info.title;
    work._orgName = info.company;
    work._location = info.location;
    work._startDate = format(info.startDate, "yyyy/MM");
    work._endDate = format(info.endDate, "yyyy/MM");
    work._description = info.description;

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      if (!edit) {
        resume._workHistory = [...resume._workHistory, work];
      } else {
        resume._workHistory = resume._workHistory
          .filter((element) => {
            if (element._id !== this.state.idToPopulate) {
              return true;
            }
            return false;
          })
          .concat(work);
      }

      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });

    this.setState({ idToPopulate: "" });
  }

  editWorkInfo = (info) => (event) => {
    console.log(info);
    this.setAddEditMode("edit");
    this.setWorkMode("work");
    this.setState({ idToPopulate: info, workOpen: true });
  };

  deleteWorkInfo = (info) => (event) => {
    this.setState({
      deleteConfirmationOpen: true,
      deleteWorkKey: info,
      deleteMode: "work",
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

    this.setState({ idToPopulate: "" });

    this.closeDeleteConfirmation();
  }

  editEducationInfo = (info) => (event) => {
    console.log(info);
    this.setAddEditMode("edit");
    this.setWorkMode("education");
    this.setState({ idToPopulate: info, workOpen: true });
  };

  deleteEducationInfo = (info) => (event) => {
    this.setState({
      deleteConfirmationOpen: true,
      deleteEduKey: info,
      deleteMode: "education",
    });
  };

  confirmDeleteEducationInfo(e) {
    e.preventDefault();

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._educationHistory = resume._educationHistory.filter((element) => {
        if (element._id === this.state.deleteEduKey) {
          return false;
        }
        return true;
      });
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });

    this.setState({ idToPopulate: "" });

    this.closeDeleteConfirmation();
  }

  updateEducationInfo(info, edit) {
    let education;

    if (!edit) {
      education = new Education();
    } else {
      education = this.state.resume._educationHistory.filter((element) => {
        if (element._id === this.state.idToPopulate) {
          return true;
        }
        return false;
      })[0];
    }

    education._educationTitle = info.title;
    education._orgName = info.company;
    education._location = info.location;
    education._startDate = format(info.startDate, "yyyy/MM");
    education._endDate = format(info.endDate, "yyyy/MM");
    education._description = info.description;

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      if (!edit) {
        resume._educationHistory = [...resume._educationHistory, education];
      } else {
        resume._educationHistory = resume._educationHistory
          .filter((element) => {
            if (element._id !== this.state.idToPopulate) {
              return true;
            }
            return false;
          })
          .concat(education);
      }

      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });

    this.setState({ idToPopulate: "" });
  }

  updateSkills(info) {
    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._skills = [...resume._skills, { skill: info, id: uniqid() }];
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });
  }

  deleteSkill = (info) => (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      let resume = Object.assign({}, prevState.resume);

      resume._skills = resume._skills.filter((element) => {
        if (element.id === info) {
          return false;
        }
        return true;
      });
      this.storageHelper.saveItem("resume", resume);
      return { resume };
    });
  };

  updateColor = (info) => (event) => {
    this.setState({
      resumeColor: info,
    });
    this.storageHelper.saveItem("color", info);
  };

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

    const resumeTheme = createTheme({
      palette: {
        primary: {
          main: this.state.resumeColor[500],
        },
        info: {
          main: this.state.resumeColor[700],
        },
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
            setContactOpen={this.setContactOpen}
            setWorkOpen={this.setWorkOpen}
            setEducationOpen={this.setEducationOpen}
            setSkillsOpen={this.setSkillsOpen}
            setCustomizeOpen={this.setCustomizeOpen}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DeleteConfirmation
              open={this.state.deleteConfirmationOpen}
              deleteMode={this.state.deleteMode}
              handleClose={this.closeDeleteConfirmation}
              deleteWork={this.confirmDeleteWorkInfo}
              deleteEducation={this.confirmDeleteEducationInfo}
            />

            <EditContactForm
              open={this.state.contactOpen}
              handleClose={this.handleContactClose}
              contactInformation={this.state.resume._contactInformation}
              updateContactInfo={this.updateContactInfo}
            />
            <EditWorkExpForm
              open={this.state.workOpen}
              handleClose={this.handleWorkClose}
              workHistory={this.state.resume._workHistory}
              educationHistory={this.state.resume._educationHistory}
              updateWorkInfo={this.updateWorkInfo}
              updateEducationInfo={this.updateEducationInfo}
              workMode={this.state.workMode}
              idToPopulate={this.state.idToPopulate}
              mode={this.state.addEditMode}
            />
            <EditSkillsForm
              open={this.state.skillsOpen}
              handleClose={this.handleSkillsClose}
              skills={this.state.resume._skills}
              updateSkills={this.updateSkills}
              deleteSkill={this.deleteSkill}
            />
            <CustomizeForm
              open={this.state.customizeOpen}
              handleClose={this.handleCustomizeClose}
              customColors={this.customColors}
              updateColor={this.updateColor}
            />
          </LocalizationProvider>
        </ThemeProvider>
        <Box
          sx={{
            width: "max(max-content, 100%)",
            bgcolor: "background.paper",
          }}
        >
          <ThemeProvider theme={resumeTheme}>
            <ResumeOutput
              resume={this.state.resume}
              editWorkInfo={this.editWorkInfo}
              deleteWorkInfo={this.deleteWorkInfo}
              editEducationInfo={this.editEducationInfo}
              deleteEducationInfo={this.deleteEducationInfo}
            />
          </ThemeProvider>
        </Box>
      </React.Fragment>
    );
  }
}
