import { FC } from "react";
import styled from "styled-components";
import GridItem, { ItemProps } from "./GridItem";

interface Props {
  items: Array<ItemProps>;
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
`;

const Grid: FC<Props> = ({ items }) => {
  return (
    <StyledGrid>
      {items.map((item, i) => (
        <GridItem key={i} {...item} index={i} />
      ))}
    </StyledGrid>
  );
};

export default Grid;
