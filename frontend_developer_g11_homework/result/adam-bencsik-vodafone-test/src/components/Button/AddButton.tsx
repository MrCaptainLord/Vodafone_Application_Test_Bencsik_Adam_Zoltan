import { Box, Button } from "@material-ui/core";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { COLORS } from "../../shared/common/constants";

const AddButton = () => {
  return (
    <Box
      style={{
        marginLeft: "auto",
        width: 60,
        marginRight: 15,
        marginBottom: 15,
      }}
      key="addFooterButton"
    >
      <Button
        style={{
          backgroundColor: COLORS.mainLight,
          width: "100%",
          height: "100%",
          padding: 0,
          minWidth: 0,
          borderRadius: 999,
          color: COLORS.white,
          pointerEvents: "initial",
        }}
        component={Link}
        to="/contact-add"
      >
        <Add />
      </Button>
    </Box>
  );
};

export default AddButton;
