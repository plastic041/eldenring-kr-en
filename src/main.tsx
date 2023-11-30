import { App } from "./App";
import { Providers } from "./providers.tsx";
import { render } from "preact";

import "@mantine/core/styles.css";

render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")!,
);
