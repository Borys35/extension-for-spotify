// @ts-nocheck

export function initSpotifyPlayer(accessToken: string) {
  console.log("init....", window.onSpotifyWebPlaybackSDKReady);
  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log("readyyy");

    const player = new Spotify.Player({
      name: "Extension for Spotify (Browser)",
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
    });

    // Error handling
    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener("player_state_changed", (state) => {
      console.log(state);
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };
}
