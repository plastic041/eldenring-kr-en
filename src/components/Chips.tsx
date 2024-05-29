import { CATEGORIES } from "../constants.ts";
import { Chip, Group } from "@mantine/core";
import type { CategorySubset } from "./Body.tsx";

type CategoryChipsProps = {
  categories: CategorySubset;
  setCategories: (categories: CategorySubset) => void;
};
export function CategoryChips({
  categories,
  setCategories,
}: CategoryChipsProps) {
  return (
    <Chip.Group
      multiple
      defaultValue={categories}
      onChange={(values) => setCategories(values as CategorySubset)}
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
