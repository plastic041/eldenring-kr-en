import {
  ActionIcon,
  Box,
  Highlight,
  Paper,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { CheckIcon, ClipboardCopyIcon } from "../resources/Icons";

import { Dict } from "../App";
import { useClipboard } from "@mantine/hooks";

const ResultWord = ({ query, word }: { query: string; word: string }) => {
  const clipboard = useClipboard({
    timeout: 1000,
  });

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing.xs,
      })}
    >
      <Text>
        <Highlight highlight={query}>{word}</Highlight>
      </Text>
      <Tooltip
        label={clipboard.copied ? `복사됨` : `복사`}
        color={clipboard.copied ? "green" : "gray"}
        transition="pop"
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
    </Box>
  );
};

const ResultCard = ({ query, ko, en, category }: Dict & { query: string }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Paper
      withBorder
      component="dl"
      shadow="xs"
      p="md"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        margin: 0,

        "& div": {
          display: "flex",

          "& dt": {
            width: "3rem",
            marginRight: theme.spacing.xs,
            color: dark ? theme.colors.dark[2] : theme.colors.gray[7],
            flexShrink: 0,
          },

          "& dd": {
            margin: 0,
            color: dark ? theme.colors.dark[0] : theme.colors.gray[9],
          },
        },
      })}
    >
      <div>
        <dt>한국어</dt>
        <dd>
          <ResultWord query={query} word={ko} />
        </dd>
      </div>
      <div>
        <dt>영어</dt>
        <dd>
          <ResultWord query={query} word={en} />
        </dd>
      </div>
      <div>
        <dt>분류</dt>
        <dd>{category}</dd>
      </div>
    </Paper>
  );
};

export default ResultCard;
