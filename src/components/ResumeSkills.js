import React from "react";
import { Chip, Box, Typography } from "@mui/material";

export default class ResumeSkills extends React.Component {
  render() {
    const { skills } = this.props;

    const mySkills = skills.map((value) => {
      return <Chip sx={{ m: 0 }} label={value} size="small" color="primary" />;
    });

    return (
      <Box
        sx={{
          boxSizing: "border-box",
          m: 1,
        }}
      >
        <Typography variant="button" variantMapping="h4">
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
}
