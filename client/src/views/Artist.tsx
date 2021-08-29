import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Component from "../components/Component";
import Heading from "../components/Heading";
import HeadingWithBack from "../components/HeadingWithBack";
import Layout from "../components/Layout";
import List from "../components/List";
import { ItemProps } from "../components/ListItem";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import theme from "../styles/theme";
import tracksToListItems from "../utils/tracksToListItems";

interface ArtistInfo {
  name: string;
  genres: string[];
  imageUrl: string;
}

const ArtistWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled(Component)`
  width: 200px;
  height: 200px;
  margin-right: 2rem;
`;

const GenresText = styled.p`
  font-weight: bold;
  color: ${theme.colors.white};
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const Artist = () => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>();
  const [tracks, setTracks] = useState<Array<ItemProps>>([]);
  const { id } = useParams<{ id: string }>();
  const { spotifyApi } = useSpotify();

  useEffect(() => {
    spotifyApi.getArtist(id).then((data) => {
      setArtistInfo({
        name: data.body.name,
        genres: data.body.genres,
        imageUrl: data.body.images.length ? data.body.images[0].url : "",
      });
    });
    spotifyApi.getArtistTopTracks(id, "GB").then((data) => {
      setTracks(tracksToListItems(data.body.tracks));
    });
  }, [spotifyApi, id]);

  return (
    <Layout>
      <HeadingWithBack style={{ marginBottom: "2rem" }}>Artist</HeadingWithBack>
      {artistInfo && (
        <ArtistWrapper style={{ marginBottom: "4rem" }}>
          <Avatar
            hasPillShape={true}
            style={{
              backgroundImage: `url(${artistInfo.imageUrl})`,
            }}
          />
          <TextWrapper>
            <Heading>{artistInfo.name}</Heading>
            <GenresText>
              {artistInfo && artistInfo.genres.join(", ")}
            </GenresText>
          </TextWrapper>
        </ArtistWrapper>
      )}

      <Heading remSize={2} style={{ marginBottom: "2rem" }}>
        Popular tracks
      </Heading>
      <List items={tracks} />
    </Layout>
  );
};

export default Artist;
