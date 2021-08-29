import { HTMLAttributes } from "react";
import styled from "styled-components";
import theme from "../styles/theme";

export interface ComponentProps extends HTMLAttributes<HTMLElement> {
  hasPillShape?: boolean;
}

const Component = styled.div<ComponentProps>`
  border-radius: ${({ hasPillShape }) => (hasPillShape ? "999px" : "8px")};
  background: ${() => theme.colors.primary};
  background-size: cover;
  background-position: center;
  border: 1px solid ${() => theme.colors.black};
  box-shadow: 4px 4px 0 ${() => theme.colors.black};
  color: ${() => theme.colors.black};
`;

export default Component;
