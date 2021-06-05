import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Navbar from "../components/Navbar";
import NFTClaimForm from '../components/NFTClaimForm';
import Footer from "../components/Footer";

const ClaimBounty = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Navbar />
      <NFTClaimForm />
      <Footer />
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
}));

export default ClaimBounty;