import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const StyledInput = styled.input`
  width: 200px;
  padding: 7px;
  border-radius: 2px;
  outline: none;
  border: 1px solid #80808091;
  height: 40px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  position: relative;
`;
const StyledButton = styled.button`
  background-color: #2b00d6;
  width: 80px;
  color: #f4f1f1;
  border-radius: 5px;
  height: 29px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  height: 40px;
`;

const StyledSuggestions = styled.ul`
  position: absolute;
  background-color: white;
  box-shadow: 2px 1px 20px 6px #dfdfe4;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding: 5px 10px;
    font-size: 14px;
  }
  .category-id {
    font-style: italic;
    color: purple;
  }
`;
const Prediction = styled.span`
  font-weight: bold;
`;

const StyleListItem = styled.li``;

function Typeahead({ handleSelect, suggestions }) {
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <>
      <Wrapper>
        <InputWrapper>
          <StyledInput
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              switch (e.key) {
                case "Enter": {
                  e.preventDefault();
                  handleSelect(filteredSuggestions[selectedSuggestionIndex].id);
                  return;
                }
                case "ArrowUp": {
                  e.preventDefault();
                  if (selectedSuggestionIndex > 0) {
                    setSelectedSuggestionIndex(prevState => {
                      return prevState - 1;
                    });
                  }
                }
                case "ArrowDown": {
                  e.preventDefault();
                  if (
                    selectedSuggestionIndex <
                    filteredSuggestions.length - 1
                  ) {
                    setSelectedSuggestionIndex(prevState => {
                      return prevState + 1;
                    });
                  }
                }
              }
            }}
          />
          <StyledSuggestions>
            {value.length > 1 &&
              filteredSuggestions.map(({ title, id, categoryId }, index) => {
                const valueLowerCased = value.toLowerCase();
                const titleLowerCased = title.toLowerCase();
                const splitPoint =
                  titleLowerCased.indexOf(valueLowerCased) + value.length;
                const firstHalf = title.slice(0, splitPoint);
                const secondHalf = title.slice(splitPoint);
                const categoryCapitalized =
                  categoryId[0].toUpperCase() + categoryId.slice(1);
                const isSelected = index === selectedSuggestionIndex;
                return (
                  <StyleListItem
                    key={id}
                    onMouseEnter={() => {
                      setSelectedSuggestionIndex(index);
                    }}
                    style={{
                      background: isSelected
                        ? "hsla(50deg, 100%, 80%, 0.25)"
                        : "transparent"
                    }}
                    onClick={() => handleSelect(id)}
                  >
                    <span>{firstHalf}</span>
                    <Prediction>{secondHalf} </Prediction>
                    in{" "}
                    <span className="category-id">{categoryCapitalized}</span>
                  </StyleListItem>
                );
              })}
          </StyledSuggestions>
        </InputWrapper>
        <StyledButton onClick={() => setValue("")}>Clear</StyledButton>
      </Wrapper>
    </>
  );
}

export default Typeahead;
