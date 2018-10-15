const express = require('express'),
  path = require('path'),
  routes = express.Router(),
  Models = require('../models/model'),
  Movie = Models.Movie,
  Review = Models.Review;

routes.get('/', function(req, res) {
  res.sendFile('index.html');
});

// Create
routes.post('/new', function(req, res) {
  const newReview = new Review({name: req.body.name, stars: req.body.stars, content: req.body.content});

  const newMovie = new Movie({title: req.body.title, reviews: newReview});

  newMovie.save(function(err, data) {
    if (err) {
      console.log('There was an error: ', err);
    } else {
      newReview.movie = data._id;
      newReview.save(function(saveErr, saveData) {
        if (saveErr) {
          console.log('Save review error:', saveErr)
        } else {
          console.log('Movie and Review added:', saveData);
          res.status(200).json(saveData);
        }
      });
    }
  });
});

// Create -> Review
routes.post('/review/:id', function(req, res) {

  Movie.findOne({_id: req.params.id}, function(err, data) {
    if(err) {
      console.log('error setting the data', err);
    } else {
      const newReview = new Review({name: req.body.name, stars: req.body.stars, content: req.body.content});
      newReview.movie = data._id;
      Movie.update({_id: data._id}, {$push: {reviews: newReview}}, function(error, reviewData) {
        if (error) {
          console.log(error)
        } else {
          newReview.save(function(saveErr, saveData) {
            if (saveErr) {
              console.log('There was an error saving', saveErr);
            } else {
              console.log('Successfully saved review', saveData);
              res.json({saveData});
            }
          });
        }
      });
      console.log('Restaurant review added!', data);
    }
  });
});

// Read / get all
routes.get('/get', function (req, res) {
  Movie.find({}, function(err, data) {
    if (err) {
      res.json({message: "Error", error: err});
    } else {
      res.json(data);
    }
  });
});

// Read -> Single Review
routes.get('/movies/:id', function(req, res) {
  Movie.find({_id: req.params.id})
    .populate('reviews')
    .exec(function(err, data){
      if (err){ console.log('There was an error: ', err) }
      else { res.status(200).json(data) }
    });
});

// Delete
routes.post('/remove/:id', function(req, res) {
  Movie.deleteOne({_id: req.params.id}, function (err, data) {
    if (err) {
      console.log("error: ", err);
      res.json({message: "Error", error: err});
    } else {
      console.log('delete success', data);
      res.json({deleted: data});
    }
  });
});

module.exports = routes;
