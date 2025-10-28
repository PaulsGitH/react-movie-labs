import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9c27b0" },       
    secondary: { main: "#ffb300" },
    background: {
      default: "#0e0f13",
      paper: "#151821",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: [
      "Roboto",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: "none", borderBottom: "1px solid #282c34" } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: { root: { textTransform: "none", borderRadius: 12 } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
  },
});

export default theme;
