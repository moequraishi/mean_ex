const mongoose = require('mongoose');

// 1. Connect to DB
mongoose.connect('mongodb://localhost/mean-exam-2', {useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

// 2. Defining Schema
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: {type: String, minLength: 3},
  stars: {type: Number, min: 1, max: 5},
  content: {type: String, minLength: 3, maxLength: 255},
  movie: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
}, {timestamps: true});

const MovieSchema = new Schema({
  title: {type: String, minLength: 3, required: true},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
}, {timestamps: true});

// 3. Defining the Models
let Review = mongoose.model('Review', ReviewSchema);
let Movie = mongoose.model('Movie', MovieSchema);

// 4. Export the models
module.exports = {
  Movie: Movie,
  Review: Review
};
