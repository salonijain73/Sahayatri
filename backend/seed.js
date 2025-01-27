require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

const employeeData = [
  { name: 'Jairam Sridharan', designation: 'CEO', area: 'Powai', address: 'Mumbai-400078', phone: '9876543210', gender: 'Male', transportMode: 'Car' },
  { name: 'Saurabh Mittal', designation: 'CTO', area: 'Worli', address: 'Mumbai-400068', phone: '9876543211', gender: 'Male', transportMode: 'Bike' },
  { name: 'Reshmi Prabhu', designation: 'Head - Business Excellence', area: 'Lower Parel', address: 'Mumbai-400013', phone: '9876543212', gender: 'Female', transportMode: 'Car' },
  { name: 'Akash Rupawani', designation: 'Devops Engineer', area: 'Malad West', address: 'Mumbai-400064', phone: '9876543213', gender: 'Male', transportMode: 'Bike' },
  { name: 'Jaydeep Chakrabarty', designation: 'Director - AI in Tech', area: 'Kharghar', address: 'Mumbai-400063', phone: '9876543214', gender: 'Male', transportMode: 'Car' },
  { name: 'Dharmesh Nagda', designation: 'Head - Credit Policy', area: 'Ghatkopar', address: 'Mumbai-400054', phone: '9876543215', gender: 'Male', transportMode: 'Car' },
  { name: 'Sunit Madan', designation: 'COO', area: 'Chembur East', address: 'Mumbai-400071', phone: '9876543216', gender: 'Male', transportMode: 'Car' },
  { name: 'Saloni Jain', designation: 'Policy Manager', area: 'Vile Parle East', address: 'Mumbai-400057', phone: '9079668485', gender: 'Female', transportMode: 'Auto' },
  { name: 'Aniket Gopale', designation: 'Cloud Engineer', area: 'Mulund West', address: 'Mumbai-400080', phone: '9876543218', gender: 'Male', transportMode: 'Metro' },
  { name: 'Priyanka Singh', designation: 'Relationship Manager', area: 'Vile Parle East', address: 'Mumbai-400076', phone: '9876543219', gender: 'Female', transportMode: 'Auto' },
  { name: 'Aarti Soni', designation: 'Marketing Executive', area: 'Kurla West', address: 'Mumbai-400070', phone: '9876543220', gender: 'Female', transportMode: 'Bus' },
  { name: 'Sandeep Verma', designation: 'Assistant Manager - Finance', area: 'Malad East', address: 'Mumbai-400097', phone: '9876543221', gender: 'Male', transportMode: 'Car' },
  { name: 'Ashwin Reddy', designation: 'Senior Credit Manager', area: 'Worli', address: 'Mumbai-400018', phone: '9876543222', gender: 'Male', transportMode: 'Train' },
  { name: 'Meenal Gupta', designation: 'Financial Advisor', area: 'Kandivali West', address: 'Mumbai-400067', phone: '9876543223', gender: 'Female', transportMode: 'Metro' },
  { name: 'Gaurav Patel', designation: 'Senior Relationship Manager', area: 'Bandra East', address: 'Mumbai-400051', phone: '9876543224', gender: 'Male', transportMode: 'Bike' },
  { name: 'Priya Sharma', designation: 'Senior Risk Manager', area: 'Dadar West', address: 'Mumbai-400028', phone: '9876543225', gender: 'Female', transportMode: 'Train' },
  { name: 'Ravi Saini', designation: 'Personal Loan Officer', area: 'Andheri East', address: 'Mumbai-400059', phone: '9876543226', gender: 'Male', transportMode: 'Bus' },
  { name: 'Shivani Jain', designation: 'Company Secretary', area: 'Ghatkopar East', address: 'Mumbai-400077', phone: '9876543227', gender: 'Female', transportMode: 'Car' },
  { name: 'Manish Chawla', designation: 'Legal Officer', area: 'Borivali West', address: 'Mumbai-400092', phone: '9876543228', gender: 'Male', transportMode: 'Auto' },
  { name: 'Abhinav Mehta', designation: 'Branch Operations Head', area: 'Juhu', address: 'Mumbai-400049', phone: '9876543229', gender: 'Male', transportMode: 'Metro' },
  { name: 'Shruti Shah', designation: 'Loan Officer', area: 'Grant Road', address: 'Mumbai-400007', phone: '9876543230', gender: 'Female', transportMode: 'Train' },
  { name: 'Vikram Yadav', designation: 'Senior Analyst – Mortgage Loans', area: 'Colaba', address: 'Mumbai-400039', phone: '9876543231', gender: 'Male', transportMode: 'Bike' },
  { name: 'Amrita Singh', designation: 'HR Executive', area: 'Sion East', address: 'Mumbai-400022', phone: '9876543232', gender: 'Female', transportMode: 'Auto' },
  { name: 'Pradeep Sharma', designation: 'Risk Management Head', area: 'Malad West', address: 'Mumbai-400064', phone: '9876543233', gender: 'Male', transportMode: 'Car' },
  { name: 'Meghna Joshi', designation: 'Account Manager', area: 'Lower Parel', address: 'Mumbai-400013', phone: '9876543234', gender: 'Female', transportMode: 'Metro' },
  { name: 'Farhan Khan', designation: 'Loan Collection Officer', area: 'Khar West', address: 'Mumbai-400052', phone: '9876543235', gender: 'Male', transportMode: 'Bus' },
  { name: 'Neelam Bhatia', designation: 'Credit Risk Manager', area: 'Parel', address: 'Mumbai-400012', phone: '9876543236', gender: 'Female', transportMode: 'Train' },
  { name: 'Sunil Gupta', designation: 'Compliance Officer', area: 'Matunga East', address: 'Mumbai-400019', phone: '9876543237', gender: 'Male', transportMode: 'Metro' },
  { name: 'Aditi Arora', designation: 'Senior Loan Processing Officer', area: 'Borivali West', address: 'Mumbai-400092', phone: '9876543238', gender: 'Female', transportMode: 'Auto' },
  { name: 'Manoj Kapoor', designation: 'Marketing Strategy Manager', area: 'Powai', address: 'Mumbai-400076', phone: '9876543239', gender: 'Male', transportMode: 'Bike' },
  { name: 'Rina Patel', designation: 'Branch Operations Executive', area: 'Bandra West', address: 'Mumbai-400050', phone: '9876543240', gender: 'Female', transportMode: 'Bus' },
  { name: 'Sudhir Kumar', designation: 'Business Development Manager', area: 'Juhu', address: 'Mumbai-400049', phone: '9876543241', gender: 'Male', transportMode: 'Metro' },
  { name: 'Neha Iyer', designation: 'Financial Analyst', area: 'Dadar East', address: 'Mumbai-400014', phone: '9876543242', gender: 'Female', transportMode: 'Train' },
  { name: 'Arjun Malhotra', designation: 'Loan Documentation Officer', area: 'Santacruz East', address: 'Mumbai-400055', phone: '9876543243', gender: 'Male', transportMode: 'Auto' },
  { name: 'Devika Verma', designation: 'Investment Analyst', area: 'Vikhroli East', address: 'Mumbai-400083', phone: '9876543244', gender: 'Female', transportMode: 'Bus' },
  { name: 'Aakash Joshi', designation: 'Loan Manager', area: 'Ghatkopar West', address: 'Mumbai-400086', phone: '9876543245', gender: 'Male', transportMode: 'Train' },
  { name: 'Priya Reddy', designation: 'HR Manager', area: 'Kandivali East', address: 'Mumbai-400101', phone: '9876543246', gender: 'Female', transportMode: 'Car' },
  { name: 'Arvind Sharma', designation: 'Senior Credit Analyst', area: 'Parel', address: 'Mumbai-400012', phone: '9876543247', gender: 'Male', transportMode: 'Auto' },
  { name: 'Sneha Agarwal', designation: 'Customer Service Manager', area: 'Andheri West', address: 'Mumbai-400058', phone: '9876543248', gender: 'Female', transportMode: 'Metro' },
  { name: 'Shailesh Mehta', designation: 'Senior Loan Advisor', area: 'Malad West', address: 'Mumbai-400064', phone: '9876543249', gender: 'Male', transportMode: 'Train' },
  { name: 'Kavita Nair', designation: 'Marketing Specialist', area: 'Mulund East', address: 'Mumbai-400081', phone: '9876543250', gender: 'Female', transportMode: 'Bike' },
  { name: 'Deepak Joshi', designation: 'IT Manager', area: 'Borivali East', address: 'Mumbai-400066', phone: '9876543251', gender: 'Male', transportMode: 'Metro' },
  { name: 'Isha Kapoor', designation: 'Finance Officer', area: 'Thane West', address: 'Mumbai-400601', phone: '9876543252', gender: 'Female', transportMode: 'Auto' },
  { name: 'Raj Sharma', designation: 'Customer Relations Manager', area: 'Vashi', address: 'Mumbai-400703', phone: '9876543253', gender: 'Male', transportMode: 'Train' },
  { name: 'Anjali Deshmukh', designation: 'Senior Analyst', area: 'Dombivli', address: 'Mumbai-421202', phone: '9876543254', gender: 'Female', transportMode: 'Bus' },
  { name: 'Vikrant Khanna', designation: 'Operations Manager', area: 'Bandra West', address: 'Mumbai-400050', phone: '9876543255', gender: 'Male', transportMode: 'Car' },
  { name: 'Sameer Sheikh', designation: 'Compliance Analyst', area: 'Sion West', address: 'Mumbai-400022', phone: '9876543256', gender: 'Male', transportMode: 'Bike' },
  { name: 'Alok Pandey', designation: 'Financial Planner', area: 'Kurla East', address: 'Mumbai-400024', phone: '9876543257', gender: 'Male', transportMode: 'Train' },
  { name: 'Jitin Saini', designation: 'Credit Risk Manager', area: 'Powai', address: 'Mumbai-400080', phone: '9876543258', gender: 'Male', transportMode: 'Bike' },
  { name: 'Nirav Mehta', designation: 'Lead Credit Policy', area: 'Kandivali West', address: 'Mumbai-400067', phone: '9876543259', gender: 'Male', transportMode: 'Metro' }
];

const areaCoordinates = {
  'Powai': [72.9052, 19.1176],
  'Worli': [72.8182, 19.0096],
  'Lower Parel': [72.8333, 18.9977],
  'Malad West': [72.8479, 19.1871],
  'Kharghar': [73.0674, 19.0474],
  'Ghatkopar': [72.9080, 19.0858],
  'Chembur East': [72.9005, 19.0522],
  'Vile Parle East': [72.8553, 19.0895],
  'Mulund West': [72.9571, 19.1765],
  'Kurla West': [72.8891, 19.0864],
  'Malad East': [72.8479, 19.1871],
  'Kandivali West': [72.8465, 19.2037],
  'Bandra East': [72.8362, 19.0596],
  'Dadar West': [72.8416, 19.0178],
  'Andheri East': [72.8497, 19.1136],
  'Ghatkopar East': [72.9080, 19.0858],
  'Borivali West': [72.8567, 19.2321],
  'Juhu': [72.8296, 19.1075],
  'Grant Road': [72.8182, 18.9731],
  'Colaba': [72.8318, 18.9067],
  'Sion East': [72.8691, 19.0380],
  'Khar West': [72.8362, 19.0700],
  'Parel': [72.8416, 19.0178],
  'Matunga East': [72.8556, 19.0269],
  'Bandra West': [72.8362, 19.0596],
  'Dadar East': [72.8416, 19.0178],
  'Santacruz East': [72.8424, 19.0831],
  'Vikhroli East': [72.9346, 19.1142],
  'Ghatkopar West': [72.9080, 19.0858],
  'Kandivali East': [72.8465, 19.2037],
  'Andheri West': [72.8497, 19.1136],
  'Mulund East': [72.9571, 19.1765],
  'Borivali East': [72.8567, 19.2321],
  'Thane West': [72.9780, 19.2183],
  'Vashi': [72.9987, 19.0760],
  'Dombivli': [73.0944, 19.2094],
  'Sion West': [72.8691, 19.0380],
  'Kurla East': [72.8891, 19.0864]
};

const generateUsers = () => {
  return employeeData.map(employee => ({
    name: employee.name,
    area: employee.area,
    transportMode: employee.transportMode,
    gender: employee.gender,
    designation: employee.designation,
    teamsEmail: `${employee.name.toLowerCase().replace(' ', '.')}@piramal.com`,
    phone: employee.phone,
    address: employee.address,
    location: {
      type: 'Point',
      coordinates: areaCoordinates[employee.area] || [72.8777, 19.0760] // Default to Mumbai coordinates if area not found
    }
  }));
};

const seedDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);

    // Clear existing users
    console.log('Clearing existing users...');
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Generate and insert sample users
    console.log('Generating users...');
    const users = generateUsers();
    console.log(`Generated ${users.length} users`);
    console.log('Sample user:', users[0]);

    console.log('Inserting users into database...');
    await User.insertMany(users);
    console.log(`Added ${users.length} new users`);

    // Verify users were added
    const count = await User.countDocuments();
    console.log(`Total users in database: ${count}`);
    
    const sampleUsers = await User.find().limit(5);
    console.log('Sample users from database:', sampleUsers.map(u => u.name));

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

seedDatabase();
