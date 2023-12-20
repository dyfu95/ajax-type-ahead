const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/json/:filename", (req, res) => {
  const filepath = path.resolve(__dirname, `./json/${req.params.filename}`);
  res.sendFile(filepath, {
    headers: {
      "Content-Type": "application/json",
    },
  });
});

app.listen(8080, () => {
  console.log(
    "\033[32m[mock server]\033[0m started mock server on 0.0.0.0:8080, url: http://localhost:8080"
  );
});
