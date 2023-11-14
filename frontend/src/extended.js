import { extendTheme } from "@chakra-ui/react";
// Supports weights 100-900
import "@fontsource-variable/inter";

const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  breakpoints: {
    md: "25em", // 424px
    lg: "47em", // 762px0
    xl: "90em", // 1280px
  },
});

export default theme;
