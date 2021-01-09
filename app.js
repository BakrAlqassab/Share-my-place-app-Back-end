const express = require("express");
const bodyParser = require("body-parser");

const locationRoutes = require("./routes/location");

const app = express();
// const distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

// app.set('view engine', 'ejs');
// app.set('views', 'views');
if (process.env.NODE_ENV === "production"{
      app.use(express.static("build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
      });
    }

app.use(bodyParser.json());

app.use((req, res, next) => {
  // ' represent the allowed domains like here localehost 3000 to contact with this server,but her is assigned as all
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(locationRoutes);

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
//   next();
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || 'Unknown User';
//   res.render('index', {
//     user: userName
//   });
// });

app.listen(process.env.PORT || 3000);