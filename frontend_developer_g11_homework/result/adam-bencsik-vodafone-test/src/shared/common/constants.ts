import { createTheme } from "@material-ui/core";

export const SERVER_ADDRESS = "https://randomuser.me/api";

const DEFAULT_COLORS = {
  main: "#5e2750",
  mainLight: "#e60000",
  mainGrey: "#E5F4FA",
  red: "#BA3727",
  white: "#FFFFFF",
  shadowLight: "rgba(0, 0, 0, 0.04)",
  lightGrey: "#959595",
};

export const COLORS = DEFAULT_COLORS;

export const BOX_SHADOW = `4px 4px 8px ${COLORS.shadowLight}`;

export const EXCLUDED_ROUTE_HEADER_TITLES = [
  "route.contact",
  "route.contract-modfiy",
  "route.contract-add",
];

export const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.mainLight,
    },
    secondary: {
      main: COLORS.lightGrey,
    },
    error: {
      main: COLORS.red,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        a: {
          color: COLORS.main,
        },
        svg: {
          color: COLORS.mainLight,
        },
      },
    },
    MuiFormControlLabel: {
      labelPlacementStart: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiSvgIcon: {
      root: {
        backgroundColor: COLORS.mainLight,
        color: COLORS.mainLight,
      },
      colorPrimary: {
        backgroundColor: COLORS.mainLight,
        color: COLORS.mainLight,
      },
    },
    MuiFormLabel: {
      root: {
        "&.Mui-focused": {
          color: COLORS.lightGrey,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 4,
        padding: 0,
        height: "2.5rem",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 4,
      },
    },
    MuiButton: {
      root: {
        boxShadow: "unset",
        minWidth: "max-content",
        borderRadius: 4,
        textTransform: "none",
        fontWeight: 550,
      },
      label: {
        whiteSpace: "nowrap",
      },
    },
    MuiCard: {
      root: {
        boxShadow: BOX_SHADOW,
        border: `1px solid ${COLORS.mainGrey}`,
      },
    },
  },
  props: {
    MuiTextField: {
      margin: "none",
      fullWidth: true,
      variant: "outlined",
      size: "small",
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
    MuiIconButton: {
      color: "primary",
    },
    MuiSvgIcon: {
      color: "inherit",
    },
  },
});

export default theme;
