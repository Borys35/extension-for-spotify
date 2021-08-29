import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FC } from "react";
import { createContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useAuth } from "./AuthProvider";

interface ContextProps {
  readonly spotifyApi: SpotifyWebApi;
  me?: SpotifyApi.CurrentUsersProfileResponse;
  sotd?: SpotifyApi.SingleTrackResponse;
  setSotd: Function;
}

const SpotifyContext = createContext({} as ContextProps);

export const useSpotify = () => useContext(SpotifyContext);

const spotifyApi = new SpotifyWebApi({
  clientId: "51fe8697736c45858e634df10a31832b",
});

const SpotifyProvider: FC = ({ children }) => {
  const [me, setMe] = useState<SpotifyApi.CurrentUsersProfileResponse>();
  const [sotd, setSotd] = useState<SpotifyApi.SingleTrackResponse>();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe().then((data) => {
      setMe(data.body);
    });

    axios.get("/api/v1/sotdId").then(({ data }) => {
      spotifyApi.getTrack(data.sotdId).then((data) => {
        setSotd(data.body);
      });
    });
  }, [accessToken]);

  const value = { spotifyApi, me, sotd, setSotd };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};

export default SpotifyProvider;
