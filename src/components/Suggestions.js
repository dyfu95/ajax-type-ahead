import { numberWithCommas } from "../utils";
import SuggestionItem from "./SuggestionItem";
/**
 * @typedef {Object} City
 * @property {string} city
 * @property {string} growth_from_2000_to_2013
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} population
 * @property {string} rank
 * @property {string} state
 */

const test = (keywords, result) => {
  const regex = new RegExp(result, "gi");
  return regex;
};

/**
 *
 * @param {Object} props
 * @param {City[]} props.searchResults
 * @param {string} props.keywords
 * @param {boolean} props.isSearched
 * @returns
 */
export default function Suggestions({ searchResults, isSearched, keywords }) {
  if (!isSearched) {
    return (
      <>
        <SuggestionItem name="Filter For A City"></SuggestionItem>
        <SuggestionItem name="Or A State"></SuggestionItem>
      </>
    );
  }
  const hasResults = Boolean(
    searchResults && Array.isArray(searchResults) && searchResults.length
  );
  const suggestionItemJsx = hasResults ? (
    searchResults.map((item) => {
      const cityName = item.city;
      const stateName = item.state;
      const regex = new RegExp(`(${keywords})`, "gi");

      const cityNameArray = cityName.split(regex);
      const stateNameArray = stateName.split(regex);
      const formatCityNameArray = cityNameArray
        .filter((item) => item)
        .map((item) => {
          return {
            value: item,
            shouldHighlight: item.toLowerCase() === keywords.toLowerCase(),
          };
        });
      const formatStateNameArray = stateNameArray
        .filter((item) => item)
        .map((item) => {
          return {
            value: item,
            shouldHighlight: item.toLowerCase() === keywords.toLowerCase(),
          };
        });
      const separator = [{ value: ", ", shouldHighlight: false }];
      const formatArray = formatCityNameArray.concat(
        separator,
        formatStateNameArray
      );
      return (
        <SuggestionItem
          key={item.rank}
          name={formatArray}
          population={numberWithCommas(item.population)}
        ></SuggestionItem>
      );
    })
  ) : (
    <SuggestionItem name="No Result"></SuggestionItem>
  );
  return <>{suggestionItemJsx}</>;
}
