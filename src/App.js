import { GlobalStyles } from "./style/GlobalStyle";
import styled from "styled-components";
import Form from "./components/Form";
const Main = styled.main`
  width: 100%;
  height: 100%;
  background: #ffc600;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <Main>
        <Form></Form>
      </Main>
    </>
  );
}

export default App;
