import { useState } from "react";
import Output from "./Output";

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h3>hello World!</h3>
      {!changedText && <Output>see you</Output>}
      {changedText && <p>changed!</p>}
      <button onClick={changeTextHandler}>changed</button>
    </div>
  );
};

export default Greeting;
