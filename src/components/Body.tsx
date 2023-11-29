import dict from "../resources/dict.json";

import { CATEGORIES } from "../constants.ts";
import { Box } from "@mantine/core";
import { useState, useTransition } from "react";
import { Chips } from "./Chips.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { SearchResults } from "./SearchResults.tsx";
import classes from "./Body.module.css";

import type { DictEntry } from "../App.tsx";

export type CategorySubset = (typeof CATEGORIES)[number][];

const Body = () => {
  const [, startTransition] = useTransition();

  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<CategorySubset>([
    "의상",
    "무기",
  ]);

  const results = (() => {
    if (query === "" || categories.length === 0) {
      return [];
    }

    const dictWithMatchingCategories = dict.filter((item: DictEntry) => {
      return categories.some((category) => item.category.includes(category));
    });
    const dictWithMatchingCategoriesAndQuery =
      dictWithMatchingCategories.filter((item: DictEntry) => {
        return item.ko.includes(query) || item.en.toLowerCase().includes(query);
      });

    return dictWithMatchingCategoriesAndQuery;
  })();

  const setQueryWithTransition = (value: string) => {
    startTransition(() => {
      setQuery(value.trim().toLowerCase());
    });
  };

  const setCategoriesWithTransition = (value: CategorySubset) => {
    startTransition(() => {
      setCategories(value);
    });
  };

  return (
    <Box className={classes.main}>
      <SearchBar onSetQuery={setQueryWithTransition} />
      <Chips
        categories={categories}
        setCategories={setCategoriesWithTransition}
      />
      <SearchResults results={results} query={query} categories={categories} />
    </Box>
  );
};

export default Body;
