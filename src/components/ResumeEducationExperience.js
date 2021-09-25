import React from "react";
import { Typography, Box } from "@mui/material";

const ResumeEducationExperience = (props) => {
  const { educationExperience } = props;

  return (
    <Box
      sx={{
        m: 2,
        mt: 0,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: -0.5 }}>
        {educationExperience._educationTitle}
      </Typography>
      <Typography variant="caption">{educationExperience._orgName}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">{`${educationExperience.startDate} - ${educationExperience.endDate}`}</Typography>
        <Typography variant="caption">
          {educationExperience._location}
        </Typography>
        <Typography variant="caption">
          {educationExperience._description}
        </Typography>
      </Box>
      <Typography
        sx={{
          m: -0.5,
        }}
        variant="caption"
      >
        {educationExperience._description}
      </Typography>
    </Box>
  );
};

export default ResumeEducationExperience;
