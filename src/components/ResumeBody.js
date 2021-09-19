import React from "react";
import { Box } from "@mui/material";
import ResumeWorkOverview from "./ResumeWorkOverview";

export default class ResumeBody extends React.Component {
  render() {
    const { resume } = this.props;

    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          //bgcolor: "primary.dark",
        }}
      >
        <Box
          sx={{
            width: "33%",
            bgcolor: "primary.dark",
          }}
        ></Box>
        <ResumeWorkOverview workHistory={resume._workHistory} />
      </Box>
    );
  }
}
