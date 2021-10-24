import React, { useState, useRef, useEffect } from 'react';
import ResumeOutput from './components/ResumeOutput';
import AddToResumeSpeedDial from './components/AddToResumeSpeedDial';
import AppHeader from './components/AppHeader';
import { Box } from '@mui/system';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
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
import ResumeHandler from './cv/ResumeHandler';
import generateTheme from './theme';

const App = () => {
  const resumeHandlerRef = useRef(new ResumeHandler());
  const resumeHandler = resumeHandlerRef.current;

  const storageHelperRef = useRef(new LocalStorageHelper());
  const storageHelper = storageHelperRef.current;

  const [resume, setResume] = useState(resumeHandler.getWorkingResume());
  const [mode, setMode] = useState(
    storageHelper.retrieveItem('mode') ?? 'light'
  );
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

  const [resumeTheme, setResumeTheme] = useState(
    generateTheme(resumeHandler.getWorkingResume()._color)
  );
  const [deleteMode, setDeleteMode] = useState('work');
  const [siteTheme, setSiteTheme] = useState(
    createTheme({
      palette: {
        mode: 'light',
      },
    })
  );

  const customColors = useRef([
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

  //Update siteTheme when mode updates
  useEffect(() => {
    setSiteTheme(
      createTheme({
        palette: {
          mode: mode,
        },
      })
    );
  }, [mode]);

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
    resumeHandler.updateContactInformation(info);
    setResume(resumeHandler.getWorkingResume());
  };

  const updateWorkInfo = (info, edit) => {
    if (edit) {
      resumeHandler.editWorkInfo(info, idToPopulate);
    } else {
      resumeHandler.addWorkInfo(info);
    }

    setResume(resumeHandler.getWorkingResume());
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

    resumeHandler.deleteWorkInfo(deleteWorkKey);

    setResume(resumeHandler.getWorkingResume());
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

    resumeHandler.deleteEducationInfo(deleteEduKey);

    setResume(resumeHandler.getWorkingResume());
    setIdToPopulate('');

    closeDeleteConfirmation();
  };

  const updateEducationInfo = (info, edit) => {
    if (edit) {
      resumeHandler.editEducationInfo(info, idToPopulate);
    } else {
      resumeHandler.addEducationInfo(info);
    }

    setResume(resumeHandler.getWorkingResume());
    setIdToPopulate('');
  };

  const updateSkills = (info) => {
    resumeHandler.updateSkills(info);
    setResume(resumeHandler.getWorkingResume());
  };

  const deleteSkill = (info) => (event) => {
    event.preventDefault();
    resumeHandler.deleteSkill(info);
    setResume(resumeHandler.getWorkingResume());
  };

  const updateColor = (info) => (event) => {
    resumeHandler.updateColor(info);

    let newTheme = Object.assign({}, resumeTheme);
    newTheme.palette.primary.main =
      resumeHandler.getWorkingResume()._color[500];
    newTheme.palette.info.main = resumeHandler.getWorkingResume()._color[700];
    setResumeTheme(newTheme);
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

  if (resume === null) {
    return null;
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={siteTheme}>
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
            customColors={customColors.current}
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
