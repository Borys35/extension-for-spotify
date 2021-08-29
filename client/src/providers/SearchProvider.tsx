import { useCallback, useEffect } from "react";
import { useState } from "react";
import { FC, useContext, createContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

interface ContextProps {
  searchQuery: string;
  setSearchQuery: Function;
  openSearchView: Function;
}

const SearchContext = createContext({} as ContextProps);

export const useSearch = () => useContext(SearchContext);

const SearchProvider: FC = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const history = useHistory();

  const openSearchView = useCallback(() => {
    // set url with search query
    const params = new URLSearchParams();

    if (searchQuery) {
      params.append("query", searchQuery);
      history.replace({ pathname: "/search", search: params.toString() });
    } else {
      params.delete("query");
      if (location.pathname === "/search")
        history.replace({ pathname: "/search", search: params.toString() });
    }
  }, [history, searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (query) setSearchQuery(query);
  }, []);

  useEffect(() => {
    openSearchView();
  }, [searchQuery, openSearchView]);

  const value = { searchQuery, setSearchQuery, openSearchView };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
