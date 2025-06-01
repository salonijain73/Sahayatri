const mongoose = require('mongoose');
const User = require('./models/user.model');

const updateSaloniOffice = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://prf_intengg_mongo_dev_common_user:piramal123@piramal-mongo-dev-cluster-pl-0.fh5op.mongodb.net/sahayatri_db?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully');
    
    // Update Saloni Jain's base office location
    const result = await User.updateOne(
      { name: 'Saloni Jain' },
      { $set: { baseOfficeLocation: 'Bandra' } }
    );
    
    console.log('Update result:', result);
    
    // Verify the update
    const saloni = await User.findOne({ name: 'Saloni Jain' });
    console.log('Saloni after update:', {
      name: saloni.name,
      baseOfficeLocation: saloni.baseOfficeLocation
    });
    
    // Update a few more users for demonstration
    await User.updateOne({ name: 'Aakash Joshi' }, { $set: { baseOfficeLocation: 'Kurla' } });
    await User.updateOne({ name: 'Aarti Soni' }, { $set: { baseOfficeLocation: 'Goregaon' } });
    await User.updateOne({ name: 'Abhinav Mehta' }, { $set: { baseOfficeLocation: 'Thane' } });
    
    console.log('Updated multiple users with base office locations');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

updateSaloniOffice();
