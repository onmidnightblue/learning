import React from 'react';
import styled from 'styled-components';

const Styles = {
  ErrorModal: styled.div`
    position: fixed;
    top: 30vh;
    left: calc(50% - 15rem);
    width: 30rem;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    z-index: 100;
    border-radius: 7px;
    h2 {
      margin: 0;
      padding: 1rem;
      background: #ff2058;
      color: white;
      border-radius: 7px 7px 0 0;
      text-align: center;
    }
    p {
      padding: 1rem;
    }
    .error-modal__actions {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.5rem;
    }
  `,
  Backdrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 50;
  `
}

const ErrorModal = React.memo(props => {
  return (
    <>
      <Styles.Backdrop onClick={props.onClose} />
      <Styles.ErrorModal>
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </Styles.ErrorModal>
    </>
  );
});

export default ErrorModal;
