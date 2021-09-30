import React, { useState } from 'react';
import Resume from './cv/Resume';
import ContactInformation from './cv/ContactInformation';
import WorkExp from './cv/WorkExp';
import Education from './cv/Education';
import ResumeOutput from './components/ResumeOutput';
import AddToResumeSpeedDial from './components/AddToResumeSpeedDial';
import AppHeader from './components/AppHeader';
import { Box } from '@mui/system';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import uniqid from 'uniqid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LocalStorageHelper } from './localStorageHelper';
import DeleteConfirmation from './components/DeleteConfirmation';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import EditContactForm from './components/EditContactForm';
import EditWorkExpForm from './components/EditWorkExpForm';
import EditSkillsForm from './components/EditSkillsForm';
import CustomizeForm from './components/CustomizeForm';
import { format } from 'date-fns';
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
} from '@mui/material/colors';

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

const App = () => {
  const [resume, setResume] = useState(null);
  const [mode, setMode] = useState('light');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteWorkKey, setDeleteWorkKey] = useState('');
  const [deleteEduKey, setDeleteEduKey] = useState('');
  const [contactOpen, setContactOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [workMode, setWorkMode] = useState('work');
  const [addEditMode, setAddEditMode] = useState('add');
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [idToPopulate, setIdToPopulate] = useState('');
  const [resumeColor, setResumeColor] = useState('');
  const [storageHelper] = useState(new LocalStorageHelper());
  const [resumeTheme, setResumeTheme] = useState(null);
  const [customColors, setCustomColors] = useState([]);
  const [deleteMode, setDeleteMode] = useState('work');

  const generateTheme = (resColor) => {
    let newTheme = createTheme({
      palette: {
        primary: {
          main: resColor[500],
        },
        info: {
          main: resColor[700],
        },
      },

      typography: {
        h1: {
          fontSize: '3rem',
          '@media (min-width:600px)': {
            fontSize: '6rem',
          },
        },
        h2: {
          fontSize: '1.875rem',
          '@media (min-width:600px)': {
            fontSize: '3.75rem',
          },
        },
        h3: {
          fontSize: '1.5rem',
          '@media (min-width:600px)': {
            fontSize: '3rem',
          },
        },
        h4: {
          fontSize: '1.0625rem',
          '@media (min-width:600px)': {
            fontSize: '2.125rem',
          },
        },
        h5: {
          fontSize: '0.75rem',
          '@media (min-width:600px)': {
            fontSize: '1.5rem',
          },
        },
        h6: {
          fontSize: '0.625rem',
          '@media (min-width:600px)': {
            fontSize: '1.25rem',
          },
        },
        subtitle1: {
          fontSize: '0.5rem',
          '@media (min-width:600px)': {
            fontSize: '1rem',
          },
        },
        subtitle2: {
          fontSize: '0.4375rem',
          '@media (min-width:600px)': {
            fontSize: '.875rem',
          },
        },
        body1: {
          fontSize: '0.5rem',
          '@media (min-width:600px)': {
            fontSize: '1rem',
          },
        },
        body2: {
          fontSize: '0.4375rem',
          '@media (min-width:600px)': {
            fontSize: '.875rem',
          },
        },
        button: {
          fontSize: '0.4375rem',
          '@media (min-width:600px)': {
            fontSize: '.875rem',
          },
        },
        caption: {
          fontSize: '0.375rem',
          '@media (min-width:600px)': {
            fontSize: '.75rem',
          },
        },
        overline: {
          fontSize: '0.375rem',
          '@media (min-width:600px)': {
            fontSize: '.75rem',
          },
        },
      },

      spacing: 8,
      '@media (min-width:600px)': {
        spacing: 4,
      },
    });

    setResumeTheme(newTheme);
  };

  useConstructor(() => {
    let storedResume = storageHelper.retrieveItem('resume');

    const myResume = new Resume();
    const contactInfo = new ContactInformation();
    contactInfo._firstName = '';
    contactInfo._lastName = '';
    contactInfo._title = '';
    contactInfo._email = '';
    contactInfo._phoneNumber = '';
    contactInfo._website = '';

    if (storedResume != null) {
      contactInfo._firstName =
        storedResume._contactInformation._firstName.trim();
      contactInfo._lastName = '';
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

    setResume(myResume);

    let storedMode = storageHelper.retrieveItem('mode');
    if (storedMode === null) {
      storedMode = 'light';
    }
    setMode(storedMode);

    let resColor = storageHelper.retrieveItem('color');
    if (resColor === null) {
      resColor = blue;
    }
    setResumeColor(resColor);

    generateTheme(resColor);

    setCustomColors([
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
    ]);
  });

  const openWorkDialog = () => {
    setWorkMode('work');
    setAddEditMode('add');
    setWorkOpen(true);
    setIdToPopulate('');
  };

  const openEducationDialog = () => {
    setWorkMode('education');
    setAddEditMode('add');
    setWorkOpen(true);
    setIdToPopulate('');
  };

  const openContactDialog = () => {
    setContactOpen(true);
  };

  const openSkillsDialog = () => {
    setSkillsOpen(true);
  };

  const openCustomizeDialog = () => {
    setCustomizeOpen(true);
  };

  const handleWorkClose = () => {
    setWorkOpen(false);
  };

  const handleSkillsClose = () => {
    setSkillsOpen(false);
  };

  const handleCustomizeClose = () => {
    setCustomizeOpen(false);
  };

  const handleContactClose = () => {
    setContactOpen(false);
  };

  const updateContactInfo = (info) => {
    let updatedResume = Object.assign({}, resume);
    updatedResume._contactInformation._firstName = info.name;
    updatedResume._contactInformation._lastName = '';
    updatedResume._contactInformation._title = info.title;
    updatedResume._contactInformation._email = info.email;
    updatedResume._contactInformation._phoneNumber = info.phone;
    updatedResume._contactInformation._website = info.website;
    storageHelper.saveItem('resume', updatedResume);
  };

  const updateWorkInfo = (info, edit) => {
    let work;

    if (!edit) {
      work = new WorkExp();
    } else {
      work = resume._workHistory.filter((element) => {
        if (element._id === idToPopulate) {
          return true;
        }
        return false;
      })[0];
    }
    work._jobTitle = info.title;
    work._orgName = info.company;
    work._location = info.location;
    work._startDate = format(info.startDate, 'yyyy/MM');
    work._endDate = format(info.endDate, 'yyyy/MM');
    work._description = info.description;

    let updatedResume = Object.assign({}, resume);

    if (!edit) {
      updatedResume._workHistory = [...updatedResume._workHistory, work];
    } else {
      updatedResume._workHistory = updatedResume._workHistory
        .filter((element) => {
          if (element._id !== idToPopulate) {
            return true;
          }
          return false;
        })
        .concat(work);
    }

    storageHelper.saveItem('resume', resume);
    setResume(updatedResume);
    setIdToPopulate('');
  };

  const editWorkInfo = (info) => (event) => {
    // console.log(info);
    setAddEditMode('edit');
    setWorkMode('work');
    setIdToPopulate(info);
    setWorkOpen(true);
  };

  const deleteWorkInfo = (info) => (event) => {
    setDeleteConfirmationOpen(true);
    setDeleteWorkKey(info);
    setDeleteMode('work');
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const confirmDeleteWorkInfo = (e) => {
    e.preventDefault();
    // console.log("DELETE " + this.state.deleteWorkKey);

    let updatedResume = Object.assign({}, resume);
    updatedResume._workHistory = updatedResume._workHistory.filter(
      (element) => {
        if (element._id === deleteWorkKey) {
          return false;
        }
        return true;
      }
    );

    storageHelper.saveItem('resume', updatedResume);

    setResume(updatedResume);
    setIdToPopulate('');

    closeDeleteConfirmation();
  };

  const editEducationInfo = (info) => (event) => {
    // console.log(info);
    setAddEditMode('edit');
    setWorkMode('education');
    setIdToPopulate(info);
    setWorkOpen(true);
  };

  const deleteEducationInfo = (info) => (event) => {
    setDeleteConfirmationOpen(true);
    setDeleteEduKey(info);
    setDeleteMode('education');
  };

  const confirmDeleteEducationInfo = (e) => {
    e.preventDefault();

    let updatedResume = Object.assign({}, resume);
    updatedResume._educationHistory = updatedResume._educationHistory.filter(
      (element) => {
        if (element._id === deleteEduKey) {
          return false;
        }
        return true;
      }
    );
    storageHelper.saveItem('resume', resume);

    setResume(updatedResume);
    setIdToPopulate('');

    closeDeleteConfirmation();
  };

  const updateEducationInfo = (info, edit) => {
    let education;

    if (!edit) {
      education = new Education();
    } else {
      education = resume._educationHistory.filter((element) => {
        if (element._id === idToPopulate) {
          return true;
        }
        return false;
      })[0];
    }

    education._educationTitle = info.title;
    education._orgName = info.company;
    education._location = info.location;
    education._startDate = format(info.startDate, 'yyyy/MM');
    education._endDate = format(info.endDate, 'yyyy/MM');
    education._description = info.description;

    let updatedResume = Object.assign({}, resume);

    if (!edit) {
      updatedResume._educationHistory = [
        ...updatedResume._educationHistory,
        education,
      ];
    } else {
      updatedResume._educationHistory = updatedResume._educationHistory
        .filter((element) => {
          if (element._id !== idToPopulate) {
            return true;
          }
          return false;
        })
        .concat(education);
    }

    storageHelper.saveItem('resume', updatedResume);
    setResume(updatedResume);
    setIdToPopulate('');
  };

  const updateSkills = (info) => {
    let updatedResume = Object.assign({}, resume);

    updatedResume._skills = [
      ...updatedResume._skills,
      { skill: info, id: uniqid() },
    ];
    storageHelper.saveItem('resume', updatedResume);
    setResume(updatedResume);
  };

  const deleteSkill = (info) => (event) => {
    event.preventDefault();

    let updatedResume = Object.assign({}, resume);

    updatedResume._skills = updatedResume._skills.filter((element) => {
      if (element.id === info) {
        return false;
      }
      return true;
    });
    storageHelper.saveItem('resume', updatedResume);
    setResume(updatedResume);
  };

  const updateColor = (info) => (event) => {
    setResumeColor(info);
    storageHelper.saveItem('color', info);
  };

  const saveResumeToPdf = (isLarge) => {
    // console.log('isLarge ' + isLarge);
    const options = { scale: isLarge ? 2 : 4 };
    html2canvas(document.querySelector('.resume-to-capture'), options).then(
      function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          unit: 'in',
          format: [8.5, 11],
        });
        pdf.addImage(imgData, 'JPEG', 0, 0.25, 8.5, 10.75);
        pdf.save('download.pdf');
      }
    );
  };

  const toggleDarkMode = () => {
    let newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    storageHelper.saveItem('mode', newMode);
  };

  const myTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  if (resumeColor !== '') {
    resumeTheme.palette.primary.main = resumeColor[500];
    resumeTheme.palette.info.main = resumeColor[700];
  }

  if (resume === null) {
    return null;
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />

        <AppHeader
          saveResumeToPdf={saveResumeToPdf}
          toggleDarkMode={toggleDarkMode}
          mode={mode}
        />

        <AddToResumeSpeedDial
          resume={resume}
          updateContactInfo={updateContactInfo}
          updateWorkInfo={updateWorkInfo}
          updateEducationInfo={updateEducationInfo}
          updateSkills={updateSkills}
          setContactOpen={openContactDialog}
          setWorkOpen={openWorkDialog}
          setEducationOpen={openEducationDialog}
          setSkillsOpen={openSkillsDialog}
          setCustomizeOpen={openCustomizeDialog}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DeleteConfirmation
            open={deleteConfirmationOpen}
            deleteMode={deleteMode}
            handleClose={closeDeleteConfirmation}
            deleteWork={confirmDeleteWorkInfo}
            deleteEducation={confirmDeleteEducationInfo}
          />

          <EditContactForm
            open={contactOpen}
            handleClose={handleContactClose}
            contactInformation={resume._contactInformation}
            updateContactInfo={updateContactInfo}
          />
          <EditWorkExpForm
            open={workOpen}
            handleClose={handleWorkClose}
            workHistory={resume._workHistory}
            educationHistory={resume._educationHistory}
            updateWorkInfo={updateWorkInfo}
            updateEducationInfo={updateEducationInfo}
            workMode={workMode}
            idToPopulate={idToPopulate}
            mode={addEditMode}
          />
          <EditSkillsForm
            open={skillsOpen}
            handleClose={handleSkillsClose}
            skills={resume._skills}
            updateSkills={updateSkills}
            deleteSkill={deleteSkill}
          />
          <CustomizeForm
            open={customizeOpen}
            handleClose={handleCustomizeClose}
            customColors={customColors}
            updateColor={updateColor}
          />
        </LocalizationProvider>
      </ThemeProvider>
      <Box
        sx={{
          width: 'max(max-content, 100%)',
          bgcolor: 'background.paper',
        }}>
        <ThemeProvider theme={resumeTheme}>
          <ResumeOutput
            resume={resume}
            editWorkInfo={editWorkInfo}
            deleteWorkInfo={deleteWorkInfo}
            editEducationInfo={editEducationInfo}
            deleteEducationInfo={deleteEducationInfo}
          />
        </ThemeProvider>
      </Box>
    </React.Fragment>
  );
};

export default App;
