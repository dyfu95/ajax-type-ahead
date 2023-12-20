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

/**
 *
 * @param {Object} props
 * @param {City[] | string[]} props.searchResults
 * @param {boolean} props.isSearched
 * @returns
 */
export default function Suggestions({ searchResults, isSearched }) {
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
      return (
        <SuggestionItem
          key={item.rank}
          name={item.city}
          population={numberWithCommas(item.population)}
        ></SuggestionItem>
      );
    })
  ) : (
    <SuggestionItem name="No Result"></SuggestionItem>
  );
  return <>{suggestionItemJsx}</>;
}
