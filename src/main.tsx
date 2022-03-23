import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Global, MantineProvider } from "@mantine/core";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor: theme.colors.gray[1],
          },
        })}
      />
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
