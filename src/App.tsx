import dict from "./dict.json";
import { useEffect, useRef, useState } from "react";
import {
  Container,
  TextInput,
  Group,
  Box,
  Paper,
  Text,
  ScrollArea,
  Chips,
  Chip,
  Kbd,
  Highlight,
  Title,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

type Dict = {
  ko: string;
  en: string;
  category: string;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResult] = useState<Dict[]>([]);
  const [categories, setCategories] = useState<string[]>(["의상", "무기"]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterDict = () => {
    if (query) {
      const find = dict.filter((item: Dict) => {
        const isCategoryInclude = categories.includes(item.category);
        const isKoInclude = item.ko.includes(query);

        return isCategoryInclude && isKoInclude;
      });
      setResult(find);
    }
  };

  const onClick = () => {
    const value = inputRef.current?.value || "";
    setQuery(value.trim());
  };

  useEffect(() => {
    filterDict();
  }, [query, categories]);

  return (
    <Container pt="lg" sx={{ height: "100vh" }} size="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Title>엘든링 한-영 검색기</Title>
          <Text
            variant="link"
            component="a"
            href="https://twitter.com/plastik041"
            target="_blank"
            size="sm"
          >
            @plastik041
          </Text>
        </Box>
        <Group grow direction="column">
          <TextInput
            type="text"
            placeholder="한국어로 검색"
            ref={inputRef}
            onKeyDown={getHotkeyHandler([["Enter", onClick]])}
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
        </Group>
        <ScrollArea>
          {results?.length ? (
            <Box
              className="search-results"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {results.map((result) => (
                <Box component="dl" key={result.en} sx={{ margin: 0 }}>
                  <Paper
                    withBorder
                    shadow="xs"
                    p="md"
                    sx={(theme) => ({
                      display: "flex",
                      flexDirection: "column",

                      "& div": {
                        display: "flex",

                        "& dt, & dd": {
                          display: "inline",
                        },

                        "& dt": {
                          width: "3rem",
                          marginRight: "1rem",
                          color: theme.colors.gray[7],
                        },

                        "& dd": {
                          margin: 0,
                          color: theme.colors.gray[9],
                          whiteSpace: "pre-wrap",
                        },
                      },
                    })}
                  >
                    <div>
                      <dt>한국어</dt>
                      <dd>
                        <Highlight highlight={query}>{result.ko}</Highlight>
                      </dd>
                    </div>
                    <div>
                      <dt>영어</dt>
                      <dd>{result.en}</dd>
                    </div>
                    <div>
                      <dt>분류</dt>
                      <dd>{result.category}</dd>
                    </div>
                  </Paper>
                </Box>
              ))}
            </Box>
          ) : categories.length === 0 ? (
            <Text size="sm" color="red">
              카테고리를 하나 이상 선택해주세요
            </Text>
          ) : (
            query && (
              <Text size="md" align="center">
                검색 결과가 없습니다.
              </Text>
            )
          )}
        </ScrollArea>
      </Box>
    </Container>
  );
};

export default App;
