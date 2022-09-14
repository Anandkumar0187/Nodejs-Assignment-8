const express = require("express");
const student = require("./InitialData");
const bodyParser = require("body-parser");
const port = 8080;
const app = express();

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
const studentData = student;

let newId = studentData.length + 1;
app.get("/api/student", async (req, res) => {
  try {
    res.json({ studentData });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
});

app.get("/api/student/:id", async (req, res) => {
  try {
    const idx = studentData.findIndex((obj) => obj.id == req.params.id);
    if (idx == -1) {
      return res.status(400).json({
        status: "failure",
        message: "no data found",
      });
    }
    res.json({
      status: "success",
      data: studentData[idx],
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
});

app.post("/api/student", (req, res) => {
  try {
    if (!req.body.name || !req.body.currentClass || !req.body.division) {
      return res.status(400).json({
        status: "Failed",
        message: "Incomplete data",
      });
    }

    studentData.push({
      id: newId,
      name: req.body.name,
      currentClass: req.body.currentClass,
      division: req.body.division
    });
    newId++;

    // console.log(studentData);
    res.json({
      status: "Sucess",
      id: newId,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failure",
      message: e.message,
    });
  }
});

app.put("/api/student/:id", (req, res) => {
  try {
      const idx = studentData.findIndex((obj => obj.id == req.params.id));
      if (idx == -1) {
          return res.status(400).json({
              status: "Failure",
              message: "There is no student with the given ID"
          })
      }
      if(req.body.name)
          studentData[idx].name = req.body.name;

      if(req.body.currentClass)
          studentData[idx].currentClass = req.body.currentClass;

      if(req.body.division)
          studentData[idx].division = req.body.division;

      res.json({
          status: "Sucess",
          data: studentData[idx]
      });

  } catch (e) {
      res.status(400).json({
          status: "Failure",
          message: e.message
      })
  }
});

app.delete("/api/student/:id", (req, res) => {
  try {
      const idx = studentData.findIndex((obj => obj.id == req.params.id));
      if (idx == -1) {
          return res.status(400).json({
              status: "Failure",
              message: "'Student ID not matched !"
          })
      }
      studentData.splice(idx, 1);
      res.json({
          status: "Sucess",
          messgae: "record deleted"
      });

  } catch (e) {
      res.status(400).json({
          status: "Failure",
          message: e.message
      })
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
