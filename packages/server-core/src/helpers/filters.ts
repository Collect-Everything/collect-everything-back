import { FilterType, TFilter } from "@ce/shared-core";

const buildCondition = (filter: TFilter) => {
  switch (filter.type) {
    case "enum":
    case "boolean":
      return filter.value;
    case FilterType.enum.ID:
      return filter.value;
    case "string":
      return {
        $regex: new RegExp(
          filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i",
        ),
      };
    case "date":
      return new Date(filter.value);
    case "number":
      if (!filter.op) {
        throw new Error("Filter op is required for number type");
      }
      return { [filter.op]: filter.value };
    case "in":
      return { $in: filter.value };
    case "dateBetween":
      return {
        $gte: new Date(filter.value[0]),
        $lte: new Date(filter.value[1]),
      };
    default:
      return undefined;
  }
};

export const buildFilterQuery = <T>(filters: TFilter[]) => {
  const filterQuery: any = {};
  filters.forEach((filter) => {
    console.log("Build filter query", filter);
    const association = filter.association ?? "$and";
    if (!filterQuery[association]) {
      filterQuery[association] = [];
    }
    if (filter.value) {
      filterQuery[association]?.push({
        [filter.id]: buildCondition(filter),
      });
    }
  });
  return filterQuery;
};
