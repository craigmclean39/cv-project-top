import React from "react";
import { Paper, Box } from "@mui/material";
import ResumeHeader from "./ResumeHeader";
import ResumeBody from "./ResumeBody";

const ResumeOutput = (props) => {
  const { resume } = props;

  const mystyle = {
    width: "600px",
    height: "776px",
  };

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
      >
        <div class="resume-to-capture" style={mystyle}>
          <ResumeHeader contactInformation={resume._contactInformation} />
          <ResumeBody resume={resume} />
        </div>
      </Paper>
    </Box>
  );
};

export default ResumeOutput;
