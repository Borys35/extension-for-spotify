import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import HeadingWithBack from "../components/HeadingWithBack";
import Layout from "../components/Layout";
import List from "../components/List";
import { ItemProps } from "../components/ListItem";
import Text from "../components/Text";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import tracksToListItems from "../utils/tracksToListItems";

const Search = () => {
  const [artistItems, setArtistItems] = useState<ItemProps[]>([]);
  const [trackItems, setTrackItems] = useState<ItemProps[]>([]);
  const location = useLocation();
  const { spotifyApi } = useSpotify();
  const artistsLimit = 3,
    tracksLimit = 20;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (!query) {
      setArtistItems([]);
      setTrackItems([]);
      return;
    }

    spotifyApi.searchArtists(query, { limit: artistsLimit }).then((data) => {
      const { artists } = data.body;

      if (!artists) return;

      setArtistItems(
        artists.items.map(({ id, name, type, images }) => ({
          id,
          name,
          type,
          imageUrl: images.length ? images[images.length - 1].url : "",
        }))
      );
    });

    spotifyApi.searchTracks(query, { limit: tracksLimit }).then((data) => {
      const { tracks } = data.body;

      if (!tracks) return;

      setTrackItems(tracksToListItems(tracks.items));
    });
  }, [spotifyApi, location.search]);

  return (
    <Layout>
      <HeadingWithBack style={{ marginBottom: "2rem" }}>Search</HeadingWithBack>
      <Heading remSize={2} style={{ marginBottom: "1rem" }}>
        Artists
      </Heading>
      {artistItems.length ? (
        <List items={artistItems} showIndex={false} />
      ) : (
        <Text>No results</Text>
      )}
      <Heading remSize={2} style={{ margin: "2rem 0 1rem" }}>
        Tracks
      </Heading>
      {trackItems.length ? (
        <List items={trackItems} />
      ) : (
        <Text>No results</Text>
      )}
    </Layout>
  );
};

export default Search;
