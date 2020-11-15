const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Add headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/marks", (req, res) => {
  var subjects = req.body;
  var min = subjects[0].mark,
    max = subjects[0].mark,
    minSub = subjects[0].name,
    maxSub = subjects[0].name;
  var total = 0.0,
    percent = 0.0;
  subjects.map((m) => {
    total += parseFloat(m.mark);

    if (min > m.mark) {
      min = m.mark;
      console.log(min);
      minSub = m.name;
    }

    if (max < m.mark) {
      max = m.mark;
      maxSub = m.name;
    }
  });

  percent = (total / (subjects.length * 100)) * 100;

 
  res.send({
    percent: percent.toFixed(2),
    min: min,
    max: max,
    minSub: minSub,
    maxSub: maxSub,
  });
});

const port = 5000;
app.listen(5000, function () {
  console.log("Listening to port " + port);
});
