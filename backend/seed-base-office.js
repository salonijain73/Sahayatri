const mongoose = require('mongoose');
const User = require('./models/user.model');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://prf_intengg_mongo_dev_common_user:piramal123@piramal-mongo-dev-cluster-pl-0.fh5op.mongodb.net/sahayatri_db?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedBaseOfficeLocations = async () => {
  try {
    console.log('Starting to seed base office locations...');
    
    // Base office locations
    const baseOffices = ['Kurla', 'Goregaon', 'Bandra', 'Thane'];
    
    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to update`);
    
    // Update each user with a base office location
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const randomOffice = baseOffices[i % baseOffices.length]; // Distribute evenly
      
      // Use updateOne to ensure the update happens
      const result = await User.updateOne(
        { _id: user._id },
        { $set: { baseOfficeLocation: randomOffice } }
      );
      
      console.log(`Updated ${user.name} with base office: ${randomOffice} (matched: ${result.matchedCount}, modified: ${result.modifiedCount})`);
    }
    
    console.log('All users updated successfully!');
    
    // Verify the updates
    const updatedUsers = await User.find({}).select('name baseOfficeLocation');
    console.log('\nVerification - Updated users:');
    updatedUsers.forEach(user => {
      console.log(`${user.name}: ${user.baseOfficeLocation || 'NOT SET'}`);
    });
    
    // Specifically check Saloni Jain
    const saloni = await User.findOne({ name: 'Saloni Jain' });
    console.log('\nSaloni Jain specific check:');
    console.log('Name:', saloni?.name);
    console.log('Base Office Location:', saloni?.baseOfficeLocation);
    
  } catch (error) {
    console.error('Error seeding base office locations:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run the seeding
const runSeed = async () => {
  await connectDB();
  await seedBaseOfficeLocations();
};

runSeed();
