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
          <Highlight highlight={query}>{ko}</Highlight>
        </dd>
      </div>
      <div>
        <dt>영어</dt>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
          })}
        >
          <Text>{en}</Text>
          <Tooltip
            label={clipboard.copied ? `복사됨` : `복사`}
            transition="pop"
          >
            <ActionIcon
              size="sm"
              variant="hover"
              onClick={() => clipboard.copy(en)}
              title={`${en} 복사`}
              color={clipboard.copied ? "green" : "gray"}
            >
              {clipboard.copied ? <CheckIcon /> : <ClipboardCopyIcon />}
            </ActionIcon>
          </Tooltip>
        </Box>
      </div>
      <div>
        <dt>분류</dt>
        <dd>{category}</dd>
      </div>
    </Paper>
  );
};
export default ResultCard;
