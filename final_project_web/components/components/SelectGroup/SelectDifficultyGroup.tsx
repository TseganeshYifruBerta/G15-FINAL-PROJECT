"use client";
import React, { useState } from "react";

interface SelectDifficultyGroupProps {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  error: boolean;
}
const SelectDifficultyGroup: React.FC<SelectDifficultyGroupProps> = ({setSelectedOption, value, error}) => {
  const [selectedOption, setSelecteddOption] = useState<string>(value);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5 text-md w-2/5 mr-2">
      <label className="block mb-2 font-medium">Difficulty</label>
      <label className="block mb-2 text-sm text-gray-700">
        Select the difficulty of the question
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input text-sm">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            setSelecteddOption(e.target.value);
            changeTextColor();
          }}
          className={`w-full rounded-lg border-2 focus:border px-4 py-2 focus:border-primary appearance-none ${
            error ? "border-red-800" : "border-gray-300"
          } focus:outline-none focus:ring-1 focus:ring-primary`}
        >
          <option value="" disabled>
            Select Difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectDifficultyGroup;
