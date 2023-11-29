import { Box, Button, TextInput, ActionIcon } from "@mantine/core";
import { useState, useRef } from "react";
import { MagnifierIcon, ClearIcon } from "../resources/Icons.tsx";
import { getHotkeyHandler } from "@mantine/hooks";
import classes from "./SearchBar.module.css";

type SearchBarProps = {
  onSetQuery: (value: string) => void;
};
export function SearchBar({ onSetQuery }: SearchBarProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box className={classes.searchBar}>
      <TextInput
        className={classes.input}
        ref={inputRef}
        aria-label="검색어 입력"
        placeholder="한국어나 영어로 검색"
        leftSection={<MagnifierIcon />}
        rightSection={
          value && (
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setValue("");
                onSetQuery("");
                inputRef.current?.focus();
              }}
              title="검색어 지우기"
              aria-label="검색어 지우기"
            >
              <ClearIcon />
            </ActionIcon>
          )
        }
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={getHotkeyHandler([["Enter", () => onSetQuery(value)]])}
      />
      <Button className={classes.button} onClick={() => onSetQuery(value)}>
        검색
      </Button>
    </Box>
  );
}
