import * as React from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useState, useEffect } from 'react';

const EditWorkExpForm = (props) => {
  const {
    open,
    handleClose,
    workMode,
    idToPopulate,
    mode,
    workHistory,
    educationHistory,
  } = props;

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const modes = {
    work: {
      add: 'Add Work Experience',
      edit: 'Edit Work Experience',
      title: 'Job Title',
      company: 'Workplace/Company',
    },
    education: {
      add: 'Add Education',
      edit: 'Edit Education',
      title: 'Education Program',
      company: 'University/College',
    },
  };

  const resetState = () => {
    setStartDate(Date.now());
    setEndDate(Date.now());
    setTitle('');
    setCompany('');
    setLocation('');
    setDescription('');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const saveFormInfo = (e) => {
    e.preventDefault();
    const { updateWorkInfo, handleClose, updateEducationInfo, workMode, mode } =
      props;

    const info = { title, company, location, startDate, endDate, description };

    if (mode === 'add') {
      workMode === 'work'
        ? updateWorkInfo(info, false)
        : updateEducationInfo(info, false);
    } else if (mode === 'edit') {
      workMode === 'work'
        ? updateWorkInfo(info, true)
        : updateEducationInfo(info, true);
    }

    resetState();
    handleClose();
  };

  const getDateFromString = (str) => {
    const year = str.match(/^\d{4}/);
    const month = str.match(/\d{2}$/);

    return new Date(Number(year), Number(month) - 1);
  };

  useEffect(() => {
    if (idToPopulate !== '') {
      if (workMode === 'work') {
        const workEntry = workHistory.filter((element) => {
          if (element._id === idToPopulate) {
            return true;
          }
          return false;
        });

        setTitle(workEntry[0]._jobTitle);
        setCompany(workEntry[0]._orgName);
        setLocation(workEntry[0]._location);
        setDescription(workEntry[0]._description);

        const sDate = getDateFromString(workEntry[0]._startDate);
        const eDate = getDateFromString(workEntry[0]._endDate);
        setStartDate(sDate);
        setEndDate(eDate);
      } else if (workMode === 'education') {
        const educationEntry = educationHistory.filter((element) => {
          if (element._id === idToPopulate) {
            return true;
          }
          return false;
        });

        setTitle(educationEntry[0]._educationTitle);
        setCompany(educationEntry[0]._orgName);
        setLocation(educationEntry[0]._location);
        setDescription(educationEntry[0]._description);
        const sDate = getDateFromString(educationEntry[0]._startDate);
        const eDate = getDateFromString(educationEntry[0]._endDate);
        setStartDate(sDate);
        setEndDate(eDate);
      }
    }
  }, [educationHistory, idToPopulate, workHistory, workMode]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{modes[workMode][mode]}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin='normal'
            id='title'
            label={modes[workMode]['title']}
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={title}
            onChange={handleTitleChange}
          />
          <div>
            <Box
              sx={{
                my: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <TextField
                sx={{ flexGrow: 1, mr: 1 }}
                id='company'
                label={modes[workMode]['company']}
                type='text'
                variant='outlined'
                defaultValue={company}
                onChange={handleCompanyChange}
              />
              <TextField
                sx={{ flexGrow: 1, ml: 1 }}
                id='location'
                label='Location'
                type='text'
                variant='outlined'
                defaultValue={location}
                onChange={handleLocationChange}
              />
            </Box>
          </div>
          <Stack sx={{ my: 2 }} direction='row' spacing={2}>
            <DesktopDatePicker
              views={['year', 'month']}
              label='Start Date'
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              views={['year', 'month']}
              label='End Date'
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <TextField
            margin='normal'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={description}
            onChange={handleDescriptionChange}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={saveFormInfo}>
              {idToPopulate !== '' ? 'Edit' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkExpForm;
