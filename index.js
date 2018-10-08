const express = require('express');
const api = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/X';
/*const session = require('express-session');
const mongoStore = require('connect-mongo')(session);*/

// connect to mongoose

(async function () {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (e) {
    console.log(e);
  }
})();

/*app.use(session({
  secret: 'xyz',
  resave: true,
  saveUninitialized: false
}));*/

const jobPosts = [];
const savedJobs = [];

api.use(bodyParser.json());
api.use(cors());

api.get('/', (req, res) => {
    res.send('hello');
});
api.get('/job-posts', (req, res) => {
    res.send(jobPosts);
});
api.post('/job-posts', (req, res) => {
    let title = req.body.title;
    let jobID = req.body.jobID;
    let description = req.body.description;
    jobPosts.push({ title, jobID, description });
    res.send(jobPosts);
});
api.delete('/job-posts/:jobID', (req, res) => {
    let postFinder = jobPosts.findIndex(jobPost => jobPost.jobID == req.params.jobID);
    if (postFinder > (-1)) {
        jobPosts.splice(postFinder, 1)
    };
    res.send(jobPosts);
});
api.get('/saved-jobs', (req, res) => {
    res.send(savedJobs);
});
api.post('/saved-jobs', (req, res) => {
    let userID = req.body.userID;
    let jobID = req.body.jobID;
    savedJobs.push({ userID, jobID });
    res.send(savedJobs);
});
api.delete('/saved-jobs/:jobID', (req, res) => {
    let jobFinder = savedJobs.findIndex(savedJob => savedJob.jobID == req.params.jobID);
    if (jobFinder > (-1)) {
        savedJobs.splice(jobFinder, 1)
    };
    res.send(savedJobs);
});
api.get('/job-likes/:jobID', (req, res) => {
    let filteredSaves = savedJobs.filter(savedJob => savedJob.jobID == req.params.jobID);
    res.send(filteredSaves.length);
});
api.listen(4210);