import { FILTER_OP, FILTER_TYPES } from "../types";

function buildCondition(filter: any) {
  switch (filter.type) {
    case "enum":
    case "boolean":
      return filter.value;
    case FILTER_TYPES.ID:
      return filter.value;
    case "string":
      return {
        $regex: new RegExp(
          filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i",
        ),
      };
    case "status":
      return {
        $regex: new RegExp(
          filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "i",
        ),
      };
    case "date":
      return new Date(filter.value);
    case "number":
      return { [FILTER_OP[filter.op as keyof typeof FILTER_OP]]: filter.value };
    case "in":
      return { $in: filter.value };
    case "dateBetween":
      return {
        $gte: new Date(filter.value[0]),
        $lte: new Date(filter.value[1]),
      };
    case "users":
      const idSplit = filter.id.split("_");

      return {
        $or: [
          {
            [idSplit[0]]: {
              $regex: new RegExp(
                filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i",
              ),
            },
          },
          {
            [idSplit[1]]: {
              $regex: new RegExp(
                filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i",
              ),
            },
          },
          {
            [idSplit[2]]: {
              $regex: new RegExp(
                filter.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i",
              ),
            },
          },
        ],
      };

    default:
      return undefined;
  }
}

export const buildQueryFromFilters = <T>(filters: any[]) => {
  const filterQuery: any = {};
  filters.forEach((filter) => {
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
