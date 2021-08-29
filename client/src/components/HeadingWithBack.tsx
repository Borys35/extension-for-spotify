import { FC, HTMLAttributes } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Heading from "./Heading";

interface Props extends HTMLAttributes<HTMLElement> {}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
`;

const BackIcon = styled(FaArrowLeft)`
  margin-right: 1.5rem;
`;

const HeadingWithBack: FC<Props> = ({ children, ...props }) => {
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <Container onClick={goBack} {...props}>
      <BackIcon size={24} />
      <Heading>{children}</Heading>
    </Container>
  );
};

export default HeadingWithBack;
