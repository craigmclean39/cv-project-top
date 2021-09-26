import React from "react";
import { Typography, Box } from "@mui/material";

const ResumeWorkExperience = (props) => {
  const { workExperience } = props;

  return (
    <Box
      sx={{
        m: 2,
        mt: 0,
      }}
    >
      <Typography variant="subtitle2" color="info.dark" sx={{ mb: -0.5 }}>
        {workExperience._jobTitle}
      </Typography>
      <Typography variant="caption">{workExperience._orgName}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">{`${workExperience.startDate} - ${workExperience.endDate}`}</Typography>
        <Typography variant="caption">{workExperience._location}</Typography>
      </Box>
      <Typography
        sx={{
          m: -0.5,
        }}
        variant="caption"
      >
        {workExperience._description}
      </Typography>
    </Box>
  );
};

export default ResumeWorkExperience;
