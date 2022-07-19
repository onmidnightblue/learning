import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator'

const Styles = {
  IngredientForm: styled.section`
    width: 30rem;
    margin: 2rem auto;
    max-width: 80%;
    .ingredient-form__actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  FormControl: styled.div`
    label,
    input {
      display: block;
      width: 100%;
    }
    input {
      font: inherit;
      padding: 0.1rem 0.25rem;
      border: none;
      border-bottom: 2px solid #ccc;
      margin-bottom: 1rem;
      &:focus {
        outline: none;
        border-bottom-color: #ff2058;
      }
    }
  `
}

const IngredientForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <Styles.IngredientForm>
      <Card>
        <form onSubmit={submitHandler}>
          <Styles.FormControl>
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value);
              }}
            />
          </Styles.FormControl>
          <Styles.FormControl>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value);
              }}
            />
          </Styles.FormControl>
          <div className="ingredient-form__actions">
            {props.loading ? <LoadingIndicator /> : <button type="submit">Add Ingredient</button>}
          </div>
        </form>
      </Card>
    </Styles.IngredientForm>
  );
});

export default IngredientForm;
