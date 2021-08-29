const express = require("express");
const path = require("path");
const cors = require("cors");
const apiv1 = require("./routes/v1");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/api/v1/", apiv1);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging" ||
  1 === 1
) {
  console.log("PATH", path.join(__dirname, "../client/build"));
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
