import React from "react";
import { Box } from "@mui/material";
import ResumeWorkOverview from "./ResumeWorkOverview";
import ResumeContactInfo from "./ResumeContactInfo";
import ResumeSkills from "./ResumeSkills";

export default class ResumeBody extends React.Component {
  render() {
    const { resume } = this.props;

    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          sx={{
            boxSizing: "border-box",
            width: "33%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ResumeContactInfo contactInformation={resume._contactInformation} />
          <ResumeSkills skills={resume._skills._skills} />
        </Box>
        <ResumeWorkOverview workHistory={resume._workHistory} />
      </Box>
    );
  }
}
