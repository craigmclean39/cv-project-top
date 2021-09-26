import React from "react";
import { Chip, Box, Typography } from "@mui/material";

const ResumeSkills = (props) => {
  const { skills } = props;

  const mySkills = skills.map((value) => {
    return (
      <Chip
        sx={{ m: 0 }}
        label={value.skill}
        key={value.id}
        size="small"
        color="primary"
      />
    );
  });

  if (mySkills.length > 0) {
    return (
      <Box
        sx={{
          boxSizing: "border-box",
          m: 1,
        }}
      >
        <Typography variant="button" component="h4">
          Skills
        </Typography>
        <Box
          sx={{
            boxSizing: "border-box",
            m: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "2px",
            rowGap: "10px",
          }}
        >
          {mySkills}
        </Box>
      </Box>
    );
  }
  return null;
};

export default ResumeSkills;
