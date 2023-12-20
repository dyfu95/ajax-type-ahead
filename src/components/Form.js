import styled from "styled-components";

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

export default function Form() {
  return (
    <SearchForm>
      <SearchInput
        type="text"
        class="search"
        placeholder="City or State"
      ></SearchInput>
      <Suggestions class="suggestions">
        <SuggestionItem>Filter for a city</SuggestionItem>
        <SuggestionItem>or a state</SuggestionItem>
      </Suggestions>
    </SearchForm>
  );
}
