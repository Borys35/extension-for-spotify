import { useEffect, useState } from "react";
import { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import theme from "../styles/theme";
import Button from "./Button";
import ImageBlock from "./ImageBlock";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${() => theme.borderSpace};

  > * {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Menu: FC<Props> = ({ ...props }) => {
  // const [sotd, setSotd] = useState<SpotifyApi.SingleTrackResponse>();
  const { spotifyApi, sotd } = useSpotify();

  return (
    <Container {...props}>
      <Button to="/">Home</Button>
      <Button to="/top-artists">Your top artists</Button>
      <Button to="/top-tracks">Your top tracks</Button>
      {sotd && (
        <ImageBlock
          url={sotd.album.images[0].url}
          text="Song of the day"
          subtext={`${sotd.artists[0].name} - ${sotd.name}`}
          onClick={() => {
            spotifyApi.play({ uris: [sotd.uri] });
          }}
          style={{ flex: 1 }}
        />
      )}
    </Container>
  );
};

export default Menu;
