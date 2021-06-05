import React, { useState } from "react";
import { ethers } from 'ethers';
import axios from 'axios';

import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useWeb3Context } from '../contexts/Web3Context';
import ErrorBox from "./UI/ErrorBox";
import ResultModal from "./UI/Modal";

const BountyClaim = () => {
  const classes = useStyles();
  const { inj_provider } = useWeb3Context();

  const [formData, setFormData] = useState({
    txhash: "",
    pkey: "",
  });
  const [formError, setFormError] = useState({
    txhash: "",
    pkey: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [triggerModal, setTriggerModal] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      console.log(inj_provider);
      const provider = new ethers.providers.Web3Provider(inj_provider.currentProvider);
      const signer = provider.getSigner();
      const sign = await signer.signMessage(formData.txhash);
      console.log(sign);

      const res = await axios.post('http://localhost:4000/claim', {
        sign: sign,
        addr: formData.txhash
      })
      setResult({
        img: res.data.img,
        hash: res.data.hash
      });
      setIsLoading(false);
      setFormData({
        txhash: "",
        pkey: ""
      })
      setTriggerModal(true);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <ResultModal
        result={result}
        triggerModal={triggerModal}
        setTriggerModal={setTriggerModal}
      />
      <div className={classes.bountyListTop}>
        <h1>~/Claim NFT/</h1>
        <em>Enter the transaction hash as proof and we will create a random NFT using Chainlink Oracle.</em>
      </div>

      <form onSubmit={submit} className={classes.form}>

        <div className={classes.inputContainer}>
          <label htmlFor="name">Transaction Hash</label>
          <input
            type="hash"
            className={`${formError.txhash ? "inputErr" : ""}`}
            value={formData.txhash}
            onChange={(e) => {
              setFormData((pS) => ({ ...pS, txhash: e.target.value }));
              setFormError((pS) => ({ ...pS, txhash: "" }));
            }}
            required
            id="name"
          />
          {formError.txhash && (
            <p className={classes.inputErrMsg}>{formError.txhash}</p>
          )}
        </div>

        <div className={classes.inputContainer}>
          <label htmlFor="name">Near seed phrase</label>
          <input
            type="hash"
            className={`${formError.pkey ? "inputErr" : ""}`}
            value={formData.pkey}
            onChange={(e) => {
              setFormData((pS) => ({ ...pS, pkey: e.target.value }));
              setFormError((pS) => ({ ...pS, pkey: "" }));
            }}
            required
            id="name"
          />
          {formError.pkey && (
            <p className={classes.inputErrMsg}>{formError.pkey}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isLoading ? false : true}
          className={`${classes.btn} ${classes.filled} ${isLoading && classes.btnWithLoader}`}
        >
          {isLoading
            ? "Minting..."
            : "Claim NFT"}

          {isLoading && (
            <CircularProgress
              className={`${classes.loading}`}
              size={24}
            />
          )}
        </Button>

        {error && <ErrorBox message={error} />}
      </form>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  ...theme.overrides.mui,
  ...theme.overrides.formStyle,
  bountyListTop: {
    maxWidth: 1000,
    margin: 'auto',
    marginBottom: 40
  },
  bountyList: {
    flexGrow: 1,
    maxWidth: 1080,
    margin: 'auto',
    display: 'flex',
    minHeight: 480,
  },
  form: {
    // display: 'flex',
    maxWidth: 750,
    backgroundImage: "url('img/northern-lights-bg.png')",
    // backgroundColor: "#b6c9f0",
    padding: 26,
    paddingTop: 30,
    height: 'max-content',
    borderRadius: 26,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: 80,
  },
  // file upload section
  uploadSection: {
    "& p": {
      fontSize: "12px",
      fontWeight: "600",
      color: "#61677e",
      textAlign: "left",
      margin: "0 0 20px 0",
    },
  },
  inputContainerRow: {
    width: "100%",
    display: "flex",
    justifyContent: 'space-between'
  },

}));

export default BountyClaim;
