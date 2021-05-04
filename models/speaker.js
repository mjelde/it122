const mongoose = require('mongoose');
const { Schema } = mongoose;

// For security, connectionString should be in a separate file not committed to git
const connectionString = "mongodb+srv://dbuser:Austin512@cluster0.zuoo4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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