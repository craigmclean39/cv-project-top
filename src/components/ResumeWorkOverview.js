import React from "react";
import ResumeWorkExperience from "./ResumeWorkExperience";
import { Typography, Box } from "@mui/material";

export default class ResumeWorkOverview extends React.Component {
  render() {
    const { workHistory } = this.props;

    const workExperiences = workHistory.map((value) => {
      return <ResumeWorkExperience workExperience={value} />;
    });

    return (
      <Box
        sx={{
          width: "100%",
          ml: 1,
        }}
      >
        <Typography variant="button" variantMapping="h3">
          Work Experience
        </Typography>
        {workExperiences}
      </Box>
    );
  }
}
