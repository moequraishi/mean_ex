const mongoose = require('mongoose');

// 1. Connect to DB
mongoose.connect('mongodb://localhost/mean-exam-2', {useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

// 2. Defining Schema
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: {type: String, minlength: [3, 'Name must be at least 3 characters.'], required: true},
  stars: {type: Number, min: [1, 'Minimum stars is 1.'], max: [5, 'Max stars is 5.'], required: true},
  content: {type: String, minlength:  [3, 'Content must be at least 3 characters.'], maxlength:  [255, 'Content cannot exceed 255 characters.'], required: true},
  movie: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
}, {timestamps: true});

const MovieSchema = new Schema({
  title: {type: String, minlength: [3, 'Title must be at least 3 characters.'], required: true},
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
