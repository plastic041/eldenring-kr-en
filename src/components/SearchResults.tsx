import { Box, Mark, Text } from "@mantine/core";
import { ResultCard } from "./ResultCard";
import { Virtuoso, type Components } from "react-virtuoso";

import type { DictEntry } from "../App";
import type { CategorySubset } from "./Body";
import { forwardRef } from "react";

const List: Components["List"] = forwardRef(({ children, style }, ref) => {
  return (
    <Box
      ref={ref}
      style={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: theme.spacing.md,
        padding: "0 0 1rem 0",
        height: "100%",
        margin: 0,
        ...style,
      })}
    >
      {children}
    </Box>
  );
});

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
        <Virtuoso
          style={{ height: "100%" }}
          totalCount={results.length}
          data={results}
          overscan={400}
          itemContent={(_, dictEntry) => (
            <ResultCard
              key={`${dictEntry.ko}-${dictEntry.en}`}
              query={query}
              dictEntry={dictEntry}
            />
          )}
          components={{
            List,
          }}
        />
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
