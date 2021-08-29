import { useContext, useEffect, useRef } from "react";
import { FC } from "react";
import { useState } from "react";
import { createContext } from "react";
// @ts-ignore
import { useSpotifyWebPlaybackSdk } from "use-spotify-web-playback-sdk";
import { useAuth } from "./AuthProvider";
import { useSpotify } from "./SpotifyProvider";

interface PlayerStateProps {
  id: string;
  name: string;
  artists: string[];
  imageUrl: string;
  isPlaying: boolean;
}

interface ProgressStateProps {
  progress: number;
  duration: number;
}

interface ContextProps {
  playerState?: PlayerStateProps;
  progressState?: ProgressStateProps;
  player: any;
}

const PlayerContext = createContext({} as ContextProps);

export const usePlayer = () => useContext(PlayerContext);

const PlayerProvider: FC = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerStateProps>();
  const [progressState, setProgressState] = useState<ProgressStateProps>();
  const { spotifyApi } = useSpotify();
  const intervalRef = useRef<any>(null);

  const {
    deviceId,
    player, // https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player
    isReady,
  } = useSpotifyWebPlaybackSdk({
    name: "Extension for Spotify (Browser)",
    getOAuthToken: () => spotifyApi.getAccessToken(),
    onPlayerStateChanged: (state: any) => {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        if (
          !state ||
          !data.body ||
          !data.body.item ||
          data.body.item.type !== "track"
        )
          return;

        const { progress_ms, is_playing } = data.body;
        const { id, name, artists, album, duration_ms } = data.body.item;

        if (playerState?.id !== id)
          setPlayerState({
            id,
            name,
            artists: artists.map((a) => a.name),
            imageUrl: album.images[1].url,
            isPlaying: is_playing,
          });

        setProgressState({
          progress: progress_ms || 0,
          duration: duration_ms,
        });
      });
    },
  });

  useEffect(() => {
    if (!isReady || !deviceId) return;

    spotifyApi.transferMyPlayback([deviceId]);
  }, [isReady, deviceId, spotifyApi]);

  useEffect(() => {
    if (!progressState || !playerState || !playerState.isPlaying) return;

    intervalRef.current = setInterval(() => {
      setProgressState({
        ...progressState,
        progress: progressState.progress + 1000,
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [playerState, progressState, setProgressState]);

  const value = { playerState, progressState, player };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerProvider;
