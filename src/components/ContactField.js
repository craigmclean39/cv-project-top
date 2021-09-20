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
        }}
        gutterBottom
      >
        {data}
      </Typography>
    </Box>
  );
};

export default ContactField;