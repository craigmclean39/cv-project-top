import React from "react";
import { Paper } from "@mui/material";
import ResumeHeader from "./ResumeHeader";

export default class ResumeOutput extends React.Component {
  render() {
    const { contactInformation } = this.props;

    return (
      <Paper
        sx={{
          width: "600px",
          height: "776px",
        }}
        elevation={12}
        classes
      >
        <ResumeHeader contactInformation={contactInformation} />
      </Paper>
    );
  }
}
