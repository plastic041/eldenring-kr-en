import { Box, Container } from "@mantine/core";

import Body from "./components/Body";
import Header from "./components/Header";

export type Dict = {
  ko: string;
  en: string;
  category: string;
};

const App = () => {
  return (
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
  );
};

export default App;
