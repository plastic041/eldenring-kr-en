import { Box, Button, TextInput, ActionIcon } from "@mantine/core";
import { useState, useRef } from "react";
import { MagnifierIcon, ClearIcon } from "../resources/Icons.tsx";
import classes from "./SearchBar.module.css";

type SearchBarProps = {
  query: string;
  onSetQuery: (value: string) => void;
};
export function SearchBar({ query, onSetQuery }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isClean, setIsClean] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSetValue(value: string) {
    setIsClean(false);
    setValue(value);
  }

  function handleSetQuery(value: string) {
    setIsClean(true);
    onSetQuery(value);
  }

  return (
    <Box
      component="form"
      className={classes.searchBar}
      onSubmit={(e) => {
        e.preventDefault();
        handleSetQuery(value);
      }}
    >
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
        onChange={(e) => handleSetValue(e.currentTarget.value)}
      />
      <Button type="submit" className={classes.button} disabled={isClean}>
        검색
      </Button>
    </Box>
  );
}
