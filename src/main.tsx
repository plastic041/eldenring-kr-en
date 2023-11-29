import { App } from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers.tsx";

import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
