"use client";
import React from "react";
import { ColorSchemeScript, createTheme, CSSVariablesResolver, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import Application from "../../app/_app";
import { useCurrentTitle } from "../../hooks/useCurrentTitle";

const Layout = ({ children }) => {
  const currentTitle = useCurrentTitle();

  const themeOverride = createTheme({
    other: {
      newWhite: '#f8f8f8'
    },
  });

  const resolver: CSSVariablesResolver = (theme) => ({
    variables: {},
    light: {
      '--mantine-color-white': theme.other.newWhite,
    },
    dark: {},
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`Na Medida | ${currentTitle}`}</title>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={themeOverride} cssVariablesResolver={resolver}>
          <Application>{children}</Application>
        </MantineProvider>
      </body>
    </html>
  );
};

export default Layout;
