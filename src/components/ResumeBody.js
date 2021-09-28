import React from "react";
import { Box, Stack } from "@mui/material";
import ResumeWorkOverview from "./ResumeWorkOverview";
import ResumeContactInfo from "./ResumeContactInfo";
import ResumeSkills from "./ResumeSkills";
import ResumeEducationOverview from "./ResumeEducationOverview";

const ResumeBody = (props) => {
  const {
    resume,
    editWorkInfo,
    deleteWorkInfo,
    editEducationInfo,
    deleteEducationInfo,
  } = props;

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
          overflow: "hidden",
        }}
      >
        <ResumeContactInfo contactInformation={resume._contactInformation} />
        <ResumeSkills skills={resume._skills} />
      </Box>
      <Stack
        sx={{
          boxSizing: "border-box",
          width: "66%",
        }}
      >
        <ResumeWorkOverview
          workHistory={resume._workHistory}
          editWorkInfo={editWorkInfo}
          deleteWorkInfo={deleteWorkInfo}
        />
        <ResumeEducationOverview
          educationHistory={resume._educationHistory}
          editEducationInfo={editEducationInfo}
          deleteEducationInfo={deleteEducationInfo}
        />
      </Stack>
    </Box>
  );
};

export default ResumeBody;
