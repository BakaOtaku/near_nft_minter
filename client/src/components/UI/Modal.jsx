import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const ModalResult = ({ triggerModal, setTriggerModal, result }) => {
  const classes = useStyles();

  const hideModal = () => {
    setTriggerModal(false);
  };

  return (
    <>
      <Modal
        open={triggerModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalContainer}
      >
        <div
          className={classes.modal}
          style={{ paddingTop: "20px", paddingBottom: "30px" }}
        >
          <div className={classes.closeModal} onClick={hideModal}>
            <Close style={{ fontSize: "16px" }} />
          </div>

          <div className={classes.successMsg}>
            <h3 className={classes.title} style={{ marginBottom: 40 }}>
              Minted NFT Successfully
            </h3>
            <div className={classes.graphicSection}>
              <div className="iconContainer">
                <img src={result.img} alt="icon" />
              </div>
            </div>

            <a href={result.hash} target="blank" className={classes.link}>{result.hash}</a>
          </div>
        </div>
      </Modal>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  // input and label styling is written in theme.js. Check the overrides object
  ...theme.overrides.formStyle,
  purple: {
    color: "#7533E2",
  },
  title: {
    fontSize: "20px",
    margin: "0 0 30px 0",
    textAlign: "center",
  },
  successMsg: {
    "& img": {
      margin: "44px auto",
    },
  },
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "0 20px",
  },
  modal: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    minWidth: 600,
    color: "#000",
    outline: "none",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  graphicSection: {
    height: "max-content",
    backgroundColor: "#E3DEFF",
    borderRadius: "8px",
    marginTop: "40px",
    padding: "20px 0",

    "& .iconContainer": {
      margin: "auto",
    },

    "& svg": {
      display: "block",
      margin: "auto",
      width: "150px",
    },

    "& img": {
      maxWidth: 400,
      maxHeight: 400,
      display: "block",
      margin: "auto"
    },
  },

  closeModal: {
    height: "30px",
    width: "30px",
    backgroundColor: "#FFDEDE",
    borderRadius: "15px",
    position: "absolute",
    top: "17px",
    right: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#ffc1c1",
    },
  },
  link: {
    marginTop: 20,
    display: 'block'
  }
}));

export default ModalResult;
