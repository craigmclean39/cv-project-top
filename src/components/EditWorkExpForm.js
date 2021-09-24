import * as React from "react";
import {
  Box,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import uniqid from "uniqid";

export default class EditWorkExpForm extends React.Component {
  constructor(props) {
    super(props);

    this.saveFormInfo = this.saveFormInfo.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      mode: "add",
      currentDate: Date.now(),
      startDate: Date.now(),
      endDate: Date.now(),
      title: "",
      company: "",
      location: "",
      description: [""],
    };

    this.modes = {
      work: {
        add: "Add Work Experience",
        edit: "Edit Work Experience",
        title: "Job Title",
        company: "Workplace/Company",
      },
      education: {
        add: "Add Education",
        edit: "Edit Education",
        title: "Education Program",
        company: "University/College",
      },
    };
  }

  resetState() {
    this.setState({
      mode: "add",
      currentDate: Date.now(),
      startDate: Date.now(),
      endDate: Date.now(),
      title: "",
      company: "",
      location: "",
      description: [""],
    });
  }

  handleChange = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  handleStartDateChange = (newValue) => {
    this.setState({
      ...this.state,
      startDate: newValue,
    });
  };

  handleEndDateChange = (newValue) => {
    this.setState({
      ...this.state,
      endDate: newValue,
    });
  };

  saveFormInfo(e) {
    e.preventDefault();
    const { updateWorkInfo, handleClose, updateEducationInfo, workMode } =
      this.props;

    workMode === "work"
      ? updateWorkInfo(this.state)
      : updateEducationInfo(this.state);
    this.resetState();
    handleClose();
  }

  render() {
    const { open, handleClose, workMode } = this.props;

    let descriptions = this.state.description.map((value) => {
      return (
        <TextField
          margin="normal"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue=""
          key={uniqid()}
          onChange={this.handleChange("description")}
        />
      );
    });

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{this.modes[workMode][this.state.mode]}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="normal"
              id="title"
              label={this.modes[workMode]["title"]}
              type="text"
              fullWidth
              variant="outlined"
              defaultValue=""
              onChange={this.handleChange("title")}
            />
            <div>
              <Box
                sx={{
                  my: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ flexGrow: 1, mr: 1 }}
                  id="company"
                  label={this.modes[workMode]["company"]}
                  type="text"
                  variant="outlined"
                  defaultValue=""
                  onChange={this.handleChange("company")}
                />
                <TextField
                  sx={{ flexGrow: 1, ml: 1 }}
                  id="location"
                  label="Location"
                  type="text"
                  variant="outlined"
                  defaultValue=""
                  onChange={this.handleChange("location")}
                />
              </Box>
            </div>
            <Stack sx={{ my: 2 }} direction="row" spacing={2}>
              <DesktopDatePicker
                views={["year", "month"]}
                label="Start Date"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                views={["year", "month"]}
                label="End Date"
                value={this.state.endDate}
                onChange={this.handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
            {descriptions}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={this.saveFormInfo}>
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}
