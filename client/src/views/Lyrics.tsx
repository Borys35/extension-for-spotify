import { useState, useEffect } from "react";
// @ts-ignore
import lyricsFinder from "lyrics-finder";
import HeadingWithBack from "../components/HeadingWithBack";
import Layout from "../components/Layout";
import Text from "../components/Text";
import { usePlayer } from "../providers/PlayerProvider";
import axios from "axios";
import Heading from "../components/Heading";

const Lyrics = () => {
  const [lyrics, setLyrics] = useState("Loading...");
  const { playerState } = usePlayer();

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    (async () => {
      if (!playerState) return;

      setLyrics("Loading...");

      const { name, artists } = playerState;
      const artistsString = artists.join(", ");
      const res = await axios.post("api/v1/lyrics", {
        artists: artistsString,
        name,
        cancelToken: source.token,
      });

      setLyrics(
        res.data.lyrics || `Not Found for "${artistsString} - ${name}"`
      );
    })();

    return () => {
      source.cancel("cancelled");
    };
  }, [playerState]);

  return (
    <Layout>
      {playerState && (
        <>
          <HeadingWithBack style={{ marginBottom: "2rem" }}>
            Current Lyrics
          </HeadingWithBack>
          <Heading remSize={1.5} style={{ marginBottom: "2rem" }}>
            {playerState.artists.join(", ")} - {playerState.name}
          </Heading>
          <Text style={{ whiteSpace: "pre-wrap" }}>{lyrics}</Text>
        </>
      )}
    </Layout>
  );
};

export default Lyrics;
