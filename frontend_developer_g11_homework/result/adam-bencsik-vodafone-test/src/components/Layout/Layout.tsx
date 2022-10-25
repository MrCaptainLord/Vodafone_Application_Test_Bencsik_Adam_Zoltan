import {
  Box,
  CircularProgress,
  Fade,
  Grid,
  Grow,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  COLORS,
  EXCLUDED_ROUTE_HEADER_TITLES,
} from "../../shared/common/constants";
import VodafoneLogo from "../../shared/svg/logo.svg";
import SearchBar from "../Search/SearchBar";
import { useHeader } from "./HeaderContext";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./LayoutStyles.css";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles(
  {
    pageWrapper: {
      height: "100%",
    },
    content: {
      overflow: "clip",
    },
    logo: {
      width: "100%",
      maxWidth: "198.182px",
      aspectRatio: 198.182 / 52.457,
    },
    header: {
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "calc(100% - 20px)",
      zIndex: 999,
      backgroundColor: "#ffffff !important",
      paddingTop: "10px",
      paddingLeft: "10px",
      paddingBottom: "0px",
    },
    footer: {
      position: "fixed",
      bottom: "0px",
      left: "0px",
      width: "100%",
      zIndex: 999,
      paddingTop: "0px",
      paddingBottom: "0px",
      height: 75,
      pointerEvents: "none",
    },
    title: {
      margin: 32,
      paddingTop: 60,
    },
    loading: {
      margin: 32,
      paddingTop: 60,
    },
    bold: { fontWeight: 600 },
  },
  {
    name: "Layout",
  }
);

const Layout = ({ children }: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { headerMenuItems, setHeaderMenuItems, headerName, loading, footer } =
    useHeader();
  const page = window.location.pathname.match(/^\/([^/]*)[^/]?/)?.[1] || "home";
  const title =
    headerName ||
    (EXCLUDED_ROUTE_HEADER_TITLES.includes(`route.${page}`)
      ? ""
      : `route.${page}`);
  const classes = useStyles();

  useEffect(() => {
    setHeaderMenuItems?.([
      <Grid
        item
        xs={12}
        sm={6}
        container
        justifyContent="center"
        key={"logo"}
        component={Link}
        to="/"
      >
        <img
          src={VodafoneLogo}
          alt={t("vodafoneLogo")}
          className={classes.logo}
        />
      </Grid>,
      <Grid
        item
        xs={12}
        sm={6}
        container
        justifyContent="center"
        key={"search"}
      >
        <SearchBar />
      </Grid>,
    ]);
    return () => setHeaderMenuItems?.([]);
  }, [setHeaderMenuItems, classes.logo, t]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ padding: 10 }}
    >
      <Box display="flex" width="100%" className={classes.header}>
        <Grid container>{headerMenuItems}</Grid>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        className={loading ? classes.loading : classes.title}
        style={{ height: 40, textAlign: "center" }}
        width="100%"
      >
        {loading ? (
          <CircularProgress
            size={40}
            style={{
              borderBottom: `5px solid ${COLORS.white}`,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        ) : (
          <Typography
            variant="h5"
            className={classes.bold}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              borderBottom: "5px solid",
              borderImage: `linear-gradient(to right, ${COLORS.white} 25%,  ${COLORS.mainLight} 25%, ${COLORS.mainLight} 75%, ${COLORS.white} 75%) 5`,
            }}
            noWrap
          >
            {t(`${title}`)?.toString()}
          </Typography>
        )}
      </Box>
      <Box width="100%" className={classes.pageWrapper}>
        <SwitchTransition>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <Box className={classes.content}>{children}</Box>
          </CSSTransition>
        </SwitchTransition>
        <Box
          display="flex"
          width="100%"
          className={classes.footer}
          justifyContent="flex-end"
        >
          {footer}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
