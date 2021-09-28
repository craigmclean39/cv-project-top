import React from "react";
import { Card, Box } from "@mui/material";
import ResumeHeader from "./ResumeHeader";
import ResumeBody from "./ResumeBody";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResumeOutput = (props) => {
  const {
    resume,
    editWorkInfo,
    deleteWorkInfo,
    editEducationInfo,
    deleteEducationInfo,
  } = props;

  const mystyle = {
    width: "600px",
    height: "776px",
  };

  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Box
      sx={{
        width: "max(100%, max-content)",
        display: "flex",
        justifyContent: matches ? "center" : "flex-start",
      }}
    >
      <Card
        sx={{
          width: "600px",
          height: "776px",
          m: 2,
          mt: 10,
          flexShrink: 0,
        }}
        elevation={12}
      >
        <div className="resume-to-capture" style={mystyle}>
          <ResumeHeader contactInformation={resume._contactInformation} />
          <ResumeBody
            resume={resume}
            editWorkInfo={editWorkInfo}
            deleteWorkInfo={deleteWorkInfo}
            editEducationInfo={editEducationInfo}
            deleteEducationInfo={deleteEducationInfo}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ResumeOutput;
