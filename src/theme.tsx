import { createTheme } from "@mui/material/styles";
import yekenBakh from "./assets/fonts/YekanBakhFaNum-Regular.woff";

// Extend the MUI types to support additional color shades
declare module "@mui/material/styles" {
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string; // Extend for extra dark shade
  }

  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
  }

  interface Palette {
    primary: PaletteColor;
  }
}

// A custom theme for this app
const theme = createTheme({
  direction: "rtl",
  cssVariables: true,
  typography: {
    fontFamily: "yekanBakh, Arial, sans-serif", // Font-family with a fallback

  },
  palette: {
    primary: {
      50: "#edfcf5",
      100: "#d4f7e4",
      200: "#adedce",
      300: "#77deb2",
      400: "#40c792",
      500: "#1eb27d", // Main color
      600: "#108b62",
      700: "#0d6f50",
      800: "#0d5841",
      900: "#0c4836",
      950: "#05291f",
      main: "#108b62", // Required for proper MUI color behavior
      light: "#77deb2", // Optional, for lighter shades
      dark: "#0d6f50", // Optional, for darker shades
      contrastText: "#fff",
    },
    secondary: {
      100: "#4DB2D21A",
      600: "#4DB2D2",

      main: "#4DB2D2",
    },
    grey: {
      100: "#EDF0EF80",
      200: "#FEFEFE",
      300: "#E8EAEB",
      400: "#edf0ef",
      500: "#334155",
      600: "#686F82",
      700: "#686F82CC",
      800: "#686F8299",
      900: "#686F8226",
    },
    info: {
      500: "#edf0ef",
    },
    error: {
      500: "#EF5353",
      600: "#EF53531A",
      700: "#EF535399",
      800: "#EF5353CC",
    },
    warning: {
      500: "#F59202",
      600: "#F592021A",
      700: "#F592024D",
      800: "#F5920299",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Custom rounded corners
          fontWeight: "bold",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#1eb27d", // Main color
          "&:hover": {
            backgroundColor: "#108b62", // Darker shade on hover
          },
        },
        outlinedPrimary: {
          borderColor: "#1eb27d",
          color: "#1eb27d",
          "&:hover": {
            borderColor: "#108b62",
            backgroundColor: "#edfcf5", // Lightest shade on hover
          },
        },
        textPrimary: {
          color: "#1eb27d",
          "&:hover": {
            backgroundColor: "#edfcf5",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
              @font-face {
                font-family: 'yekanBakh';
                font-style: normal;
                font-display: swap;
                letter-spacing: -1px!important;
                src: local('Raleway'), local('Raleway-Regular'), url(${yekenBakh}) format('woff2');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
              /* Apply direction: rtl for entire body or specific components */
              body, div {
                direction: rtl;
                unicode-bidi: embed;
              }

              /* Force Persian digits (if not supported by YekanBakh) */
              * {
                font-feature-settings: "ss01" on, "locl" on;
              }
                  `,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 769,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
