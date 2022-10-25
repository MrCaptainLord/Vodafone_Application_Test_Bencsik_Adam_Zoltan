import { Box, makeStyles, TextField } from "@material-ui/core";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import { useHeader } from "../Layout/HeaderContext";
import { useState } from "react";

export type SearchFormValues = {
  searchParameter: string;
};

const useStyles = makeStyles({
  searchStyle: {
    height: 40,
    margin: "auto",
    width: "75%",
  },
  searchWrapper: { minWidth: 220 },
});

const SearchBar = () => {
  const classes = useStyles();
  const { setHeaderParam } = useHeader();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSearchValue, setCurrentSearchValue] = useState<string>("");

  const handleContactSearchChange = useDebouncedCallback((value: string) => {
    if (value.length >= 3 || value.length === 0) {
      setHeaderParam(value);
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, 500);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      className={classes.searchWrapper}
    >
      <TextField
        defaultValue=""
        onChange={(event) => setCurrentSearchValue(event.target.value)}
        onKeyDown={(keyEvent) => {
          if (keyEvent.key === "Enter") {
            handleContactSearchChange(currentSearchValue);
          }
        }}
        className={classes.searchStyle}
        placeholder={t("searchbar.innertext")?.toString()}
        InputLabelProps={{ shrink: false }}
      />
    </Box>
  );
};

export default SearchBar;
