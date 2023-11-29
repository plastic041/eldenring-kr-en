import { Box, Container, useComputedColorScheme } from "@mantine/core";

import Body from "./components/Body.tsx";
import Header from "./components/Header.tsx";

export type DictEntry = {
  ko: string;
  en: string;
  category: string;
};

const App = () => {
  const computedColorScheme = useComputedColorScheme("dark");

  return (
    <Box
      style={(theme) => ({
        display: "flex",
        height: "100vh",
        width: "100vw",

        backgroundColor:
          computedColorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
      })}
    >
      <Container
        p="lg"
        style={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.md,
        })}
        size="xs"
      >
        <Header />
        <Body />
      </Container>
    </Box>
  );
};

export default App;
