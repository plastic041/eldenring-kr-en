import {
  Box,
  Chip,
  Chips,
  Kbd,
  Mark,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { Dict } from "../App";
import ResultCard from "./ResultCard";
import { getHotkeyHandler } from "@mantine/hooks";
import dict from "../resources/dict.json";

const Body = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>(["의상", "무기"]);
  const [results, setResult] = useState<Dict[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const filterDict = () => {
    if (query) {
      const find = dict.filter((item: Dict) => {
        const isCategoryInclude = categories.includes(item.category);
        const isKoInclude = item.ko.includes(query);

        return isCategoryInclude && isKoInclude;
      });
      setResult(find);
    } else {
      setResult([]);
    }
  };

  const onSearch = () => {
    const value = inputRef.current?.value || "";
    setQuery(value.trim());
  };

  useEffect(() => {
    filterDict();
  }, [query, categories]);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
        height: 1,
        flexGrow: 1,
      })}
      component="main"
    >
      <TextInput
        type="text"
        placeholder="한국어로 검색"
        ref={inputRef}
        onKeyDown={getHotkeyHandler([["Enter", onSearch]])}
        rightSectionWidth={60}
        rightSection={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Kbd>엔터↲</Kbd>
          </div>
        }
      />
      <Chips
        multiple
        defaultValue={categories}
        onChange={setCategories}
        size="sm"
      >
        <Chip value="의상">의상</Chip>
        <Chip value="전회">전회</Chip>
        <Chip value="아이템">아이템</Chip>
        <Chip value="장소">장소</Chip>
        <Chip value="NPC">NPC</Chip>
        <Chip value="탈리스만">탈리스만</Chip>
        <Chip value="무기">무기</Chip>
      </Chips>
      <ScrollArea>
        {results?.length ? (
          // 검색 결과가 있을 때
          <Box
            className="search-results"
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.md,
              marginBottom: theme.spacing.md,
            })}
          >
            {results.map((result) => (
              <ResultCard key={result.en} query={query} {...result} />
            ))}
          </Box>
        ) : categories.length === 0 ? (
          // 검색 결과가 없을 때
          <Text size="sm" color="red">
            카테고리를 하나 이상 선택해주세요.
          </Text>
        ) : query ? (
          <Text size="md" align="center">
            <Mark>{query}</Mark>에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          <Text size="md" align="center">
            검색어를 입력해주세요.
          </Text>
        )}
      </ScrollArea>
    </Box>
  );
};

export default Body;