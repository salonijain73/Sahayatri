const mongoose = require('mongoose');
const User = require('./models/user.model');

const checkSaloni = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://prf_intengg_mongo_dev_common_user:piramal123@piramal-mongo-dev-cluster-pl-0.fh5op.mongodb.net/sahayatri_db?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully');
    
    // Find Saloni Jain
    const saloni = await User.findOne({ name: 'Saloni Jain' });
    
    if (saloni) {
      console.log('Saloni Jain found:');
      console.log('Name:', saloni.name);
      console.log('Base Office Location:', saloni.baseOfficeLocation);
      console.log('Area:', saloni.area);
      console.log('Transport Mode:', saloni.transportMode);
      console.log('Custom Transport Mode:', saloni.customTransportMode);
      console.log('Full record:', JSON.stringify(saloni, null, 2));
    } else {
      console.log('Saloni Jain not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

checkSaloni();
