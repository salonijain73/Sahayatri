const mongoose = require('mongoose');
const User = require('./models/user.model');
require('dotenv').config();

// Mumbai coordinates bounds (roughly)
const MUMBAI_BOUNDS = {
  minLat: 18.89,
  maxLat: 19.28,
  minLng: 72.77,
  maxLng: 73.03
};

const designations = [
  'Software Engineer',
  'Product Manager',
  'Business Analyst',
  'HR Manager',
  'Marketing Executive',
  'Data Scientist',
  'Project Manager',
  'Sales Executive',
  'Operations Manager',
  'Research Analyst',
  'UI/UX Designer',
  'Quality Analyst',
  'System Architect',
  'DevOps Engineer',
  'Technical Lead'
];

const areas = [
  'Andheri',
  'Bandra',
  'Powai',
  'Worli',
  'Lower Parel',
  'Malad',
  'Goregaon',
  'Thane',
  'Navi Mumbai',
  'Chembur',
  'Borivali',
  'Kandivali',
  'Ghatkopar',
  'Mulund',
  'Dadar',
  'Kurla',
  'Vikhroli',
  'Vashi',
  'Airoli',
  'Juhu'
];

const transportModes = ['Car', 'Bike', 'Public Transport', 'Walk'];
const genders = ['Male', 'Female'];

function generateRandomPhone() {
  return '9' + Array(9).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
}

function generateRandomLocation() {
  const lat = MUMBAI_BOUNDS.minLat + (Math.random() * (MUMBAI_BOUNDS.maxLat - MUMBAI_BOUNDS.minLat));
  const lng = MUMBAI_BOUNDS.minLng + (Math.random() * (MUMBAI_BOUNDS.maxLng - MUMBAI_BOUNDS.minLng));
  return {
    type: 'Point',
    coordinates: [lng, lat] // MongoDB uses [longitude, latitude] format
  };
}

const firstNames = [
  'Aarav', 'Arjun', 'Kabir', 'Vivaan', 'Aditya', 'Vihaan', 'Reyansh',
  'Parth', 'Ranbir', 'Shaurya', 'Dhruv', 'Ishaan', 'Aryan', 'Karthik',
  'Rohan', 'Rahul', 'Arnav', 'Dev', 'Krishna', 'Yash', 'Zara', 'Aarohi',
  'Ananya', 'Diya', 'Saanvi', 'Avni', 'Aisha', 'Kiara', 'Myra', 'Prisha',
  'Aadhya', 'Kavya', 'Anika', 'Riya', 'Nisha', 'Siya', 'Ahana', 'Ira',
  'Ridhi', 'Meera', 'Jairam', 'Saloni'
];

const lastNames = [
  'Patel', 'Shah', 'Kumar', 'Singh', 'Sharma', 'Mehta', 'Verma', 'Desai',
  'Iyer', 'Kapoor', 'Malhotra', 'Joshi', 'Gupta', 'Shetty', 'Reddy',
  'Nair', 'Rao', 'Chauhan', 'Tiwari', 'Menon', 'Chopra', 'Bhat', 'Yadav',
  'Patil', 'Sinha', 'Dubey', 'Saxena', 'Malik', 'Pillai', 'Chatterjee',
  'Sridharan', 'Jain'
];

// Add fixed users
const fixedUsers = [
  {
    name: 'JAIRAM SRIDHARAN',
    designation: 'MD',
    area: 'Powai',
    address: '123, A Wing, Green Park Apartments, Powai, Mumbai',
    phone: '9876543210',
    gender: 'Male',
    transportMode: 'Car',
    teamsEmail: 'jairam.sridharan@piramal.com',
    location: {
      type: 'Point',
      coordinates: [72.9, 19.1] // Approximate Powai coordinates
    }
  },
  {
    name: 'SALONI JAIN',
    designation: 'Policy Manager',
    area: 'Vile Parle',
    address: '456, B Wing, Sea View Apartments, Vile Parle East, Mumbai',
    phone: '9876543211',
    gender: 'Female',
    transportMode: 'Public Transport',
    teamsEmail: 'saloni.jain@piramal.com',
    location: {
      type: 'Point',
      coordinates: [72.85, 19.12] // Approximate Vile Parle coordinates
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Generate random users
    const randomUsers = Array(98).fill(null).map(() => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const area = areas[Math.floor(Math.random() * areas.length)];
      
      return {
        name: `${firstName} ${lastName}`,
        designation: designations[Math.floor(Math.random() * designations.length)],
        area: area,
        address: `${Math.floor(Math.random() * 200) + 1}, ${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]} Wing, ${['Sunshine', 'Royal', 'Sea View', 'Green Park', 'Palm Court'][Math.floor(Math.random() * 5)]} Apartments, ${area}, Mumbai`,
        phone: generateRandomPhone(),
        gender: genders[Math.floor(Math.random() * genders.length)],
        transportMode: transportModes[Math.floor(Math.random() * transportModes.length)],
        teamsEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@piramal.com`,
        location: generateRandomLocation()
      };
    });

    // Combine fixed and random users
    const allUsers = [...fixedUsers, ...randomUsers];

    // Insert all users
    await User.insertMany(allUsers);
    console.log('Successfully inserted 100 users');

    // Log some sample users
    console.log('\nSample Users:');
    allUsers.slice(0, 5).forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.teamsEmail}`);
      console.log(`   Area: ${user.area}`);
      console.log(`   Transport: ${user.transportMode}`);
    });

    mongoose.connection.close();
    console.log('\nDatabase seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
