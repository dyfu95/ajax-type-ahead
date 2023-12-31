import { useState, useEffect } from "react";
import styled from "styled-components";
import { createAxiosRequest, debounce } from "../utils";
import SuggestionItem from "./SuggestionItem";
import Suggestions from "./Suggestions";

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

const SearchForm = styled.form`
  width: 100%;
  max-width: 440px;
  padding: 0 20px;
  margin: 50px auto;
`;
const SearchInput = styled.input`
  display: block;
  outline: none;
  width: 100%;
  padding: 20px 0;
  margin: 0;
  text-align: center;
  border: 10px solid #f7f7f7;
  position: relative;
  border-radius: 5px;
  font-size: 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
`;

const SuggestionsWrapper = styled.ul`
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const ENDPOINT =
  process.env.REACT_APP_OPEN_MOCK_SERVER === "true"
    ? "http://localhost:8080/json/cities.json"
    : "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

/**
 *
 * @param {string} wordToMatch
 * @param {City[]} cities
 * @returns {City[]}
 */
const findMatches = (wordToMatch, cities) => {
  return cities.filter((place) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
};

const axiosRequest = createAxiosRequest(ENDPOINT);

export default function Form() {
  const [cities, setCities] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [keywords, setKeyWords] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const getCityOrStateData = async () => {
    try {
      const res = await axiosRequest();
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  /**
   * @param {{ target: HTMLInputElement }} e
   */
  const handleOnChange = debounce((e) => {
    const value = e.target.value.trim();
    setKeyWords(value);
    if (!value) {
      setIsSearched(false);
      setSearchResult([]);
    } else {
      let findResult = [];
      const localStorageKey = `ajax-type-ahead-${value}`;
      const ls = localStorage.getItem(localStorageKey);
      const currentTimestamp = new Date().getTime();

      if (!ls) {
        findResult = findMatches(value, cities);

        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            timestamp: currentTimestamp,
            result: findResult,
          })
        );
      } else {
        const storeValue = JSON.parse(ls);
        const storeTimestamp = storeValue.timestamp;
        //localStorage 所儲存的資料其儲存時間是否過久（超過一天），若是的話則清除對應的資料。
        if (currentTimestamp - storeTimestamp > 1000 * 60 * 24) {
          localStorage.removeItem(localStorageKey);
          findResult = findMatches(value, cities);
        } else {
          findResult = storeValue.result;
        }
      }
      setSearchResult(findResult);
      setIsSearched(true);
    }
  });

  useEffect(() => {
    getCityOrStateData()
      .then((res) => {
        setCities(res);
        setLoadStatus("success");
      })
      .catch((err) => {
        setLoadStatus("fail");
        console.error(err);
      });
  }, []);
  const getResultJsx = () => {
    switch (loadStatus) {
      case "loading":
        return <SuggestionItem name="Loading..." />;
      case "success":
        return (
          <Suggestions
            searchResults={searchResults}
            keywords={keywords}
            isSearched={isSearched}
          />
        );
      case "fail":
        return (
          <div>
            <p>發生非預期的錯誤</p>
          </div>
        );
      default:
        return null;
    }
  };
  const resultJsx = getResultJsx();
  return (
    <SearchForm>
      <SearchInput
        type="text"
        onChange={handleOnChange}
        placeholder="City or State"
      ></SearchInput>
      <SuggestionsWrapper>{resultJsx}</SuggestionsWrapper>
    </SearchForm>
  );
}
