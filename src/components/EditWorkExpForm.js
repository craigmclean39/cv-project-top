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

    //const { contactInformation } = this.props;
    this.saveFormInfo = this.saveFormInfo.bind(this);

    this.state = {
      /* name: contactInformation._firstName + " " + contactInformation._lastName,
      title: contactInformation._title,
      email: contactInformation._email,
      phone: contactInformation._phoneNumber,
      website: contactInformation._website,*/
      mode: "add",
      currentDate: Date.now(),
    };

    this.modes = {
      add: "Add Work Experience",
      edit: "Edit Work Experience",
    };
  }

  handleChange = (name) => (event) => {
    /* this.setState({
      ...this.state,
      [name]: event.target.value,
    }); */
  };

  handleDateChange = (newValue) => {
    this.setState({
      ...this.state,
      currentDate: newValue,
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
              margin="dense"
              id="title"
              label="Job Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue=""
              onChange={this.handleChange("name")}
            />
            <TextField
              margin="dense"
              id="company"
              label="Workplace/Company"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue=""
              onChange={this.handleChange("title")}
            />
            <Stack sx={{ my: 2 }} direction="row" spacing={2}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={this.state.currentDate}
                onChange={this.handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={this.state.currentDate}
                onChange={this.handleDateChange}
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
