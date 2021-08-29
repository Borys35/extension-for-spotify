import { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import Component from "./Component";
import Button, { ButtonProps } from "./Button";
import theme from "../styles/theme";

interface Props extends ButtonProps {
  url: string;
  text: string;
  subtext?: string;
}

const Container = styled(Button)<{ url: string }>`
  position: relative;
  background-image: url(${({ url }) => url});
  min-width: 100px;
  min-height: 100px;
`;

const TextContainer = styled(Component)`
  position: absolute;
  bottom: -2px;
  left: -2px;
  background: ${() => theme.colors.black};
  color: ${() => theme.colors.primary};
  padding: 0.3em 1em;
  box-shadow: none;
`;

const Text = styled.div<{ size: "sm" | "lg" }>`
  font-size: ${({ size = "sm" }) => {
    switch (size) {
      case "sm":
        return "inherit";
      case "lg":
        return "2rem";
    }
  }};
`;

const Subtext = styled.div`
  font-weight: normal;
  font-size: 1rem;
  margin-top: 0.2rem;
`;

const ImageBlock: FC<Props> = ({ url, text, subtext, ...props }) => {
  return (
    <Container url={url} {...props}>
      <TextContainer>
        <Text size={subtext ? "sm" : "lg"}>{text}</Text>
        {subtext && <Subtext>{subtext}</Subtext>}
      </TextContainer>
    </Container>
  );
};

export default ImageBlock;
