import { MantineProvider } from "@mantine/core";
import type { ComponentChildren } from "preact";

export const Providers = ({ children }: { children: ComponentChildren }) => {
  return (
    <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
  );
};
