import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default class EditContactForm extends React.Component {
  state = {
    name: "",
    title: "",
    email: "",
    phone: "",
    website: "",
  };

  constructor(props) {
    super(props);
    this.saveFormInfo = this.saveFormInfo.bind(this);
  }

  handleChange = (name) => (event) => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  saveFormInfo() {
    const { updateContactInfo } = this.props;
    console.log(this.state);
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
              value={
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
              value={contactInformation._title}
              onChange={this.handleChange("title")}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={contactInformation._email}
              onChange={this.handleChange("email")}
            />
            <TextField
              margin="dense"
              id="phone-number"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              value={contactInformation._phoneNumber}
              onChange={this.handleChange("phone")}
            />
            <TextField
              margin="dense"
              id="website"
              label="Website"
              type="text"
              fullWidth
              variant="outlined"
              value={contactInformation._website}
              onChange={this.handleChange("website")}
            />
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
