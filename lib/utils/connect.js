const mongoose = require('mongoose');

function connect() {
  console.log(process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb');
  });

  mongoose.connection.on('error', () => {
    console.log('Cannot connect to mongodb');
  });
}

module.exports = connect;
