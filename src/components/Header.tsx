import { ActionIcon, Box, List, Text, Title, Tooltip, em } from "@mantine/core";
import { GitHubIcon } from "../resources/Icons";
import { useMediaQuery } from "@mantine/hooks";

const Header = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      component="header"
    >
      <Box
        style={(theme) => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          gap: theme.spacing.xs,
        })}
      >
        <Title
          style={{
            wordBreak: "keep-all",
          }}
          size={isMobile ? "h2" : "h1"}
        >
          엘든링 한영사전
        </Title>
        <Text size="xs" c="dimmed">
          @plastik041
        </Text>
      </Box>
      <nav>
        <List
          listStyleType="none"
          style={(theme) => ({
            display: "flex",
            gap: theme.spacing.xs,
            padding: 0,
            margin: 0,
          })}
        >
          <List.Item>
            {/* 깃허브 버튼 */}
            <Tooltip label="GitHub 저장소로 이동" position="bottom" withArrow>
              <ActionIcon
                component="a"
                href="https://github.com/plastic041/eldenring-kr-en"
                target="_blank"
                variant="default"
                size="lg"
                aria-label="GitHub 저장소로 이동"
              >
                <GitHubIcon />
              </ActionIcon>
            </Tooltip>
          </List.Item>
        </List>
      </nav>
    </Box>
  );
};

export default Header;
