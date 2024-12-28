import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const innitialState = {
  address: "",
  action: "Buy",
  type: "House",
  price: "",
  priceRange: [0, 1000000],
  results: [],
  page: "",
  loading: false,
};

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(innitialState);

  console.log("SearchProvider render", { search, innitialState });

  return (
    <SearchContext.Provider value={[search, setSearch, innitialState]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };