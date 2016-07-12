var Movie = require('../models/movie.model');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var movie = require('node-movie');


router.get('/', function(req, res) {
  Movie.find(function(err, movies) {
    if(err){
      return res.send("No movie to show");
    }
    res.json(movies);
  });
});

router.post('/', function(req, res) {
  var moviename = req.body.name;
  movie(moviename, function (err, data) {
    var mov = new Movie(data);
    mov.save(function(err) {
      if(err) {
        res.send("Data not added");
      }
      res.send("data added succesfully");
    });
  });
});

router.delete('/:id', function(req, res) {
  Movie.remove({
    _id: req.params.id
  }, function(err, movie) {
    if(err) {
      res.send("Movie id not exist");
    }
    res.json(movie);
  });
});
//update
router.put('/:id', function(req, res) {
  Movie.findOne({ _id: req.params.id}, function(err, movie) {
    if(err) {
      return res.send("Movie id not exist, not able to update");
    }
      for(i in req.body) {
      movie[i] = req.body[i];
    }
    //save
    movie.save(function(err) {
      if(err) {
        return res.send("not able to save");
      }

      res.send(movie);
    });
  });
});
module.exports = router;
