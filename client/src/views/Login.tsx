import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Centered from "../components/Centered";
import theme from "../styles/theme";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?" +
  "response_type=code&" +
  "client_id=51fe8697736c45858e634df10a31832b&" +
  `redirect_uri=${window.location.protocol}//${window.location.hostname}&` +
  "scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  return (
    <Centered>
      <Wrapper>
        <Heading style={{ marginBottom: "2rem" }}>
          Extension for Spotify
        </Heading>
        <Button href={AUTH_URL} style={{ background: theme.colors.green }}>
          Login with Spotify
        </Button>
      </Wrapper>
    </Centered>
  );
};

export default Login;
