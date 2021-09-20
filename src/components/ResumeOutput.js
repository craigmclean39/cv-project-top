import React from "react";
import { Paper, Box } from "@mui/material";
import ResumeHeader from "./ResumeHeader";
import ResumeBody from "./ResumeBody";

const ResumeOutput = (props) => {
  const { resume } = props;

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
          bgcolor: "background.paper",
        }}
        elevation={12}
        classes
      >
        <ResumeHeader contactInformation={resume._contactInformation} />
        <ResumeBody resume={resume} />
      </Paper>
    </Box>
  );
};

export default ResumeOutput;
