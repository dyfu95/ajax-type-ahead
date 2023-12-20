import { useState, useEffect } from "react";
import styled from "styled-components";
import { createAxiosRequest, numberWithCommas } from "../utils";

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

const Suggestions = styled.ul`
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const SuggestionItem = styled.li`
  background: white;
  list-style: none;
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  &:nth-child(even) {
    transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
    background: linear-gradient(to bottom, #ffffff 0%, #efefef 100%);
  }
  &:nth-child(odd) {
    transform: perspective(100px) rotateX(-3deg) translateY(3px);
    background: linear-gradient(to top, #ffffff 0%, #efefef 100%);
  }
`;

const ENDPOINT =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const axiosRequest = createAxiosRequest(ENDPOINT);
export default function Form() {
  const [searchResult, setSearchResult] = useState([]);
  const [loadStatus, setLoadStatus] = useState("stale");
  const getCityOrStateData = async () => {
    try {
      const res = await axiosRequest();
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    setLoadStatus("loading");
    getCityOrStateData()
      .then((res) => {
        setSearchResult(res);
        setLoadStatus("success");
      })
      .catch((err) => {
        setLoadStatus("fail");
        console.error(err);
      });
  }, []);
  const getResultJsx = () => {
    switch (loadStatus) {
      case "stale":
      case "loading":
        return (
          <Suggestions>
            <SuggestionItem>Loading...</SuggestionItem>
          </Suggestions>
        );
      case "success":
        return (
          <Suggestions>
            {searchResult.map((item) => (
              <SuggestionItem key={item.city}>
                {item.city}
                {numberWithCommas(item.population)}
              </SuggestionItem>
            ))}
          </Suggestions>
        );
      case "fail":
        return (
          <div>
            <p>發生非預期的錯誤</p>
          </div>
        );
      default:
        break;
    }
  };
  const resultJsx = getResultJsx();
  return (
    <SearchForm>
      <SearchInput type="text" placeholder="City or State"></SearchInput>
      {resultJsx}
    </SearchForm>
  );
}
