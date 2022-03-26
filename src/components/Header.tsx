import {
  ActionIcon,
  Box,
  MediaQuery,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { GitHubIcon, MoonIcon, SunIcon, TwitterIcon } from "../resources/Icons";

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      component="header"
    >
      <MediaQuery
        smallerThan="xs"
        styles={{
          flexDirection: "column",
          alignItems: "start",
          gap: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            justifyContent: "center",
            gap: theme.spacing.xs,
          }}
        >
          <MediaQuery
            smallerThan="xs"
            styles={{
              fontSize: theme.fontSizes.xl,
            }}
          >
            <Title sx={{ wordBreak: "keep-all" }}>엘든링 한영사전</Title>
          </MediaQuery>
          <Text
            size="xs"
            sx={{
              color: dark ? theme.colors.dark[2] : theme.colors.gray[7],
              // alignSelf: "end",
            }}
          >
            @plastik041
          </Text>
        </Box>
      </MediaQuery>
      <nav>
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
            {/* 다크 모드 토글 버튼 */}
            <ActionIcon
              variant="filled"
              size="lg"
              title="다크 모드 토글"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </ActionIcon>
          </li>
          <li>
            {/* 트위터 버튼 */}
            <ActionIcon
              component="a"
              href="https://twitter.com/plastik041"
              target="_blank"
              variant="filled"
              size="lg"
              title="개발자 트위터로 이동"
            >
              <TwitterIcon />
            </ActionIcon>
          </li>
          <li>
            {/* 깃허브 버튼 */}
            <ActionIcon
              component="a"
              href="https://github.com/plastic041/eldenring-kr-en"
              target="_blank"
              variant="filled"
              size="lg"
              title="GitHub 저장소로 이동"
            >
              <GitHubIcon />
            </ActionIcon>
          </li>
        </Box>
      </nav>
    </Box>
  );
};

export default Header;
