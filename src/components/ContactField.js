import React from "react";
import { Typography, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const ContactField = (props) => {
  const { data } = props;
  const DisplayIcon = props.icon;
  const isLarge = useMediaQuery("(min-width:600px)");

  const lineHeight = isLarge ? "24px" : "12px";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        flexWrap: "wrap",
        lineHeight: lineHeight,
      }}
    >
      <DisplayIcon
        sx={{
          pr: isLarge ? 1 : 0.5,
          fontSize: isLarge ? "24px" : "12px",
        }}
        color="primary"
      />
      <Typography variant="caption">{data}</Typography>
    </Box>
  );
};

export default ContactField;
