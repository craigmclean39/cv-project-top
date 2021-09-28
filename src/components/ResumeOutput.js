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

  const isLarge = useMediaQuery("(min-width:600px)");

  const mystyle = {
    width: isLarge ? "600px" : "300px",
    height: isLarge ? "776px" : "388px",
  };

  return (
    <Box
      sx={{
        width: "max(100%, max-content)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: isLarge ? "600px" : "300px",
          height: isLarge ? "776px" : "388px",
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
