import algoliasearch from "algoliasearch";

export const searchClient = algoliasearch(
  "XCSKC80H99",
  "0c30af18ea1cc20f3fb81e8f98ede5db"
);

export const searchIndex = searchClient.initIndex("games");

searchIndex.setSettings({
  distinct: 1,
  attributeForDistinct: "name",
  customRanking: ["desc(rating)"],
  attributesForFaceting: ["genres", "tags", "rating"]
});
