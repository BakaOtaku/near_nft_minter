import React from "react";
import { NavLink } from "react-router-dom";

import { Container, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Details = () => {
  const classes = useStyles();

  return (
    <section className={classes.details}>
      <Container className={classes.container}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={7}>
            <Typography variant="h1" className={classes.title}>
              ~/CryptoRelief_
            </Typography>
            <Typography variant="subtitle1" className={classes.text}>
              Donate to Indian Crypto Relief fund and generate a unique NFT based on tx hash.
              Help India fight the Covid emergency.
            </Typography>

            <div className={classes.btnContainer}>
              <Button className={`${classes.btn} ${classes.filled}`} href="https://cryptorelief.in/donate" target="blank">
                Donate
              </Button>
              <NavLink exact to="/claim" className="menuItem active">
                <Button type="submit" className={`${classes.btn}`}>
                  Claim NFT
                </Button>
              </NavLink>
            </div>
          </Grid>

          <Grid item xs={12} sm={5}>
            <div className={classes.graphicContainer}>
              <img src="img/logo.svg" alt="graphic" className={classes.graphic} />
            </div>
          </Grid>

        </Grid>
      </Container>

    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  details: {
    // backgroundColor: "#061024",
    padding: "70px 0",
    position: "relative",
    overflow: "hidden",

    "@media (max-width:959px)": {
      paddingBottom: "120px",
    },
  },
  title: {
    marginBottom: 20,
    fontSize: 70,
    fontWeight: "700",
    background: 'linear-gradient(89.48deg, #8247E5 0.24%, #D93AD6 44.2%, #D93E3E 97.47%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  text: {
    fontSize: 22,
    fontWeight: "400",
    color: "#292929",
    fontFamily: 'Inter,sans-serif',
    lineHeight: 1.4,
    marginBottom: 40,
  },
  graphicContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  graphic: {
    width: "94%",
    "@media (max-width:959px)": {
      float: "none",
    },
    "@media (max-width:599px)": {
      display: "block",
      margin: "auto",
    },
    "@media (max-width:340px)": {
      display: "block",
      margin: "auto",
    },
  },
  // button
  btnContainer: {
    display: "flex",
    margin: "30px auto",
    zIndex: 10
  },
  btn: {
    height: "44px",
    lineHeight: "44px",
    padding: "10px 20px",
    border: "2px solid #233e8b",
    borderRadius: "4px",
    fontFamily: 'Inter,sans-serif',
    display: "inline-flex",
    textTransform: 'inherit',
    fontWeight: 400,
    fontSize: 16,
    position: "relative",

    "&:first-child": {
      marginRight: "14px",
    },
    "&:hover": {
      backgroundColor: "inherit"
    },
  },
  filled: {
    backgroundColor: "#233e8b",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#233e8b",
    },
  },
}));

export default Details;
