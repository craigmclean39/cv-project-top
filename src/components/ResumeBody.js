import React from "react";
import { Box } from "@mui/material";
import ResumeWorkOverview from "./ResumeWorkOverview";
import ResumeContactInfo from "./ResumeContactInfo";

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
            width: "33%",
          }}
        >
          <ResumeContactInfo contactInformation={resume._contactInformation} />
        </Box>
        <ResumeWorkOverview workHistory={resume._workHistory} />
      </Box>
    );
  }
}
