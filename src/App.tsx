import { Box, Container } from "@mantine/core";
import { lazy, Suspense } from "preact/compat";
import { Header } from "./components/Header.tsx";
import classes from "./App.module.css";

const Body = lazy(() => import("./components/Body.tsx"));

export type DictEntry = {
  ko: string;
  en: string;
  category: string;
};

const Loader = () => {
  return <Box className={classes.loader}>데이터를 불러오는 중입니다...</Box>;
};

export const App = () => {
  return (
    <Box className={classes.bg}>
      <Container p="lg" className={classes.container} size="xs">
        <Header />
        <Suspense fallback={<Loader />}>
          <Body />
        </Suspense>
      </Container>
    </Box>
  );
};
