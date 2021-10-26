import React, { useState, useRef, useEffect } from 'react';

import generateTheme from './theme';
import { useResume } from './hooks/useResume';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useFirebase } from './hooks/useFirebase';

import ResumeOutput from './components/ResumeOutput';
import AddToResumeSpeedDial from './components/AddToResumeSpeedDial';
import AppHeader from './components/AppHeader';
import DeleteConfirmation from './components/DeleteConfirmation';
import EditContactForm from './components/EditContactForm';
import EditWorkExpForm from './components/EditWorkExpForm';
import EditSkillsForm from './components/EditSkillsForm';
import CustomizeForm from './components/CustomizeForm';

import { Box } from '@mui/system';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
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

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

const App = () => {
  async function saveResumeToFirestore(resumeObjectToSave) {
    if (signedIn) {
      try {
        const docData = {
          name: getUserName(),
          uid: getUserId(),
          timestamp: serverTimestamp(),
          resume: JSON.stringify(resumeObjectToSave),
        };

        await setDoc(doc(getFirestore(), 'users', getUserId()), docData);
      } catch (error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    }
  }

  async function loadResumeFromFirestore() {
    if (true) {
      try {
        const docRef = doc(getFirestore(), 'users', getUserId());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data().resume);
          setServerResume(JSON.parse(docSnap.data().resume));
        } else {
          console.log('DocSnap does not exist');
          setLoadingInProgress(false);
        }
      } catch (error) {
        console.error('Error loading from firestore', error);
      }
    }
  }

  const authStateObserver = (user) => {
    if (user) {
      // console.log(`${getAuth().currentUser.displayName} has signed in`);
      setLoadingInProgress(true);
      setSignedIn(true);
      setProfilePicUrl(getProfilePicUrl());
      setUserName(getUserName());
      setUserId(getUserId());
      loadResumeFromFirestore();
    } else {
      // console.log('User has signed out');
      setSignedIn(false);
      setProfilePicUrl('');
      setUserName('');
      setUserId('');
    }
  };

  const [serverResume, setServerResume] = useState(null);
  const { signIn, signOutUser, getProfilePicUrl, getUserName, getUserId } =
    useFirebase(authStateObserver);

  const [signedIn, setSignedIn] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const [loadingInProgress, setLoadingInProgress] = useState(false);

  const { resume, resumeDispatch } = useResume(
    saveResumeToFirestore,
    serverResume,
    loadingInProgress,
    setLoadingInProgress
  );
  const { saveItem: saveMode, retrieveItem: retrieveMode } =
    useLocalStorage('mode');

  const [mode, setMode] = useState(retrieveMode() ?? 'light');
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

  const [resumeTheme, setResumeTheme] = useState(generateTheme(resume._color));
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

  useEffect(() => {
    let newTheme = generateTheme(resume._color);
    setResumeTheme(newTheme);
  }, [resume]);

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
    resumeDispatch({ type: 'updateContactInformation', payload: info });
  };

  const updateWorkInfo = (info, edit) => {
    if (edit) {
      resumeDispatch({ type: 'editWorkInfo', payload: { info, idToPopulate } });
    } else {
      resumeDispatch({ type: 'addWorkInfo', payload: info });
    }
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

    resumeDispatch({ type: 'deleteWorkInfo', payload: deleteWorkKey });

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

    resumeDispatch({ type: 'deleteEducationInfo', payload: deleteEduKey });
    setIdToPopulate('');
    closeDeleteConfirmation();
  };

  const updateEducationInfo = (info, edit) => {
    if (edit) {
      resumeDispatch({
        type: 'editEducationInfo',
        payload: { info, idToPopulate },
      });
    } else {
      resumeDispatch({ type: 'addEducationInfo', payload: info });
    }

    setIdToPopulate('');
  };

  const updateSkills = (info) => {
    resumeDispatch({ type: 'updateSkills', payload: info });
  };

  const deleteSkill = (info) => (event) => {
    event.preventDefault();
    resumeDispatch({ type: 'deleteSkill', payload: info });
  };

  const updateColor = (info) => (event) => {
    resumeDispatch({ type: 'updateColor', payload: info });
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
    saveMode(newMode);
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
          signIn={signIn}
          signOut={signOutUser}
          signedIn={signedIn}
          profilePicUrl={profilePicUrl}
          userName={userName}
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
