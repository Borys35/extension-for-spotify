import React, {
  MutableRefObject,
  useEffect,
  useRef,
  FC,
  HTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaAlignCenter,
} from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import styled from "styled-components";
// @ts-ignore
import { useSpotifyWebPlaybackSdk } from "use-spotify-web-playback-sdk";
import { useAuth } from "../providers/AuthProvider";
import { usePlayer } from "../providers/PlayerProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import theme from "../styles/theme";
import { initSpotifyPlayer } from "../utils/initSpotifyPlayer";
import { msToLength } from "../utils/msToLength";
import Component from "./Component";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = styled.div`
  padding: ${() => theme.borderSpace};
`;

const StyledPlayer = styled(Component)`
  position: relative;
  height: 100%;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SmallContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`;

const StyledName = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LyricsIcon = styled(FaAlignCenter)`
  margin-right: 0.5rem;
`;

const HiddenElement = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MiddleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;

const EvenlySpaced = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -0.25rem;
  font-size: 0.9rem;
`;

const ButtonsContainer = styled.div`
  margin-top: 0.75rem;

  > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Player: FC<Props> = ({ ...props }) => {
  const progressSliderRef = useRef<HTMLInputElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const { spotifyApi } = useSpotify();
  const { playerState, progressState, player } = usePlayer();

  function getRangeWidth(progress: number, duration: number) {
    return (progress / duration) * 100;
  }

  useEffect(() => {
    if (!progressSliderRef.current || !progressState) return;

    progressSliderRef.current.valueAsNumber = getRangeWidth(
      progressState.progress,
      progressState.duration
    );

    player.getVolume().then((volume: number) => {
      if (!volumeSliderRef.current) return;

      volumeSliderRef.current.valueAsNumber = volume * 100;
    });
  }, [progressState, player]);

  return (
    <Container {...props}>
      <IconContext.Provider
        value={{ size: "20px", style: { cursor: "pointer" } }}
      >
        {playerState && progressState && (
          <StyledPlayer hasPillShape={true}>
            <SmallContainer>
              <Component
                style={{
                  backgroundImage: `url(${playerState.imageUrl})`,
                  height: 64,
                  width: 64,
                  minWidth: 64,
                  marginRight: "1.25rem",
                }}
              />
              <HiddenElement>
                <StyledName>
                  <Link to="/lyrics">
                    <LyricsIcon />
                  </Link>{" "}
                  {playerState.name}
                </StyledName>
                <HiddenElement>{playerState.artists.join(", ")}</HiddenElement>
              </HiddenElement>
            </SmallContainer>
            <MiddleContainer>
              <EvenlySpaced style={{ width: "100%" }}>
                <p>{msToLength(progressState.progress || 0)}</p>
                <p>{msToLength(progressState.duration)}</p>
              </EvenlySpaced>
              <input
                ref={progressSliderRef}
                type="range"
                min={0}
                max={100}
                defaultValue={getRangeWidth(
                  progressState.progress,
                  progressState.duration
                )}
                onChange={(e) =>
                  player.seek(
                    progressState.duration * (parseFloat(e.target.value) / 100)
                  )
                }
                style={{ width: "100%" }}
              />
              <ButtonsContainer>
                <FaChevronLeft onClick={() => spotifyApi.skipToPrevious()} />
                {playerState.isPlaying ? (
                  <FaPause onClick={() => spotifyApi.pause()} />
                ) : (
                  <FaPlay onClick={() => spotifyApi.play()} />
                )}
                <FaChevronRight onClick={() => spotifyApi.skipToNext()} />
              </ButtonsContainer>
            </MiddleContainer>
            <SmallContainer>
              <FaVolumeUp
                style={{ margin: "0 1.25rem 0 auto", cursor: "default" }}
              />
              <input
                ref={volumeSliderRef}
                type="range"
                min={0}
                max={100}
                onChange={(e) =>
                  player.setVolume(parseFloat(e.target.value) / 100)
                }
              />
            </SmallContainer>
          </StyledPlayer>
        )}
      </IconContext.Provider>
    </Container>
  );
};

export default Player;
