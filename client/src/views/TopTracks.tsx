import { useEffect, useState } from "react";
import HeadingWithBack from "../components/HeadingWithBack";
import Layout from "../components/Layout";
import List from "../components/List";
import { ItemProps } from "../components/ListItem";
import RadioButtons from "../components/RadioButtons";
import { useAuth } from "../providers/AuthProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import tracksToListItems from "../utils/tracksToListItems";

const TopTracks = () => {
  const [tracks, setTracks] = useState<Array<ItemProps>>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const { spotifyApi } = useSpotify();

  useEffect(() => {
    setTracks([]);
    spotifyApi
      .getMyTopTracks({
        limit: 50,
        time_range: timeRange as
          | "short_term"
          | "long_term"
          | "medium_term"
          | undefined,
      })
      .then((data) => {
        setTracks(tracksToListItems(data.body.items));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [spotifyApi, timeRange]);

  return (
    <Layout>
      <HeadingWithBack style={{ marginBottom: "2rem" }}>
        Your top tracks
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
      <List items={tracks} />
    </Layout>
  );
};

export default TopTracks;
