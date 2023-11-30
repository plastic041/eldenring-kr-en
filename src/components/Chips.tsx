import { CATEGORIES } from "../constants.ts";
import { Chip, Group } from "@mantine/core";
import { categoriesSignal } from "src/signals/search.ts";

import type { CategorySubset } from "./Body.tsx";

export function Chips() {
  return (
    <Chip.Group
      multiple
      defaultValue={categoriesSignal.value}
      onChange={(values) => (categoriesSignal.value = values as CategorySubset)}
    >
      <Group gap="xs">
        {CATEGORIES.map((category) => (
          <Chip value={category} size="sm" key={category} variant="outline">
            {category}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
}
