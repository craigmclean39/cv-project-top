import React from "react";
import { Typography, Box } from "@mui/material";

export default class ContactField extends React.Component {
  render() {
    const { data } = this.props;
    const DisplayIcon = this.props.icon;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <DisplayIcon
          sx={{
            pr: 1,
          }}
          fontSize="10px"
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
  }
}
