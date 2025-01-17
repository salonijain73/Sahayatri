const mongoose = require('mongoose');
const User = require('./models/user.model');
require('dotenv').config();

async function dropIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.collection.dropIndexes();
    console.log('Dropped all indexes');

    // Recreate only the geospatial index
    await User.collection.createIndex({ location: '2dsphere' });
    console.log('Recreated geospatial index');

    mongoose.connection.close();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

dropIndexes();
