import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Navbar from "../components/Navbar";
import Details from '../components/Details';
import Footer from "../components/Footer";

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.main}>
        <Navbar />
        <Details />
        <Footer />
      </main>
    </React.Fragment>
  );
};

const useStyles = makeStyles(() => ({
  
}));

export default Home;