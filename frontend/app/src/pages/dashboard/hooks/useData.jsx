export const useData = (data, length) => {
  let intensityData = [];
  let likelihoodData = [];
  let relevanceData = [];
  let countryData = [];
  let topicsData = [];
  let regionData = [];
  let sectorData = [];
  let i = 1;
  data?.forEach((d) => {
    if (i <= length) {
      intensityData.push({ x: d.added, y: d.intensity });
      likelihoodData.push({ x: d.added, y: d.likelihood });
      relevanceData.push({ x: d.added, y: d.relevance });
      const country = d.country;
      const existingCountry = countryData.find((obj) => obj.id === country);
      if (existingCountry) {
        existingCountry.value++;
      } else {
        countryData.push({
          id: country,
          label: country,
          value: 1,
          color: "hsl(59, 70%, 50%)",
        });
      }
      const topic = d.topic;
      const existingTopic = topicsData.find((obj) => obj.id === topic);
      if (existingTopic) {
        existingTopic.value++;
      } else {
        topicsData.push({
          id: topic,
          label: topic,
          value: 1,
          color: "hsl(59, 70%, 50%)",
        });
      }
      const region = d.region;
      const existingRegion = regionData.find((obj) => obj.id === region);
      if (existingRegion) {
        existingRegion.value++;
      } else {
        regionData.push({
          id: region,
          label: region,
          value: 1,
          color: "hsl(59, 70%, 50%)",
        });
      }
      const sector = d.sector;
      const existingSector = sectorData.find((obj) => obj.id === sector);
      if (existingSector) {
        existingSector.value++;
      } else {
        sectorData.push({
          id: sector,
          label: sector,
          value: 1,
          color: "hsl(59, 70%, 50%)",
        });
      }
    }
    i++;
  });
  const intensity = {
    id: "Intensity",
    data: intensityData,
    color: "hsl(355, 70%, 50%)",
  };
  const likelihood = {
    id: "Likehood",
    data: likelihoodData,
    color: "hsl(355, 70%, 50%)",
  };
  const relevance = {
    id: "Relevance",
    data: relevanceData,
    color: "hsl(355, 70%, 50%)",
  };
  let emptyC = countryData.find((obj) => obj.id === "");
  if (emptyC) {
    emptyC.id = "others";
    emptyC.label = "others";
  }
  let emptyT = topicsData.find((obj) => obj.id === "");
  if (emptyT) {
    emptyT.id = "others";
    emptyT.label = "others";
  }
  let emptyR = regionData.find((obj) => obj.id === "");
  if (emptyR) {
    emptyR.id = "others";
    emptyR.label = "others";
  }
  let emptyS = sectorData.find((obj) => obj.id === "");
  if (emptyS) {
    emptyS = "others";
    emptyS = "others";
  }
  return {
    intensity,
    likelihood,
    relevance,
    countryData,
    topicsData,
    regionData,
    sectorData,
  };
};
