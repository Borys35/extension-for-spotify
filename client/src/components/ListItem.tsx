import { FC } from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import theme from "../styles/theme";
import Button from "./Button";
import Component from "./Component";
import Heading from "./Heading";
import { msToLength } from "../utils/msToLength";
import { useAuth } from "../providers/AuthProvider";
import { useHistory } from "react-router-dom";
import { useSpotify } from "../providers/SpotifyProvider";

export interface ItemProps {
  id: string;
  name: string;
  type: string;
  artists?: Array<SpotifyApi.ArtistObjectSimplified>;
  imageUrl: string;
  uri?: string;
  duration?: number;
  index?: number;
}

const StyledListItem = styled(Button)`
  padding: 0.6rem 1.5rem;
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.primary};
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    margin-right: 1.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ArtistsText = styled.p`
  font-weight: bold;
  color: ${theme.colors.black};
  font-size: 1rem;
`;

const DurationText = styled.p`
  font-weight: bold;
  color: ${theme.colors.black};
  font-size: 0.8rem;
`;

const ListItem: FC<ItemProps> = ({
  id,
  name,
  type,
  artists,
  imageUrl,
  uri,
  duration,
  index,
}) => {
  const history = useHistory();
  const { spotifyApi } = useSpotify();

  function handleClick() {
    if (type === "track" && uri) {
      spotifyApi.play({ uris: [uri] });
    } else if (type === "artist") {
      history.push(`/artist/${id}`);
    }
  }

  return (
    <StyledListItem onClick={handleClick}>
      <Section>
        {index !== undefined && <Heading remSize={2}>{index + 1}</Heading>}
        <Component
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: 48,
            width: 48,
          }}
          hasPillShape={type !== "track"}
        />
        <div>
          <Heading remSize={1.5}>{name}</Heading>
          {artists && (
            <ArtistsText>
              {artists.map((artist) => artist.name).join(", ")}
            </ArtistsText>
          )}
        </div>
      </Section>
      {type === "track" && (
        <Section>
          {duration && <DurationText>{msToLength(duration)}</DurationText>}
          <FaPlay color={theme.colors.black} />
        </Section>
      )}
    </StyledListItem>
  );
};

export default ListItem;
