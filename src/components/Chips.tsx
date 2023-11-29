import { CATEGORIES } from "../constants.ts";
import { Chip, Group } from "@mantine/core";
import type { CategorySubset } from "./Body.tsx";

type ChipsProps = {
  categories: CategorySubset;
  setCategories: (categories: CategorySubset) => void;
};
export function Chips({ categories, setCategories }: ChipsProps) {
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
