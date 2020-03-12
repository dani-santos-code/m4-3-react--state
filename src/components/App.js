import React from "react";
import styled from "styled-components";
import data from "../data";
import Typeahead from "./Typeahead";

const Wrapper = styled.div``;

function App() {
  return (
    <>
      <Wrapper>
        <Typeahead
          suggestions={data.books}
          handleSelect={suggestionId => {
            const { title } = data.books.find(el => el.id === suggestionId);
            window.alert(title);
          }}
        />
      </Wrapper>
    </>
  );
}

export default App;
