export default function tracksToListItems(
  tracks: Array<SpotifyApi.TrackObjectFull>
) {
  return tracks.map(({ id, name, type, artists, album, uri, duration_ms }) => ({
    id,
    name,
    type,
    artists,
    imageUrl: album.images[album.images.length - 1].url,
    uri,
    duration: duration_ms,
  }));
}
