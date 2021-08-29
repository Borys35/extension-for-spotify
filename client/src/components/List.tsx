import { FC } from "react";
import styled from "styled-components";
import ListItem, { ItemProps } from "./ListItem";

interface Props {
  items: Array<ItemProps>;
  showIndex?: boolean;
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const List: FC<Props> = ({ items, showIndex = true }) => {
  return (
    <StyledList>
      {items.map((item, i) => (
        <ListItem key={item.id} {...item} index={showIndex ? i : undefined} />
      ))}
    </StyledList>
  );
};

export default List;
