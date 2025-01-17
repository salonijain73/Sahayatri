const router = require('express').Router();
const axios = require('axios');

// Mumbai bounding box coordinates
const MUMBAI_BOUNDS = {
  north: 19.2771,
  south: 18.8928,
  east: 72.9724,
  west: 72.7755
};

router.get('/areas/suggest', async (req, res) => {
  try {
    const searchTerm = req.query.q || '';
    if (!searchTerm) {
      return res.json([]);
    }

    console.log('Searching for areas with term:', searchTerm);

    // Call OpenStreetMap Nominatim API
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: `${searchTerm}, Mumbai, India`,
        format: 'json',
        addressdetails: 1,
        viewbox: `${MUMBAI_BOUNDS.west},${MUMBAI_BOUNDS.north},${MUMBAI_BOUNDS.east},${MUMBAI_BOUNDS.south}`,
        bounded: 1,
        limit: 10
      },
      headers: {
        'User-Agent': 'Sahayatri/1.0'
      }
    });

    // Process and format the results
    const areas = response.data
      .filter(place => {
        const addr = place.address || {};
        return addr.suburb || addr.neighbourhood || addr.residential;
      })
      .map(place => {
        const addr = place.address || {};
        const areaName = addr.suburb || addr.neighbourhood || addr.residential;
        const fullName = `${areaName}${addr.city ? `, ${addr.city}` : ''}`;
        return {
          name: areaName,
          fullName: fullName,
          lat: place.lat,
          lon: place.lon
        };
      })
      // Remove duplicates
      .filter((area, index, self) => 
        index === self.findIndex(a => a.name === area.name)
      );

    console.log('Found areas:', areas);
    res.json(areas);
  } catch (err) {
    console.error('Error searching areas:', err);
    res.status(500).json({ error: 'Failed to search areas' });
  }
});

module.exports = router;
