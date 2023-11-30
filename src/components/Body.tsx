import { Box } from "@mantine/core";

import { CATEGORIES } from "../constants.ts";
import { Chips } from "./Chips.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { SearchResults } from "./SearchResults.tsx";

import classes from "./Body.module.css";

export type CategorySubset = (typeof CATEGORIES)[number][];

const Body = () => {
  return (
    <Box className={classes.main}>
      <SearchBar />
      <Chips />
      <SearchResults />
    </Box>
  );
};

export default Body;
