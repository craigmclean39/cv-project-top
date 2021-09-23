import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { validate } from "email-validator";

export default class EditContactForm extends React.Component {
  constructor(props) {
    super(props);

    const { contactInformation } = this.props;
    this.saveFormInfo = this.saveFormInfo.bind(this);

    this.state = {
      name: contactInformation._firstName + " " + contactInformation._lastName,
      title: contactInformation._title,
      email: contactInformation._email,
      phone: contactInformation._phoneNumber,
      website: contactInformation._website,
      phoneError: false,
      phoneHelperText: "",
      phoneColor: "",
      emailError: false,
      emailHelperText: "",
      emailColor: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  validatePhoneNumber = (name) => (event) => {
    const phoneRegex =
      /^\(?\d{3}\)?(\s*)?-?(\s*)?\d{3}(\s*)?-?(\s*)?(\s*)?\d{4}$/;
    if (!event.target.value.match(phoneRegex) && event.target.value !== "") {
      this.setState({
        phoneError: true,
        phoneHelperText: "Enter 10 digit Phone Number, ###-###-####",
      });
    } else {
      this.setState({
        ...this.state,
        [name]: event.target.value,
        phoneError: false,
        phoneHelperText: "",
        phoneColor: "success",
      });
    }
  };

  validateEmail = (name) => (event) => {
    if (!validate(event.target.value) && event.target.value !== "") {
      this.setState({
        emailError: true,
        emailHelperText: "Enter valid email address",
      });
    } else {
      this.setState({
        ...this.state,
        [name]: event.target.value,
        emailError: false,
        emailHelperText: "",
        emailColor: "success",
      });
    }
  };

  saveFormInfo(e) {
    e.preventDefault();
    const { updateContactInfo } = this.props;
    updateContactInfo(this.state);
    this.props.handleClose();
  }

  render() {
    const { open, handleClose, contactInformation } = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Contact Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={
                contactInformation._firstName +
                " " +
                contactInformation._lastName
              }
              onChange={this.handleChange("name")}
            />
            <TextField
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contactInformation._title}
              onChange={this.handleChange("title")}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              defaultValue={contactInformation._email}
              onChange={this.validateEmail("email")}
              error={this.state.emailError}
              helperText={this.state.emailHelperText}
              color={this.state.emailColor}
            />
            <TextField
              margin="dense"
              id="phone-number"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contactInformation._phoneNumber}
              onChange={this.validatePhoneNumber("phone")}
              error={this.state.phoneError}
              helperText={this.state.phoneHelperText}
              color={this.state.phoneColor}
            />
            <TextField
              margin="dense"
              id="website"
              label="Website"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contactInformation._website}
              onChange={this.handleChange("website")}
            />

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
