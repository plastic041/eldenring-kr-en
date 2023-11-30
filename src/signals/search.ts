import { signal, computed } from "@preact/signals";
import dict from "../resources/dict.json";
import type { CategorySubset } from "src/components/Body";
import type { DictEntry } from "src/App";

export const querySignal = signal("");
export const categoriesSignal = signal<CategorySubset>(["의상", "무기"]);

export const resultsSignal = computed(() => {
  if (querySignal.value === "" || categoriesSignal.value.length === 0) {
    return [];
  }

  const dictWithMatchingCategories = dict.filter((item: DictEntry) => {
    return categoriesSignal.value.some((category) =>
      item.category.includes(category),
    );
  });
  const dictWithMatchingCategoriesAndQuery = dictWithMatchingCategories.filter(
    (item: DictEntry) => {
      return (
        item.ko.includes(querySignal.value) ||
        item.en.toLowerCase().includes(querySignal.value)
      );
    },
  );

  return dictWithMatchingCategoriesAndQuery;
});
