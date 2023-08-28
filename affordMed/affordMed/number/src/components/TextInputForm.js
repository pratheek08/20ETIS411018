import React, { useState } from "react";
import Number from "./Number";

const TextInputForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [urlArray, setUrlArray] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrlArray(inputValue.split("&url=").map((url) => url.trim()));
  };

  return (
    <div className="max-w-md mx-auto mt-9 p-10 bg-gray-500  shadow-xl rounded-lg ">
      <form onSubmit={handleSubmit}>
        <div className="text-center text-purple-200"><label htmlFor="textInput" className="block  py-3 font-semibold ">
        </label>
        </div>
        <input
          type="text"
          id="textInput"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring focus:border-purple-900"
          placeholder="Enter URLs   Separated by '&url=' "
        />
        <button
          type="submit"
          className="mt-5 px-9 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300"
        >
          Submit
        </button>
      </form>
      <Number urls={urlArray} />
    </div>
  );
};

export default TextInputForm;
