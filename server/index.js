const express = require("express");
const cors = require("cors");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const spotifyCredentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};

let sotdId = "0KGEPwo7mRkU1awGHfkUSt";

app.use(express.json());
app.use(cors());

app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  const spotifyApi = new SpotifyWebApi({ ...spotifyCredentials, refreshToken });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
      console.error(err);
    });
});

app.post("/login", (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi(spotifyCredentials);
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
      console.error(err);
    });
});

app.post("/lyrics", async (req, res) => {
  const { artists, name } = req.body;
  const lyrics = await lyricsFinder(artists, name);
  res.json({ lyrics });
});

app.get("/sotdId", (req, res) => {
  res.json({ sotdId });
});

app.post("/sotdId", (req, res) => {
  const { sotdId: sId, password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) return res.sendStatus(400);

  if (sId) sotdId = sId;

  res.json({ sotdId });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
