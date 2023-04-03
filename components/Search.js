import { useRouter } from "next/router";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearchEnter = (event) => {
    if (event.key === "Enter") {
      if (search !== "") {
        router.push(`/search/${search}`);
      }
    }
  };

  const onSearchClick = () => {
    if (search !== "") {
      router.push(`/search/${search}`);
    }
  };

  return (
    <div className="flex">
      <input
        className="self-center h-12 px-3 py-2 mr-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline s:w-56 sm:w-64 md:w-72"
        autoComplete="off"
        id="search"
        type="text"
        placeholder="Search..."
        onKeyDown={(event) => onSearchEnter(event)}
        onChange={(event) => onSearchChange(event)}
      ></input>
      <button
        className="self-center px-4 py-3 mr-3 font-bold text-white rounded-lg bg-bblue hover:bg-bblueHover"
        onClick={() => onSearchClick()}
      >
        Search
      </button>
    </div>
  );
}
