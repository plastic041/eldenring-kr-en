import { MantineProvider } from "@mantine/core";

import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
  );
};
