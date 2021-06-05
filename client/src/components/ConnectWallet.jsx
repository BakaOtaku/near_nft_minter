import React from "react";
import Blockies from "react-blockies";

import { useWeb3Context } from '../contexts/Web3Context';

import { makeStyles } from '@material-ui/core/styles';
// import checkNetwork from '../hooks/checkNetwork';

const truncateAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const ConnectWallet = () => {
  const classes = useStyles();
  const { connectWeb3, disconnect, account } = useWeb3Context();

  return (
    <button
      className={classes.walletBtn}
      onClick={account ? disconnect : connectWeb3}>
      <Blockies
        className={classes.img}
        seed={account ? account : ''}
      />
      <div>
        {account ? truncateAddress(account) : "Connect Wallet"}
      </div>
    </button>
  );
}

const useStyles = makeStyles((theme) => ({
  walletBtn: {
    background: '#8ab6d6',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    borderRadius: 36,
    height: '36px',
    lineHeight: '36px',
    padding: '0 18px 0 8px',
    display: 'flex',
    alignItems: 'center',

    "@media (max-width:599px)": {
      padding: 0,
    },

    '&:hover': {
      backgroundColor: '#000',
      color: 'white',
    },

    '& div': {
      "@media (max-width:599px)": {
        margin: 0,
        display: 'none'
      },
    }
  },
  img: {
    borderRadius: '12px',
    marginRight: 5,
    height: '24px !important',
    width: '24px !important',

    "@media (max-width:599px)": {
      marginRight: 0,
      height: '36px !important', width: '36px !important',
      borderRadius: '20px',
    },
  }
}));

export default ConnectWallet;