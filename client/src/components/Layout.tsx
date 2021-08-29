import { FC } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import Menu from "./Menu";
import Player from "./Player";
import Topbar from "./Topbar";

const Container = styled.main`
  display: grid;
  grid-template-columns: 360px 3fr;
  grid-template-rows: max-content 1fr max-content;
  height: 100%;
`;

const Wrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  padding: ${() => theme.borderSpace};
  overflow: hidden auto;
`;

const Layout: FC = ({ children }) => {
  return (
    <Container>
      <Topbar
        style={{
          gridColumn: "2/3",
          gridRow: "1/2",
          borderBottom: `1px solid ${theme.colors.black}`,
        }}
      />
      <Menu
        style={{
          gridColumn: "1/2",
          gridRow: "1/3",
          borderRight: `1px solid ${theme.colors.black}`,
        }}
      />
      <Player
        style={{
          gridColumn: "1/3",
          gridRow: "3/4",
          borderTop: `1px solid ${theme.colors.black}`,
        }}
      />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Layout;
