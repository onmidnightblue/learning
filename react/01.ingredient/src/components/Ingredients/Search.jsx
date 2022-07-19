import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Card from "../UI/Card";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Styles = {
  Search: styled.section`
    width: 30rem;
    margin: 2rem auto;
    max-width: 80%;
    .search-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      input {
        font: inherit;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.15rem 0.25rem;
        &:focus {
          outline: none;
          border-color: #ff2058;
        }
      }
    }
    @media (min-width: 768px) {
      .search-input {
        flex-direction: row;
      }
    }
  `,
};

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://react-b327f-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          "GET"
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <Styles.Search>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>loading...</span>}
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
            ref={inputRef}
          />
        </div>
      </Card>
    </Styles.Search>
  );
});

export default Search;
