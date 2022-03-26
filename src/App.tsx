import {
  ColorSchemeProvider,
  Container,
  Global,
  MantineProvider,
} from "@mantine/core";

import Body from "./components/Body";
import type { ColorScheme } from "@mantine/core";
import Header from "./components/Header";
import { useState } from "react";
import { useColorScheme } from "@mantine/hooks";

export type Dict = {
  ko: string;
  en: string;
  category: string;
};

const App = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "light" ? "dark" : "light"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme }}
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[1],
            },
          })}
        />
        <Container
          pt="lg"
          sx={(theme) => ({
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.md,
          })}
          size="xs"
        >
          <Header />
          <Body />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
