import React from "react";
import ResumeEducationExperience from "./ResumeEducationExperience";
import { Typography, Box } from "@mui/material";

const ResumeEducationOverview = (props) => {
  const { educationHistory } = props;

  const educationExperiences = educationHistory.map((value) => {
    return (
      <ResumeEducationExperience educationExperience={value} key={value._id} />
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        ml: 1,
        mt: 1,
      }}
    >
      <Typography variant="button" component="h3">
        Education
      </Typography>
      {educationExperiences}
    </Box>
  );
};

export default ResumeEducationOverview;
