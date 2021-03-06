import * as React from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';

const EditSkillsForm = (props) => {
  const { updateSkills, open, handleClose, skills, deleteSkill } = props;

  const saveFormInfo = (e) => {
    e.preventDefault();

    if (e.target[0].value !== '') {
      updateSkills(e.target[0].value);
    }

    e.target[0].value = '';
  };

  const skillChips = skills.map((value) => {
    return (
      <Chip
        sx={{ m: 0.5 }}
        label={value._skill}
        key={value._id}
        size='small'
        color='primary'
        onDelete={deleteSkill(value._id)}
      />
    );
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Skills</DialogTitle>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <DialogContent>
          {skillChips}
          <form onSubmit={saveFormInfo}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                sx={{ mr: 1 }}
                autoFocus
                margin='normal'
                id='title'
                label='New Skill'
                type='text'
                fullWidth
                variant='outlined'
                defaultValue=''
              />
              <div>
                <IconButton
                  sx={{ flexGrow: 0 }}
                  aria-label='add skill'
                  type='submit'>
                  <AddBoxIcon />
                </IconButton>
              </div>
            </Box>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default EditSkillsForm;
