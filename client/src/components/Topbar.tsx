import { useEffect, useState } from "react";
import { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import theme from "../styles/theme";
import Button from "./Button";
import SearchInput from "./SearchInput";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = styled.div`
  display: flex;
  padding: ${() => theme.borderSpace};
  font-size: 1.25rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  vertical-align: middle;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const Topbar: FC<Props> = ({ ...props }) => {
  const { me } = useSpotify();
  const avatarUrl = me && me.images && me.images[me.images.length - 1].url;

  return (
    <Container {...props}>
      <SearchInput style={{ flex: 1, marginRight: "2rem" }} />
      <Button hasPillShape={true} to="/my-profile">
        <Avatar src={avatarUrl} alt="Avatar" />
        Your profile
      </Button>
    </Container>
  );
};

export default Topbar;
