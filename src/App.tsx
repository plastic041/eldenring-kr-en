import {
  ActionIcon,
  Box,
  Chip,
  Chips,
  Container,
  Group,
  Highlight,
  Kbd,
  Mark,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { GitHub, Twitter } from "./Icons";
import { useEffect, useRef, useState } from "react";

import dict from "./dict.json";
import { getHotkeyHandler } from "@mantine/hooks";

type Dict = {
  ko: string;
  en: string;
  category: string;
};

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      component="header"
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Title>엘든링 한-영 검색기</Title>
        <Text
          size="sm"
          sx={(theme) => ({
            color: theme.colors.gray[7],
            alignSelf: "end",
          })}
        >
          @plastik041
        </Text>
      </Box>
      <Box component="nav">
        <Box
          component="ul"
          sx={(theme) => ({
            display: "flex",
            gap: theme.spacing.xs,
            listStyleType: "none",
            padding: 0,
            margin: 0,
          })}
        >
          <li>
            <ActionIcon
              component="a"
              href="https://twitter.com/plastik041"
              target="_blank"
              variant="default"
              size="lg"
              title="개발자 트위터로 이동"
            >
              <Twitter />
            </ActionIcon>
          </li>
          <li>
            <ActionIcon
              component="a"
              href="https://github.com/plastic041/eldenring-kr-en"
              target="_blank"
              variant="default"
              size="lg"
              title="GitHub 저장소로 이동"
            >
              <GitHub />
            </ActionIcon>
          </li>
        </Box>
      </Box>
    </Box>
  );
};

const ResultCard = ({ query, ko, en, category }: Dict & { query: string }) => {
  return (
    <Box component="dl" key={en} sx={{ margin: 0 }}>
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
            <Highlight highlight={query}>{ko}</Highlight>
          </dd>
        </div>
        <div>
          <dt>영어</dt>
          <dd>{en}</dd>
        </div>
        <div>
          <dt>분류</dt>
          <dd>{category}</dd>
        </div>
      </Paper>
    </Box>
  );
};

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
    <>
      <Group grow direction="column">
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
      </Group>
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
    </>
  );
};

const App = () => {
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
        <Header />
        <Body />
      </Box>
    </Container>
  );
};

export default App;
