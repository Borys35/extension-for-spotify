import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ImageBlock from "../components/ImageBlock";
import Layout from "../components/Layout";
import Text from "../components/Text";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import theme from "../styles/theme";

const Section = styled.section`
  margin-bottom: 6rem;

  &:last-child {
    margin-bottom: 0;
  }

  > * {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BlocksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 250px;
  gap: 2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Home = () => {
  const [topTrackImageUrl, setTopTrackImageUrl] = useState("");
  const [topArtistImageUrl, setTopArtistImageUrl] = useState("");
  const { spotifyApi } = useSpotify();

  useEffect(() => {
    spotifyApi
      .getMyTopTracks({ limit: 1, time_range: "short_term" })
      .then((data) =>
        setTopTrackImageUrl(data.body.items[0].album.images[0].url)
      );

    spotifyApi
      .getMyTopArtists({ limit: 1, time_range: "short_term" })
      .then((data) => setTopArtistImageUrl(data.body.items[0].images[0].url));
  }, [spotifyApi]);

  return (
    <Layout>
      <Section>
        <Heading>Extension for Spotify</Heading>
        <BlocksContainer>
          <ImageBlock
            url={topArtistImageUrl}
            text="Your top artists"
            to="/top-artists"
          />
          <ImageBlock
            url={topTrackImageUrl}
            text="Your top tracks"
            to="/top-tracks"
          />
        </BlocksContainer>
      </Section>
      <Section>
        <Heading>Some links</Heading>
        <ButtonsContainer>
          <Button href="https://github.com" target="_blank">
            Source code
          </Button>
          <Button
            href="mailto:boryskac10@gmail.com"
            style={{ background: theme.colors.blue }}
          >
            E-mail
          </Button>
          <Button
            href="https://open.spotify.com/user/ynbx97gvj0yplrg62v0esozxp?si=77273d759c594a26"
            target="_blank"
            style={{ background: theme.colors.green }}
          >
            My Spotify
          </Button>
        </ButtonsContainer>
      </Section>
      <Section>
        <Text>&copy; {new Date().getFullYear()}, Borys</Text>
      </Section>
    </Layout>
  );
};

export default Home;
