import * as React from "react";
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
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";

export default class EditSkillsForm extends React.Component {
  constructor(props) {
    super(props);

    this.saveFormInfo = this.saveFormInfo.bind(this);
  }

  saveFormInfo(e) {
    e.preventDefault();
    const { updateSkills } = this.props;
    if (e.target[0].value !== "") {
      updateSkills(e.target[0].value);
    }

    e.target[0].value = "";
  }

  handleChange(e) {
    // console.log(e.target.value);
  }

  render() {
    const { open, handleClose, skills } = this.props;

    const skillChips = skills.map((value) => {
      return (
        <Chip
          sx={{ m: 0.5 }}
          label={value.skill}
          key={value.id}
          size="small"
          color="primary"
        />
      );
    });

    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Skills</DialogTitle>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <DialogContent>
            {skillChips}
            <form onSubmit={this.saveFormInfo}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  sx={{ mr: 1 }}
                  autoFocus
                  margin="normal"
                  id="title"
                  label="New Skill"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                  onChange={this.handleChange}
                />
                <div>
                  <IconButton
                    sx={{ flexGrow: 0 }}
                    aria-label="add skill"
                    type="submit"
                  >
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
  }
}
