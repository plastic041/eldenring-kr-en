import {
  ActionIcon,
  Box,
  Group,
  Highlight,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { CheckIcon, ClipboardCopyIcon } from "../resources/Icons.tsx";
import { useClipboard } from "@mantine/hooks";
import classes from "./ResultCard.module.css";

import type { DictEntry } from "../App.tsx";
import type { ReactNode } from "react";

type WordWithCopyProps = {
  query: string;
  word: string;
};
const WordWithCopy = ({ query, word }: WordWithCopyProps) => {
  const clipboard = useClipboard({
    timeout: 1000,
  });

  return (
    <Group align="center" gap="xs">
      <Highlight highlight={query}>{word}</Highlight>
      <Tooltip
        withArrow
        label={clipboard.copied ? `복사됨` : `복사`}
        color={clipboard.copied ? "green" : "gray"}
      >
        <ActionIcon
          size="sm"
          variant="transparent"
          onClick={() => clipboard.copy(word)}
          title={`${word} 복사`}
          color={clipboard.copied ? "green" : "gray"}
        >
          {clipboard.copied ? <CheckIcon /> : <ClipboardCopyIcon />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

type DefinitionProps = {
  type: "한국어" | "영어" | "분류";
  value: ReactNode;
};
const Definition = ({ type: label, value }: DefinitionProps) => {
  return (
    <Group>
      <Box component="dt" className={classes.dt}>
        <Text c="dimmed">{label}</Text>
      </Box>
      <Box component="dd" className={classes.dd}>
        {value}
      </Box>
    </Group>
  );
};

type ResultCardProps = {
  dictEntry: DictEntry;
  query: string;
};
export const ResultCard = ({ dictEntry, query }: ResultCardProps) => {
  return (
    <Paper withBorder component="dl" shadow="xs" p="md" m={0}>
      <Stack gap={0}>
        <Definition
          type="한국어"
          value={<WordWithCopy query={query} word={dictEntry.ko} />}
        />
        <Definition
          type="영어"
          value={<WordWithCopy query={query} word={dictEntry.en} />}
        />
        <Definition type="분류" value={dictEntry.category} />
      </Stack>
    </Paper>
  );
};
