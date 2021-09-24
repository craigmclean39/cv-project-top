import React from "react";
import { Box, Stack } from "@mui/material";
import ResumeWorkOverview from "./ResumeWorkOverview";
import ResumeContactInfo from "./ResumeContactInfo";
import ResumeSkills from "./ResumeSkills";
import ResumeEducationOverview from "./ResumeEducationOverview";

const ResumeBody = (props) => {
  const { resume } = props;

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
      <Stack
        sx={{
          boxSizing: "border-box",
          width: "66%",
        }}
      >
        <ResumeWorkOverview workHistory={resume._workHistory} />
        <ResumeEducationOverview educationHistory={resume._educationHistory} />
      </Stack>
    </Box>
  );
};

export default ResumeBody;
