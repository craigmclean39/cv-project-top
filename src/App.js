import React, { useState, useRef, useEffect } from 'react';

import generateTheme from './theme';
import { useResume } from './hooks/useResume';
import { useLocalStorage } from './hooks/useLocalStorage';

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

// FIREBASE
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAM0Q-A-Y9SyIC3tP8_1edQTxQF9C6cKf4',
  authDomain: 'resume-creator-3ef3e.firebaseapp.com',
  projectId: 'resume-creator-3ef3e',
  storageBucket: 'resume-creator-3ef3e.appspot.com',
  messagingSenderId: '91020095700',
  appId: '1:91020095700:web:484ab557ad398553618b41',
};

const initFirebaseAuth = (authStateObserver) => {
  onAuthStateChanged(getAuth(), authStateObserver);
};

const useFirebase = (authStateObserverCallback) => {
  const authStateObserver = useRef(authStateObserverCallback);

  useEffect(() => {
    initializeApp(firebaseConfig);
    initFirebaseAuth(authStateObserver.current);
  }, []);

  async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  const signOutUser = () => {
    signOut(getAuth());
  };

  const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL;
  };

  const getUserName = () => {
    return getAuth().currentUser.displayName;
  };

  return {
    signIn,
    signOutUser,
    getProfilePicUrl,
    getUserName,
  };
};

const App = () => {
  const authStateObserver = (user) => {
    if (user) {
      console.log(`${getAuth().currentUser.displayName} has signed in`);
      setSignedIn(true);
      setProfilePicUrl(getProfilePicUrl());
      setUserName(getUserName());
    } else {
      console.log('User has signed out');
      setSignedIn(false);
      setProfilePicUrl('');
      setUserName('');
    }
  };

  const { signIn, signOutUser, getProfilePicUrl, getUserName } =
    useFirebase(authStateObserver);

  const [signedIn, setSignedIn] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [userName, setUserName] = useState('');

  const { resume, resumeDispatch } = useResume();
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
