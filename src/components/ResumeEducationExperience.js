import React from "react";
import { Typography, Box, List, ListItem } from "@mui/material";

const ResumeEducationExperience = (props) => {
  const { educationExperience } = props;

  const descriptions = educationExperience._description.map((value) => {
    return (
      <ListItem key={value.id}>
        <Typography
          sx={{
            m: -0.5,
          }}
          variant="caption"
        >
          {value.description}
        </Typography>
      </ListItem>
    );
  });

  return (
    <Box
      sx={{
        m: 2,
        mt: 0,
      }}
    >
      <Typography variant="subtitle2">
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
      </Box>
      <List dense>{descriptions}</List>
    </Box>
  );
};

export default ResumeEducationExperience;
