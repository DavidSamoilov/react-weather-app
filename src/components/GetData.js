import React, { useState } from "react";
import ErrorMsg from "./ErrorMsg";
import DisplayData from "./DisplayData";

const GetData = () => {
  let key = "adc5ef54e635c32068f70359e11e4ebc";
  let [userInput, setUserInput] = useState("");
  let [searchError, setSearchError] = useState(false);
  let [showCard, setShowCard] = useState(false);

  const setStatesToDisplayCard = () => {
    setShowCard(true);
    setSearchError(false);
  };

  const setStatesToDisplayErrorMsg = () => {
    setShowCard(false);
    setSearchError(true);
  };

  async function showData() {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${key}`
      );
      let result = await response.json();
      if (result.cod === "404" || result.cod === "400") {
        setStatesToDisplayErrorMsg();
        return;
      }

      setStatesToDisplayCard();
      console.log(1);
    } catch (error) {
      setStatesToDisplayErrorMsg();
    }
  }
  const inputUpdate = (e) => {
    setUserInput(e.target.value);
    console.log(userInput);
  };

  return (
    <>
      <input type="text" onChange={inputUpdate} value={userInput} />
      <button onClick={showData}>Submit</button>
      {searchError ? <ErrorMsg /> : showCard && <DisplayData />}
    </>
  );
};

export default GetData;
