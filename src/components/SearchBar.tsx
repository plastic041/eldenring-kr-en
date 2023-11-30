import { Box, Button, TextInput, ActionIcon } from "@mantine/core";
import { createRef } from "preact";
import { signal } from "@preact/signals";
import { MagnifierIcon, ClearIcon } from "../resources/Icons.tsx";
import { getHotkeyHandler } from "@mantine/hooks";
import { querySignal } from "src/signals/search.ts";
import classes from "./SearchBar.module.css";

import type { ChangeEvent } from "preact/compat";

const text = signal("");

export function SearchBar() {
  const ref = createRef<HTMLInputElement>();

  function clear() {
    text.value = "";
    querySignal.value = text.value;
    ref.current?.focus();
  }

  function search() {
    querySignal.value = text.value;
  }

  return (
    <Box className={classes.searchBar}>
      <TextInput
        className={classes.input}
        ref={ref}
        aria-label="검색어 입력"
        placeholder="한국어나 영어로 검색"
        leftSection={<MagnifierIcon />}
        rightSection={
          text.value.length > 0 && (
            <ActionIcon
              variant="transparent"
              onClick={clear}
              title="검색어 지우기"
              aria-label="검색어 지우기"
            >
              <ClearIcon />
            </ActionIcon>
          )
        }
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          (text.value = e.currentTarget.value)
        }
        onKeyDown={getHotkeyHandler([["Enter", search]])}
      />
      <Button className={classes.button} onClick={search}>
        검색
      </Button>
    </Box>
  );
}
