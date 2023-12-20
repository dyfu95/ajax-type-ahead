import styled from "styled-components";

const Item = styled.li`
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
  .population {
    font-size: 15px;
  }
`;

export default function SuggestionItem({ name, population = undefined }) {
  return (
    <Item>
      <p className="name">{name}</p>
      {population && <p className="population">{population}</p>}
    </Item>
  );
}
