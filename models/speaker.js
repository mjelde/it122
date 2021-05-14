const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connectionString = require('../credentials.js');

mongoose.connect(connectionString, {
    dbName: 'projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const speakerSchema = new Schema({
 name: { type: String, required: true },
 speaker: String,
 birthDate: Number,
 birthPlace: String
});

module.exports = mongoose.model('Speaker', speakerSchema);