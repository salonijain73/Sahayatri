const mongoose = require('mongoose');
const Area = require('./models/area.model');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seedAreas() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing areas
    await Area.deleteMany({});
    console.log('Cleared existing areas');

    // Read areas from mumbaiAreas.txt
    const areasData = fs.readFileSync(path.join(__dirname, 'mumbaiAreas.txt'), 'utf8')
      .split('\n')
      .filter(area => area.trim()); // Remove empty lines

    // Create area objects
    const areaObjects = areasData.map(name => ({ name }));

    // Insert areas
    await Area.insertMany(areaObjects);
    console.log(`Successfully inserted ${areaObjects.length} areas`);

    // Log some sample areas
    console.log('\nSample Areas:');
    areaObjects.slice(0, 5).forEach((area, index) => {
      console.log(`${index + 1}. ${area.name}`);
    });

    mongoose.connection.close();
    console.log('\nArea seeding completed');
  } catch (error) {
    console.error('Error seeding areas:', error);
    process.exit(1);
  }
}

seedAreas();
