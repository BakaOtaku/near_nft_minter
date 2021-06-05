import React from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";

// icons
import { Twitter } from "@material-ui/icons";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <figure className={classes.backgroundImage}>
        <img src="img/northern-lights-bg.png" className={classes.backgroundImg} alt="background" />
      </figure>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px', maxWidth: 1080, margin: 'auto' }}>
        <div>
          <img src="icons/logo-footer.svg" alt="company logo" className={classes.logo} />
          <p className={classes.text}>
            Reduce suffering by providing healthcare and essentials to those fighting for survival against Covid.
          </p>
        </div>
        <div className={classes.smIconsContainer}>
          <a
            href="https://twitter.com/cryptorelief_"
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.smIcon}>
              <Twitter style={{ fontSize: "26px" }} />
            </div>
          </a>
        </div>
      </div>
    </footer >
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  footer: {
    position: "relative",
    borderTop: "2px solid white",
    backgroundColor: "#8ab6d6",
    zIndex: 2,
    display: 'block',
    padding: "70px 0",
  },
  backgroundImage: {
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  logo: {
    height: "40px",
    margin: 'auto'
  },
  text: {
    // color: "white",
    fontSize: "14px",
    fontWeight: "600",
    maxWidth: "360px",
    marginBottom: 0,
    marginTop: "20px",
  },

  smIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "6px",
    backgroundColor: "#271F58",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    transition: "0.1s ease",
    "&:first-child": {
      marginRight: "20px",
    },

    "&:hover": {
      backgroundColor: "white",
      color: "#8247E5",

      "& svg": {
        fill: "black",
      },
    },

    "& svg": {
      fill: "#fff",
      width: "30px",
    },

    "@media (max-width:599px)": {
      marginTop: "30px",
    },
  },
  smIconsContainer: {
    display: "flex",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "@media (max-width:599px)": {
      justifyContent: "flex-start",
    },
  },
}));

export default Footer;
