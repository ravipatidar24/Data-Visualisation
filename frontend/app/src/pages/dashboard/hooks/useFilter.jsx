export const FilterData = (data, query) => {
  const filteredData = Object.entries(query).reduce(
    (filtered, [key, value]) => {
      if (value !== "All") {
        return filtered.filter((obj) => obj[key] === value);
      }
      return filtered;
    },
    data
  );

  return filteredData;
};
