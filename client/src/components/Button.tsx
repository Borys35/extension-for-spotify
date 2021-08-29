import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Component, { ComponentProps } from "./Component";

export interface ButtonProps extends ComponentProps {
  to?: string;
  href?: string;
  target?: string;
  active?: boolean;
}

const StyledButton = styled(Component)`
  padding: 0.3em 1em;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  cursor: pointer;

  &:active,
  .active {
    box-shadow: none;
    transform: translate(4px, 4px);
  }
`;

const Button: FC<ButtonProps> = ({ children, to, href, ...props }) => {
  if (to)
    return (
      <StyledButton as={Link} to={to} {...props}>
        {children}
      </StyledButton>
    );

  if (href)
    return (
      <StyledButton as="a" href={href} {...props}>
        {children}
      </StyledButton>
    );

  return (
    <StyledButton as="button" {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
