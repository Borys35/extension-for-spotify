import styled from "styled-components";
import theme from "../styles/theme";

const Heading = styled.h1<{ remSize?: number }>`
  font-size: ${({ remSize }) => (remSize ? `${remSize}rem` : "3rem")};
  text-shadow: 0.1em 0.1em ${() => theme.colors.black};
  -webkit-text-stroke: 1px ${() => theme.colors.black};
`;

export default Heading;
