import { ActionIcon, Box, Text, Title, Tooltip, em } from "@mantine/core";
import { GitHubIcon } from "../resources/Icons.tsx";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./Header.module.css";

export const Header = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Box className={classes.header} component="header">
      <Box className={classes.headerLogo}>
        <Title
          className={classes.headerLogoTitle}
          size={isMobile ? "h2" : "h1"}
        >
          엘든링 한영사전
        </Title>
        <Text size="xs" c="dimmed">
          @plastik041
        </Text>
      </Box>
      <nav>
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
      </nav>
    </Box>
  );
};
