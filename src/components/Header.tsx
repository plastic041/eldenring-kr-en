import { ActionIcon, Box, Text, Title } from "@mantine/core";
import { GitHubIcon, TwitterIcon } from "../resources/Icons";

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
        <Title>엘든링 한영 검색기</Title>
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
              <TwitterIcon />
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
              <GitHubIcon />
            </ActionIcon>
          </li>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
