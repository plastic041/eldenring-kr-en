import {
  Box,
  Button,
  Chip,
  Chips,
  Mark,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { Dict } from "../App";
import { MagnifierIcon } from "../resources/Icons";
import ResultCard from "./ResultCard";
import dict from "../resources/dict.json";
import { getHotkeyHandler } from "@mantine/hooks";

const Body = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>(["의상", "무기"]);
  const [results, setResult] = useState<Dict[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const filterDict = () => {
    if (query) {
      const find = dict.filter((item: Dict) => {
        const isCategoryInclude = categories.includes(item.category);
        const isIncludeQuery =
          item.ko.includes(query) || item.en.toLowerCase().includes(query);

        return isCategoryInclude && isIncludeQuery;
      });
      setResult(find);
    } else {
      setResult([]);
    }
  };

  const onSearch = () => {
    const value = inputRef.current?.value || "";
    setQuery(value.trim().toLowerCase());
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
        height: "1px",
        flexGrow: 1,
      })}
      component="main"
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "row",
          gap: theme.spacing.xs,
        })}
      >
        <TextInput
          sx={{
            flexGrow: 1,
          }}
          aria-label="검색어 입력"
          placeholder="한국어나 영어로 검색"
          icon={<MagnifierIcon />}
          ref={inputRef}
          onKeyDown={getHotkeyHandler([["Enter", onSearch]])}
        />
        <Button onClick={onSearch}>검색</Button>
      </Box>
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
          // 카테고리 선택이 없을 때
          <Text size="md" align="center" color="red">
            카테고리를 하나 이상 선택해주세요.
          </Text>
        ) : query ? (
          // 검색 결과가 없을 때
          <Text size="md" align="center">
            <Mark>{query}</Mark>에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          // 검색어가 없을 때
          <Text size="md" align="center">
            검색어를 입력해주세요.
          </Text>
        )}
      </ScrollArea>
    </Box>
  );
};

export default Body;
