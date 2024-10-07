import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const themeOverride = createTheme({
  other: {
    newWhite: '#f8f8f8'
  }
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-white': theme.other.newWhite,
  },
  dark: {},
});