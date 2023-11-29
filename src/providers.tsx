import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
    </>
  );
};
