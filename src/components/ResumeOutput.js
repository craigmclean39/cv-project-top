import React from "react";
import { Paper, Box } from "@mui/material";
import ResumeHeader from "./ResumeHeader";
import ResumeWorkOverview from "./ResumeWorkOverview";
import ResumeBody from "./ResumeBody";

export default class ResumeOutput extends React.Component {
  render() {
    const { resume } = this.props;

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "600px",
            height: "776px",
            m: 2,
          }}
          elevation={12}
          classes
        >
          <ResumeHeader contactInformation={resume._contactInformation} />
          <ResumeBody resume={resume} />
        </Paper>
      </Box>
    );
  }
}
