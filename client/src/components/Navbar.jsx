import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

// material ui
import { AppBar, Container } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

// components
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  const classes = useStyles();

  // to toggle the menu
  const [openMenu, setOpenMenu] = useState(false);
  const menuItemContainerRef = useRef(null);
  const toggleMenu = (state) => {
    state
      ? menuItemContainerRef.current.classList.add("open")
      : menuItemContainerRef.current.classList.remove("open");
    setOpenMenu(state);
  };

  return (
    <AppBar position="static" classes={{ root: classes.nav }}>
      <Container className={classes.container}>
        <div className={classes.flexContainer}>

          <NavLink to="/" style={{ display: "flex" }}>
            <img src="icons/logo-navbar.svg" alt="logo" className={classes.logo} />
          </NavLink>

          <div style={{ display: "flex" }}>
            <div
              className={classes.menuItemContainer}
              ref={menuItemContainerRef}
            >
              <NavLink exact to="/claim" className="menuItem active">Claim NFT</NavLink>
            </div>

            <ConnectWallet />

            <MenuIcon
              className={classes.menuIcon}
              onClick={() => {
                openMenu ? toggleMenu(false) : toggleMenu(true);
              }}
            />
          </div>

        </div>
      </Container>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  nav: {
    height: "80px",
    // backgroundColor: "#16213e",
    color: 'black',
    boxShadow: "none",
    background: 'inherit',
    borderBottom: "1px solid",
    // borderImage: 'linear-gradient(89.48deg, #8247E5 0.24%, #D93AD6 44.2%, #D93E3E 97.47%)',
    position: "relative",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    "@media (max-width:599px)": {
      height: "30px",
    },
  },
  menuItemContainer: {
    "@media (max-width:599px)": {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      backgroundColor: "white",
      width: "100%",
      top: "80px",
      left: 0,
      padding: 0,
      height: 0,
      overflow: "hidden",
      transition: "all 0.5s ease",
    },

    "&.open": {
      padding: "20px 0",
      height: "auto",
      transition: "all 0.5s ease",
    },

    "& .menuItem": {
      // color: "white",
      marginRight: "30px",
      fontSize: "16px",
      color: "inherit",
      textDecoration: "none",
      lineHeight: "36px",
      fontFamily: 'Inter,sans-serif',
      fontWeight: 400,

      "&.active": {
        color: "inherit",
        // fontWeight: "bold",
      },

      "&:hover": {
        color: "inherit",
        textDecoration: "underline",
      },

      "@media (max-width:599px)": {
        margin: 0,
        textAlign: "center",
        lineHeight: "50px",
      },
    },
  },
  menuIcon: {
    display: "none",
    "@media (max-width:599px)": {
      display: "block",
      // color: "white",
      marginLeft: "20px",
      marginTop: "6px",
    },
  },
}));

export default Navbar;
