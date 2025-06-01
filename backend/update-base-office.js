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

// Base office locations to assign randomly
const baseOfficeLocations = ['Kurla', 'Goregaon', 'Bandra', 'Thane'];

const updateBaseOfficeLocations = async () => {
  try {
    console.log('Starting to update base office locations...');
    
    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to update`);
    
    // Update each user with a random base office location
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const randomOffice = baseOfficeLocations[Math.floor(Math.random() * baseOfficeLocations.length)];
      
      await User.findByIdAndUpdate(user._id, {
        baseOfficeLocation: randomOffice
      });
      
      console.log(`Updated ${user.name} with base office: ${randomOffice}`);
    }
    
    console.log('All users updated successfully!');
    
    // Verify the updates
    const updatedUsers = await User.find({}).select('name baseOfficeLocation');
    console.log('\nVerification - Updated users:');
    updatedUsers.forEach(user => {
      console.log(`${user.name}: ${user.baseOfficeLocation}`);
    });
    
  } catch (error) {
    console.error('Error updating base office locations:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run the update
const runUpdate = async () => {
  await connectDB();
  await updateBaseOfficeLocations();
};

runUpdate();
