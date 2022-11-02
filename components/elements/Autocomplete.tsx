import React, { useState, FC, useEffect, ChangeEvent } from "react";
import { Pokemon } from "../../interfaces";

interface Props {
  label: string;
  options: Pokemon[];

  callback: Function;
}

export const Autocomplete: FC<Props> = ({ label, options, callback }) => {
  const [selected, setSelected] = useState<string>("");

  const showFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      const filteredValue = options.filter(
        (option) => option.name?.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      callback(filteredValue);
      setSelected(e.target.value);
    } else {
      callback(options);
      setSelected(e.target.value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center relative p-1 rounded-full w-full">
      <label htmlFor="search" className="text-lg font-poppins font-bold mx-2">
        {label}:{" "}
      </label>
      <input
        id="search"
        type="text"
        className="rounded-lg w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] 2xl:w-[15%] px-2 py-1 mt-2 md:mt-0 bg-neutral-200 placeholder-neutral-400 dark:bg-neutral-600 outline-none"
        value={selected}
        placeholder="Write the name of a Pokemon..."
        onChange={showFilter}
      />
    </div>
  );
};
