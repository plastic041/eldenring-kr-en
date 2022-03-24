import { Box, Highlight, Paper } from "@mantine/core";

import { Dict } from "../App";
import { useClipboard } from "@mantine/hooks";

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
export default ResultCard;
