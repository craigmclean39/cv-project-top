import { Box } from "@mui/system";
import { Button } from "@mui/material";

const AddDataButtons = (props) => {
  const { contactClick } = props;
  return (
    <Box>
      <Button variant="contained" onClick={contactClick}>
        Edit Contact Details
      </Button>
    </Box>
  );
};

export default AddDataButtons;
