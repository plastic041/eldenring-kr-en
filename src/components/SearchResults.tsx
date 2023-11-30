import { Box, Mark, Text } from "@mantine/core";
import { ResultCard } from "./ResultCard.tsx";
import { Virtuoso, type Components } from "react-virtuoso";
import { forwardRef } from "preact/compat";
import classes from "./SearchResults.module.css";

import {
  querySignal,
  categoriesSignal,
  resultsSignal,
} from "src/signals/search.ts";

import type { CSSProperties } from "@mantine/core";
import type { ComponentChildren } from "preact";

const List: Components["List"] = forwardRef<
  HTMLDivElement,
  { children: ComponentChildren; style: CSSProperties }
>(({ children, style }, ref) => {
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

export function SearchResults() {
  return (
    <Box className={classes.container}>
      {resultsSignal.value.length > 0 ? (
        // 검색 결과가 있을 때
        <Virtuoso
          className={classes.virtuoso}
          totalCount={resultsSignal.value.length}
          data={resultsSignal.value}
          overscan={400}
          itemContent={(_, dictEntry) => (
            <ResultCard
              key={`${dictEntry.ko}-${dictEntry.en}`}
              query={querySignal.value}
              dictEntry={dictEntry}
            />
          )}
          components={{ List }}
        />
      ) : categoriesSignal.value.length === 0 ? (
        // 카테고리 선택이 없을 때
        <Text size="md" ta="center">
          카테고리를 하나 이상 선택해주세요.
        </Text>
      ) : querySignal.value ? (
        // 검색 결과가 없을 때
        <Text size="md" ta="center">
          <Mark>{querySignal.value}</Mark>에 대한 검색 결과가 없습니다.
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
