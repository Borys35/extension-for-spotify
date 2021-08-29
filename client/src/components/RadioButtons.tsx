import { HTMLAttributes } from "react";
import { FC } from "react";
import styled from "styled-components";
import Button from "./Button";

interface RadioProps {
  text: string;
  value: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  currentValue: string;
  options: Array<RadioProps>;
  onButtonClick: Function;
}

const Container = styled.div`
  display: flex;

  > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const RadioButtons: FC<Props> = ({
  currentValue,
  options,
  onButtonClick,
  ...props
}) => {
  return (
    <Container {...props}>
      {options.map(({ text, value }, i) => (
        <Button
          key={i}
          onClick={() => onButtonClick(value)}
          className={value === currentValue ? "active" : undefined}
        >
          {text}
        </Button>
      ))}
    </Container>
  );
};

export default RadioButtons;
