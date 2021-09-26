import React from "react";
import ResumeWorkExperience from "./ResumeWorkExperience";
import { Typography, Box } from "@mui/material";

const ResumeWorkOverview = (props) => {
  const { workHistory } = props;

  const workExperiences = workHistory.map((value) => {
    return <ResumeWorkExperience workExperience={value} key={value._id} />;
  });

  return (
    <Box
      sx={{
        width: "100%",
        ml: 1,
        mt: 1,
      }}
    >
      <Typography variant="button" component="h3" color="info.dark">
        Work Experience
      </Typography>
      <Box
        sx={{
          boxSizing: "border-box",
          mx: 1,
          height: "3px",
          borderRadius: "3px",
          bgcolor: "primary.dark",
        }}
      ></Box>
      {workExperiences}
    </Box>
  );
};

export default ResumeWorkOverview;
