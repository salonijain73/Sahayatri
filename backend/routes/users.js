const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

// Get users with pagination
router.get('/', async (req, res) => {
  try {
    // If page parameter is provided, return paginated results
    if (req.query.page) {
      const page = parseInt(req.query.page);
      const limit = 10;
      const skip = (page - 1) * limit;

      console.log('GET /api/users - Fetching paginated users:', { page, limit });

      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);

      const users = await User.find()
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 });

      console.log(`Found ${users.length} users (page ${page} of ${totalPages})`);
      
      return res.json({
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasMore: page < totalPages
        }
      });
    }

    // If no page parameter, return all users (for Profile component)
    console.log('GET /api/users - Fetching all users');
    try {
      const users = await User.find().sort({ name: 1 });
      console.log('MongoDB connection state:', mongoose.connection.readyState);
      console.log('All users:', users.map(u => ({ name: u.name, id: u._id })));
      console.log(`Found ${users.length} users`);
      
      if (!users || users.length === 0) {
        console.log('No users found in database');
        return res.status(404).json('No users found');
      }
      
      // Return users array directly for Profile component
      res.json(users);
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json('Database error: ' + dbError.message);
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Search users by area
router.get('/search/area/:area', async (req, res) => {
  try {
    console.log(`GET /api/users/search/area/${req.params.area}`);
    const users = await User.find({
      area: { $regex: new RegExp(req.params.area, 'i') }
    });
    console.log(`Found ${users.length} users in area ${req.params.area}`);
    res.json(users);
  } catch (err) {
    console.error('Error searching by area:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Search users by transport mode
router.get('/search/transport/:mode', async (req, res) => {
  try {
    console.log(`GET /api/users/search/transport/${req.params.mode}`);
    const users = await User.find({
      transportMode: { $regex: new RegExp(req.params.mode, 'i') }
    });
    console.log(`Found ${users.length} users with transport mode ${req.params.mode}`);
    res.json(users);
  } catch (err) {
    console.error('Error searching by transport mode:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Find nearby users
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query;
    console.log(`GET /api/users/nearby - lon: ${longitude}, lat: ${latitude}, maxDist: ${maxDistance}`);

    const nearbyUsers = await User.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });
    console.log(`Found ${nearbyUsers.length} nearby users`);
    res.json(nearbyUsers);
  } catch (err) {
    console.error('Error finding nearby users:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Get user's Teams email by ID
router.get('/:id/email', async (req, res) => {
  try {
    console.log(`GET /api/users/${req.params.id}/email`);
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json('User not found');
    }
    if (!user.teamsEmail) {
      console.log('Teams email not found for user:', user.name);
      return res.status(404).json('Teams email not found');
    }
    console.log('Email fetched for user:', user.name);
    res.json({ teamsEmail: user.teamsEmail });
  } catch (err) {
    console.error('Error fetching user email:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`GET /api/users/${req.params.id}`);
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json('User not found');
    }
    console.log('User found:', user.name);
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/users - Creating new user:', req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log('User created successfully:', savedUser);
    res.json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json('Validation Error: ' + err.message);
    }
    res.status(500).json('Error creating user: ' + err.message);
  }
});

// Advanced search with multiple criteria
// Update user
router.put('/:id', async (req, res) => {
  try {
    console.log(`PUT /api/users/${req.params.id}`, req.body);
    
    // First check if user exists
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      console.log('User not found for update');
      return res.status(404).json('User not found');
    }

    // Validate the update data
    if (!req.body.area || !req.body.transportMode) {
      console.log('Missing required fields');
      return res.status(400).json('Area and transport mode are required');
    }

    // Find and update the user
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found for update');
      return res.status(404).json('User not found');
    }

    // Update fields
    user.area = req.body.area;
    user.transportMode = req.body.transportMode;

    // Save the updated user
    const savedUser = await user.save();
    console.log('User updated successfully:', savedUser);
    res.json(savedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json('Validation Error: ' + err.message);
    }
    res.status(500).json('Error updating user: ' + err.message);
  }
});

router.post('/search', async (req, res) => {
  try {
    const { area, transportMode, gender } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    console.log('POST /api/users/search - Criteria:', { area, transportMode, gender, page, limit, skip });
    
    let query = {};

    const conditions = [];

    if (area) {
      const searchRegex = new RegExp(area, 'i');
      conditions.push({
        $or: [
          { area: { $regex: searchRegex } },
          { name: { $regex: searchRegex } }
        ]
      });
    }

    if (transportMode && transportMode !== 'All') {
      conditions.push({ transportMode });
    }

    if (gender && gender !== 'All') {
      conditions.push({ gender });
    }

    if (conditions.length > 0) {
      query.$and = conditions;
    }

    console.log('MongoDB query:', JSON.stringify(query));
    
    const users = await User.find(query).sort({ name: 1 }).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    console.log(`Found ${users.length} users matching criteria (page ${page} of ${totalPages}, total: ${totalUsers})`);
    
    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers
      }
    });
  } catch (err) {
    console.error('Error performing advanced search:', err);
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
