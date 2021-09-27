import React from "react";
import ResumeWorkExperience from "./ResumeWorkExperience";
import { Typography, Box } from "@mui/material";

const ResumeWorkOverview = (props) => {
  const { workHistory, editWorkInfo, deleteWorkInfo } = props;

  const workExperiences = workHistory.map((value) => {
    return (
      <ResumeWorkExperience
        workExperience={value}
        key={value._id}
        editWorkInfo={editWorkInfo}
        deleteWorkInfo={deleteWorkInfo}
      />
    );
  });

  if (workHistory.length > 0) {
    return (
      <Box
        sx={{
          width: "100%",
          ml: 1,
          mt: 1,
        }}
      >
        <Typography variant="button" component="h3">
          Work Experience
        </Typography>
        {workExperiences}
      </Box>
    );
  }
  return null;
};

export default ResumeWorkOverview;
