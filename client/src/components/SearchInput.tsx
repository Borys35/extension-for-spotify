import { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import theme from "../styles/theme";
import Component from "./Component";
import { useSearch } from "../providers/SearchProvider";
import { useLocation } from "react-router-dom";

interface Props extends HTMLAttributes<HTMLInputElement> {}

const Wrapper = styled(Component)`
  display: flex;
  align-items: center;
  background: ${() => theme.colors.white};
  padding: 0.3rem 1.5rem;
`;

const Input = styled.input`
  font-size: inherit;
  outline: none;
  border: none;
  margin-left: 1rem;
  width: 100%;
`;

const SearchInput: FC<Props> = ({ ...props }) => {
  const { searchQuery, setSearchQuery, openSearchView } = useSearch();
  const location = useLocation();

  return (
    <Wrapper hasPillShape={true} {...props}>
      <FaSearch />
      <Input
        placeholder="Search for Songs, Artists"
        value={searchQuery}
        autoFocus={location.pathname === "/search"}
        onFocus={() => openSearchView()}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Wrapper>
  );
};

export default SearchInput;
