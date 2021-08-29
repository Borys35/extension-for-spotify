import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import HeadingWithBack from "../components/HeadingWithBack";
import Layout from "../components/Layout";
import RadioButtons from "../components/RadioButtons";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";

const TopArtists = () => {
  const [artists, setArtists] = useState<any>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const { spotifyApi } = useSpotify();

  useEffect(() => {
    setArtists([]);
    spotifyApi
      .getMyTopArtists({
        limit: 50,
        time_range: timeRange as
          | "short_term"
          | "long_term"
          | "medium_term"
          | undefined,
      })
      .then((data) => {
        setArtists(
          data.body.items.map(({ id, name, images }) => ({
            id,
            name,
            imageUrl: images.length ? images[0].url : "",
          }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [spotifyApi, timeRange]);

  return (
    <Layout>
      <HeadingWithBack style={{ marginBottom: "2rem" }}>
        Your top artists
      </HeadingWithBack>
      <RadioButtons
        currentValue={timeRange}
        onButtonClick={(value: string) => setTimeRange(value)}
        options={[
          { text: "4 weeks", value: "short_term" },
          { text: "6 months", value: "medium_term" },
          { text: "All time", value: "long_term" },
        ]}
        style={{ marginBottom: "2rem" }}
      />
      <Grid items={artists} />
    </Layout>
  );
};

export default TopArtists;
