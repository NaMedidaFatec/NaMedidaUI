"use client";
import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import Application from "../../app/_app";
import { useCurrentTitle } from "../../hooks/useCurrentTitle";

const Layout = ({ children }) => {
  const currentTitle = useCurrentTitle();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`Na Medida | ${currentTitle}`}</title>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Application>{children}</Application>
        </MantineProvider>
      </body>
    </html>
  );
};

export default Layout;
