const Speaker = require("./models/speaker.js");

// return all records
Speaker.find({}).lean()
  .then((speakers) => {
    console.log(speakers);
  })
  .catch(err => next(err));
