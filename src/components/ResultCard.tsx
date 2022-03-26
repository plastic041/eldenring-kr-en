import {
  ActionIcon,
  Box,
  Highlight,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import { CheckIcon, ClipboardCopyIcon } from "../Icons";

import { Dict } from "../App";
import { useClipboard } from "@mantine/hooks";

const ResultWord = ({
  query,
  word,
  isCopied,
  copy,
}: {
  query: string;
  word: string;
  isCopied: boolean;
  copy: (valueToCopy: any) => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Text>
        <Highlight highlight={query}>{word}</Highlight>
      </Text>
      <Tooltip
        label={isCopied ? `복사됨` : `복사`}
        color={isCopied ? "green" : "gray"}
        transition="pop"
      >
        <ActionIcon
          size="sm"
          variant="hover"
          onClick={copy}
          title={`${word} 복사`}
          color={isCopied ? "green" : "gray"}
        >
          {isCopied ? <CheckIcon /> : <ClipboardCopyIcon />}
        </ActionIcon>
      </Tooltip>
    </Box>
  );
};

const ResultCard = ({ query, ko, en, category }: Dict & { query: string }) => {
  const clipboard = useClipboard({
    timeout: 1000,
  });

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
            color: theme.colors.gray[7],
            flexShrink: 0,
          },

          "& dd": {
            margin: 0,
            color: theme.colors.gray[9],
          },
        },
      })}
    >
      <div>
        <dt>한국어</dt>
        <dd>
          <ResultWord
            query={query}
            word={ko}
            isCopied={clipboard.copied}
            copy={() => clipboard.copy(ko)}
          />
        </dd>
      </div>
      <div>
        <dt>영어</dt>
        <dd>
          <ResultWord
            query={query}
            word={en}
            isCopied={clipboard.copied}
            copy={() => clipboard.copy(en)}
          />
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
