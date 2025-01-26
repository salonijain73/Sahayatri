require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

const areas = [
  'Andheri', 'Bandra', 'Borivali', 'Chembur', 'Colaba', 'Dadar', 'Dharavi', 
  'Fort', 'Goregaon', 'Juhu', 'Kandivali', 'Kurla', 'Malad', 'Mulund', 
  'Powai', 'Santacruz', 'Thane', 'Versova', 'Vikhroli', 'Worli'
];

const firstNames = [
  'Aadhya', 'Aarav', 'Aisha', 'Arjun', 'Diya', 'Ishaan', 'Kavya', 'Krishna',
  'Meera', 'Neha', 'Priya', 'Rahul', 'Riya', 'Rohan', 'Saanvi', 'Sanjay',
  'Shreya', 'Tanvi', 'Vihaan', 'Zara'
];

const lastNames = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Shah', 'Mehta', 'Verma',
  'Joshi', 'Malhotra', 'Kapoor', 'Reddy', 'Nair', 'Menon', 'Pillai', 'Desai',
  'Iyer', 'Rao', 'Chauhan', 'Shetty'
];

const designations = [
  'Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer',
  'Business Analyst', 'Project Manager', 'Marketing Manager', 'Sales Executive',
  'HR Manager', 'Operations Manager', 'Finance Analyst', 'Research Analyst',
  'Content Writer', 'Digital Marketer', 'System Administrator', 'QA Engineer',
  'DevOps Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer'
];

const transportModes = ['Car', 'Bike', 'Public Transport', 'Walk'];
const genders = ['Male', 'Female'];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const areaCoordinates = {
  'Andheri': [72.8497, 19.1136],
  'Bandra': [72.8362, 19.0596],
  'Borivali': [72.8567, 19.2321],
  'Chembur': [72.9005, 19.0522],
  'Colaba': [72.8318, 18.9067],
  'Dadar': [72.8416, 19.0178],
  'Dharavi': [72.8556, 19.0380],
  'Fort': [72.8347, 18.9345],
  'Goregaon': [72.8479, 19.1663],
  'Juhu': [72.8296, 19.1075],
  'Kandivali': [72.8465, 19.2037],
  'Kurla': [72.8891, 19.0864],
  'Malad': [72.8479, 19.1871],
  'Mulund': [72.9571, 19.1765],
  'Powai': [72.9052, 19.1176],
  'Santacruz': [72.8424, 19.0831],
  'Thane': [72.9780, 19.2183],
  'Versova': [72.8182, 19.1351],
  'Vikhroli': [72.9346, 19.1142],
  'Worli': [72.8182, 19.0096]
};

const generateUsers = (count) => {
  const users = [];
  
  // Generate users
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const area = getRandomElement(areas);
    users.push({
      name: `${firstName} ${lastName}`,
      area: area,
      transportMode: getRandomElement(transportModes),
      gender: getRandomElement(genders),
      designation: getRandomElement(designations),
      teamsEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@piramal.com`,
      phone: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      address: `${area}, Mumbai`,
      location: {
        type: 'Point',
        coordinates: areaCoordinates[area]
      }
    });
  }
  return users;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Generate and insert 100 users
    const users = generateUsers(100);
    await User.insertMany(users);
    console.log('Added 100 new users');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
