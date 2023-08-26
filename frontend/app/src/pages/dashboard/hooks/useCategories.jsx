export const useCategories = (data) => {
  let years = ["All"];
  let sectors = ["All"];
  let topics = ["All"];
  let region = ["All"];
  let pestle = ["All"];
  let source = ["All"];
  let country = ["All"];
  data.forEach((d) => {
    if (!years.includes(d["end_year"]) && d["end_year"] != "") {
      years.push(d["end_year"]);
    }
    if (!sectors.includes(d["sector"]) && d["sector"] != "") {
      sectors.push(d["sector"]);
    }
    if (!topics.includes(d["topic"]) && d["topic"] != "") {
      topics.push(d["topic"]);
    }
    if (!region.includes(d["region"]) && d["region"] != "") {
      region.push(d["region"]);
    }
    if (
      !pestle.includes(d["pestle"]) &&
      d["pestle"] != undefined &&
      d["pestle"] != ""
    ) {
      pestle.push(d["pestle"]);
    }
    if (
      !source.includes(d["source"]) &&
      d["source"] != undefined &&
      d["source"] != ""
    ) {
      source.push(d["source"]);
    }
    if (
      !country.includes(d["country"]) &&
      d["country"] != undefined &&
      d["country"] != ""
    ) {
      country.push(d["country"]);
    }
  });
  return { years, topics, sectors, region, pestle, source, country };
};
