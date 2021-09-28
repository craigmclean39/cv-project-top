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

export default class EditWorkExpForm extends React.Component {
  constructor(props) {
    super(props);

    this.saveFormInfo = this.saveFormInfo.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
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

    this.defaultValues = {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: Date.now(),
      endDate: Date.now(),
    };
  }

  resetState() {
    this.setState({
      currentDate: Date.now(),
      startDate: Date.now(),
      endDate: Date.now(),
      title: "",
      company: "",
      location: "",
      description: "",
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
    const { updateWorkInfo, handleClose, updateEducationInfo, workMode, mode } =
      this.props;

    if (mode === "add") {
      workMode === "work"
        ? updateWorkInfo(this.state, false)
        : updateEducationInfo(this.state, false);
    } else if (mode === "edit") {
      workMode === "work"
        ? updateWorkInfo(this.state, true)
        : updateEducationInfo(this.state, true);
    }

    this.resetState();
    handleClose();
  }

  // The purpose of this is to add to the state of the component those fields that are reloaded on an Edit action
  // When the user clicks edit, we fill the defaultValues with information from the entry they wish to edit, however
  // this was not actually updating the state, so if the user clicked edit, and then didn't modify any of the entries,
  // handleChange wasn't going to be called to update the state, and thus the data sent up to the app, this function
  // alleviates that issue
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.idToPopulate !== this.props.idToPopulate &&
      this.props.idToPopulate !== ""
    ) {
      this.setState({
        title: this.defaultValues["title"],
        company: this.defaultValues["company"],
        location: this.defaultValues["location"],
        description: this.defaultValues["description"],
        startDate: this.defaultValues["startDate"],
        endDate: this.defaultValues["endDate"],
      });
    } else if (
      prevProps.idToPopulate !== this.props.idToPopulate &&
      this.props.idToPopulate === ""
    ) {
      //there is now no idToPopulate, so clear defaults
      this.defaultValues = {
        title: "",
        company: "",
        location: "",
        description: "",
        startDate: Date.now(),
        endDate: Date.now(),
      };
      this.setState({
        title: this.defaultValues["title"],
        company: this.defaultValues["company"],
        location: this.defaultValues["location"],
        description: this.defaultValues["description"],
        startDate: this.defaultValues["startDate"],
        endDate: this.defaultValues["endDate"],
      });
    }
  }

  getDateFromString(str) {
    const year = str.match(/^\d{4}/);
    const month = str.match(/\d{2}$/);

    return new Date(Number(year), Number(month) - 1);
  }

  render() {
    const {
      open,
      handleClose,
      workMode,
      idToPopulate,
      mode,
      workHistory,
      educationHistory,
    } = this.props;

    if (idToPopulate !== "") {
      if (workMode === "work") {
        const workEntry = workHistory.filter((element) => {
          if (element._id === idToPopulate) {
            return true;
          }
          return false;
        });

        this.defaultValues["title"] = workEntry[0]._jobTitle;
        this.defaultValues["company"] = workEntry[0]._orgName;
        this.defaultValues["location"] = workEntry[0]._location;
        this.defaultValues["description"] = workEntry[0]._description;

        const sDate = this.getDateFromString(workEntry[0]._startDate);
        const eDate = this.getDateFromString(workEntry[0]._endDate);
        this.defaultValues["startDate"] = sDate;
        this.defaultValues["endDate"] = eDate;
      } else if (workMode === "education") {
        const educationEntry = educationHistory.filter((element) => {
          if (element._id === idToPopulate) {
            return true;
          }
          return false;
        });

        this.defaultValues["title"] = educationEntry[0]._educationTitle;
        this.defaultValues["company"] = educationEntry[0]._orgName;
        this.defaultValues["location"] = educationEntry[0]._location;
        this.defaultValues["description"] = educationEntry[0]._description;
        const sDate = this.getDateFromString(educationEntry[0]._startDate);
        const eDate = this.getDateFromString(educationEntry[0]._endDate);
        this.defaultValues["startDate"] = sDate;
        this.defaultValues["endDate"] = eDate;
      }
    }

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{this.modes[workMode][mode]}</DialogTitle>
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
              defaultValue={this.defaultValues["title"]}
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
                  defaultValue={this.defaultValues["company"]}
                  onChange={this.handleChange("company")}
                />
                <TextField
                  sx={{ flexGrow: 1, ml: 1 }}
                  id="location"
                  label="Location"
                  type="text"
                  variant="outlined"
                  defaultValue={this.defaultValues["location"]}
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
            <TextField
              margin="normal"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={this.defaultValues["description"]}
              onChange={this.handleChange("description")}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={this.saveFormInfo}>
                {idToPopulate !== "" ? "Edit" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}
