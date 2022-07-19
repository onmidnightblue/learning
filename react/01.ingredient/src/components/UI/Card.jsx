import React from 'react';
import styled from 'styled-components';

const Styles = {
  Card: styled.div`
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  `
}

const Card = props => {
  return <Styles.Card>{props.children}</Styles.Card>;
};

export default Card;
