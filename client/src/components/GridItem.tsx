import { FC } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import Button from "./Button";
import Component from "./Component";
import Heading from "./Heading";

export interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
  index: number;
}

const Container = styled(Button)`
  position: relative;
  color: ${theme.colors.primary};
  padding: 1.5rem;
`;

const Number = styled(Heading)`
  position: absolute;
  top: 0;
  right: 1.5rem;
  z-index: 1;
`;

const Avatar = styled(Component)`
  aspect-ratio: 1/1;
  margin-bottom: 2rem;
`;

const GridItem: FC<ItemProps> = ({ id, name, imageUrl, index }) => {
  return (
    <Container to={`/artist/${id}`}>
      <Number remSize={4.5}>{index + 1}</Number>
      <Avatar
        hasPillShape={true}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Heading remSize={2}>{name}</Heading>
    </Container>
  );
};

export default GridItem;
