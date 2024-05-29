import { Box, Mark, Text } from "@mantine/core";
import { ResultCard } from "./ResultCard.tsx";
import { VList } from "virtua";
import classes from "./SearchResults.module.css";

import type { DictEntry } from "../App.tsx";
import type { CategorySubset } from "./Body.tsx";

type SearchResultsProps = {
  results: DictEntry[];
  query: string;
  categories: CategorySubset;
};
export function SearchResults({
  results,
  query,
  categories,
}: SearchResultsProps) {
  return (
    <Box
      style={{
        height: "100%",
      }}
    >
      {results.length > 0 ? (
        // 검색 결과가 있을 때
        <VList style={{ height: "100%" }} className={classes.list}>
          {results.map((result) => (
            <Box className={classes.item}>
              <ResultCard key={result.ko} dictEntry={result} query={query} />
            </Box>
          ))}
        </VList>
      ) : categories.length === 0 ? (
        // 카테고리 선택이 없을 때
        <Text size="md" ta="center">
          카테고리를 하나 이상 선택해주세요.
        </Text>
      ) : query ? (
        // 검색 결과가 없을 때
        <Text size="md" ta="center">
          <Mark>{query}</Mark>에 대한 검색 결과가 없습니다.
        </Text>
      ) : (
        // 검색어가 없을 때
        <Text size="md" ta="center">
          검색어를 입력해주세요.
        </Text>
      )}
    </Box>
  );
}
