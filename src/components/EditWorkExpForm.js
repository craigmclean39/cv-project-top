import * as React from "react";
import {
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default class EditWorkExpForm extends React.Component {
  constructor(props) {
    super(props);

    this.saveFormInfo = this.saveFormInfo.bind(this);

    this.state = {
      mode: "add",
      currentDate: Date.now(),
      startDate: Date.now(),
      endDate: Date.now(),
      title: "",
      company: "",
      location: "",
    };

    this.modes = {
      add: "Add Work Experience",
      edit: "Edit Work Experience",
    };
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

  saveFormInfo() {
    const { updateWorkInfo, handleClose } = this.props;
    updateWorkInfo(this.state);
    handleClose();
  }

  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{this.modes[this.state.mode]}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="normal"
              id="title"
              label="Job Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue=""
              onChange={this.handleChange("title")}
            />
            <div>
              <Stack sx={{ my: 1 }} direction="row" spacing={2}>
                <TextField
                  id="company"
                  label="Workplace/Company"
                  type="text"
                  variant="outlined"
                  defaultValue=""
                  onChange={this.handleChange("company")}
                />
                <TextField
                  id="location"
                  label="Location"
                  type="text"
                  variant="outlined"
                  defaultValue=""
                  onChange={this.handleChange("location")}
                />
              </Stack>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={this.saveFormInfo}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
