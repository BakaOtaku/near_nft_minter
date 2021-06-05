import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    formStyle: {
      formContainer: {
        padding: "40px 26px",
      },
      // input and label
      inputContainer: {
        width: "100%",
        marginBottom: 30,
        textAlign: 'left',

        "& input, & textarea": {
          height: "50px",
          borderRadius: 4,
          backgroundColor: "#fff",
          border: "1px solid #C7CBD9",
          padding: "0 15px",
          // lineHeight: "50px",
          fontSize: "16px",
          fontWeight: "500",
          width: "100%",
          color: "black",

          "&:active": {
            border: "1.5px solid #233e8b",
            outline: "none",
          },
          "&:focus": {
            border: "1.5px solid #233e8b",
            outline: "none",
          },
          "&:disabled": {
            pointerEvents: "none",
            userSelect: "none",
            backgroundColor: "transparent",
            position: "relative",

            "&~label": {
              color: "gray",
            },
          },
        },

        "& textarea": {
          padding: "15px",
          width: "115%",
          minHeight: 100,
          resize: 'vertical'
        },
        "& label": {
          fontSize: 16,
          fontWeight: "500",
          color: "#000",
          marginLeft: "3px",
          marginBottom: "4px",
          display: "block;",

          "& span": {
            color: "#515C72",
            fontSize: "14px",
            fontWeight: "normal",
          },
        },
      },
      label: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#233e8b",
        marginLeft: "3px",
        marginBottom: "4px",
        marginTop: 0,
        display: "block;",
      },
      // nft type checkbox
      nftType: {
        display: "flex",
        padding: "5px",
        backgroundColor: "white",
        border: "1px solid #C7CBD9",
        borderRadius: "6px",
        height: "50px",
        position: "relative",
        cursor: "pointer",
        marginBottom: "30px",

        "& div": {
          width: "calc(50% - 2.5px)",
          // backgroundColor: "red",
          borderRadius: "5px",
          textAlign: "center",
          lineHeight: "40px",
          fontWeight: "600",
          fontSize: "14px",
          position: "relative",
          zIndex: "2",
          color: "#6E798F",
          transition: "0.3s ease",

          "&:first-child": {
            marginRight: "5px",
          },
        },

        // slider
        "&::after": {
          content: "' '",
          height: "40px",
          width: "calc(50% - 7.5px)",
          position: "absolute",
          top: "4px",
          left: "5px",
          zIndex: 1,
          backgroundColor: "#3E3B51",
          borderRadius: "5px",
          transition: "0.3s ease",
        },
      },
      hiddenCheckbox: {
        // checking whether checkbox is checked
        "&:checked + label": {
          // if checked, text colour for erc1155 will be white
          "& div": {
            "&:nth-child(2)": {
              color: "#fff",
              transition: "0.3s ease",
            },
          },
          // moving slider
          "&::after": {
            left: "calc(50% + 2.5px)",
            transition: "0.3s ease",
          },
        },
        // if not checked, text colour for erc721 will be white
        "&:not(:checked) + label": {
          "& div": {
            "&:first-child": {
              color: "#fff",
              transition: "0.3s ease",
            },
          },
        },
      },
      // button
      btnContainer: {
        display: "flex",
        marginTop: "15px",
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

        "&:disabled": {
          backgroundColor: "#bdc3c7",
          borderColor: "#bdc3c7",
          // opacity: 0.65,
          color: "white",
        },
      },
      btnWithLoader: {
        paddingLeft: "44px",
        transition: "all 0.3s ease",
      },
      filled: {
        backgroundColor: "#233e8b",
        color: "#fff",

        "&:hover": {
          backgroundColor: "#233e8b",
        },
      },
      loading: {
        position: "absolute",
        display: "block",
        margin: "auto",
        left: "10px",
        color: "#233e8b",
      },
    },

    mui: {
      container: {
        maxWidth: "1080px",
        margin: "auto",
        padding: "0",
        "@media (max-width:1120px)": {
          padding: "0 20px",
        },
        "@media (max-width:599px)": {
          padding: "0 15px",
        },
      },
    },
  },
  typography: {
    fontFamily: ['"Nunito Sans"', "sans-serif"].join(","),

    h1: {
      fontWeight: 400,
      fontSize: "2.5rem",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  palette: {
    primary: {
      main: "#7167D9",
    },
  },
});

export default theme;