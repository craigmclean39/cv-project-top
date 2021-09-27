import React from "react";
import { Card, Box } from "@mui/material";
import ResumeHeader from "./ResumeHeader";
import ResumeBody from "./ResumeBody";

const ResumeOutput = (props) => {
  const { resume, editWorkInfo, deleteWorkInfo } = props;

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
      <Card
        sx={{
          width: "600px",
          height: "776px",
          m: 2,
        }}
        elevation={12}
      >
        <div className="resume-to-capture" style={mystyle}>
          <ResumeHeader contactInformation={resume._contactInformation} />
          <ResumeBody
            resume={resume}
            editWorkInfo={editWorkInfo}
            deleteWorkInfo={deleteWorkInfo}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ResumeOutput;
