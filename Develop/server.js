const express = require("express")
// how we communicate database through javascript
const mongoose = require("mongoose")
// where does express and the browswer agree to meet - exchange data
const PORT = process.env.PORT || 3000;
const Workout = require("./models/workout")
const path = require("path");


// create express instance
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


// write express handlers here
app.get("/api/workouts",(req,res) => {
    // mongoose get handler
    Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
    
})

app.post("/api/workouts", (req, res) => {
  console.log("test")
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    Workout.findByIdAndUpdate(req.params.id, { exercises: req.body }, function (err, workout){
      console.log(workout)
    });
      // Workout.create({})
      //   .then(dbWorkout => {
      //     res.json(dbWorkout);
      //   })
      //   .catch(err => {
      //     res.status(400).json(err);
      //   });
    });


app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });