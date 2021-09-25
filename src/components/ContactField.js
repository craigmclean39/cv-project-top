import React from "react";
import { Typography, Box } from "@mui/material";

const ContactField = (props) => {
  const { data } = props;
  const DisplayIcon = props.icon;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        flexWrap: "wrap",
      }}
    >
      <DisplayIcon
        sx={{
          pr: 1,
        }}
        color="primary"
      />
      <Typography
        sx={{
          fontSize: "12px",
          mb: "3px",
        }}
      >
        {data}
      </Typography>
    </Box>
  );
};

export default ContactField;
