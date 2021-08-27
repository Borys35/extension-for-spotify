const router = require("express").Router();
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");

let sotdId = "0KGEPwo7mRkU1awGHfkUSt";

router.post("/refresh", (req, res) => {
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

router.post("/login", (req, res) => {
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

router.post("/lyrics", async (req, res) => {
  const { artists, name } = req.body;
  const lyrics = await lyricsFinder(artists, name);
  res.json({ lyrics });
});

router.get("/sotdId", (req, res) => {
  res.json({ sotdId });
});

router.post("/sotdId", (req, res) => {
  const { sotdId: sId, password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) return res.sendStatus(400);

  if (sId) sotdId = sId;

  res.json({ sotdId });
});

module.exports = router;
