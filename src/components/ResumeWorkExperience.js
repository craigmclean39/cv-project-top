import React from "react";
import { Typography, Box, List, ListItem } from "@mui/material";

const ResumeWorkExperience = (props) => {
  const { workExperience } = props;

  const descriptions = workExperience._description.map((value) => {
    return (
      <ListItem>
        <Typography
          sx={{
            m: -0.5,
          }}
          variant="caption"
        >
          {value}
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
      <Typography variant="subtitle2">{workExperience._jobTitle}</Typography>
      <Typography variant="caption">{workExperience._orgName}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">{`${workExperience._startDate} - ${workExperience._endDate}`}</Typography>
        <Typography variant="caption">{workExperience._location}</Typography>
      </Box>
      <List dense>{descriptions}</List>
    </Box>
  );
};

export default ResumeWorkExperience;
