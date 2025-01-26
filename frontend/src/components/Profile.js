import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editableArea, setEditableArea] = useState('');
  const [editableTransport, setEditableTransport] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [areas, setAreas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTimeout = useRef(null);

  const fetchAreas = async (search = '') => {
    try {
      const response = await axios.get('http://localhost:8080/api/locations/areas/suggest', {
        params: { q: search }
      });
      console.log('Areas response:', response.data);

      if (Array.isArray(response.data)) {
        setAreas(response.data);
      } else {
        console.error('Invalid areas data format:', response.data);
      }
    } catch (err) {
      console.error('Failed to fetch areas:', err);
      setAreas([]);
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchTerm.length >= 2) {
      searchTimeout.current = setTimeout(() => {
        fetchAreas(searchTerm);
      }, 300);
    } else {
      setAreas([]);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      console.log('Fetching users...');
      const response = await axios.get('http://localhost:8080/api/users');
      console.log('Response data:', response.data);
      
      console.log('Raw response:', response.data);
      const users = Array.isArray(response.data) ? response.data : response.data?.users || [];
      console.log('Users data:', users);
      
      if (users.length > 0) {
        console.log('Found users:', users.map(u => u.name));
        // Find Saloni Jain's profile
        console.log('Looking for user with name "SALONI JAIN"');
        const saloni = users.find(user => {
          const userName = user.name.trim().toUpperCase();
          const targetName = 'SALONI JAIN';
          console.log('Comparing:', userName, 'with', targetName);
          return userName === targetName;
        });
        console.log('Found Saloni?', saloni ? 'Yes' : 'No');
        if (saloni) {
          setUser(saloni);
          setEditableArea(saloni.area || '');
          setEditableTransport(saloni.transportMode || '');
        } else {
          setError('Saloni Jain\'s profile not found');
        }
      }
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch user data: ${err.response?.data || err.message}`);
      console.error('Error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!user || !user._id) {
        throw new Error('User data not properly loaded');
      }

      if (!editableArea.trim()) {
        throw new Error('Area cannot be empty');
      }

      if (!editableTransport) {
        throw new Error('Transport mode must be selected');
      }

      setSaveStatus('Saving...');
      console.log('Saving user with ID:', user._id);
      console.log('Update data:', { area: editableArea, transportMode: editableTransport });
      const response = await axios.put(`http://localhost:8080/api/users/${user._id}`, {
        area: editableArea,
        transportMode: editableTransport
      });
      setUser(response.data);
      // Dispatch a custom event to notify FindUsers component to refresh
      window.dispatchEvent(new Event('userUpdated'));
      setSaveStatus('Changes saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      setSaveStatus(`Failed to save changes: ${err.response?.data || err.message}`);
      setTimeout(() => setSaveStatus(''), 5000);
    }
  };

  if (loading) {
    return (
      <div className="find-users-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="find-users-container">
        <div className="error-message" style={{ padding: '1rem', backgroundColor: '#ffebee', borderRadius: '4px', margin: '1rem' }}>
          <h3 style={{ color: '#c62828', marginTop: 0 }}>Error</h3>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="find-users-container">
        <div className="no-results">User not found</div>
      </div>
    );
  }

  return (
    <div className="find-users-container">
      <div className="hero-section">
        <h1>My Profile</h1>
      </div>
      
      <div className="user-card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="user-info">
          <h3>{user.name}</h3>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Designation: </strong>
            <span>{user.designation}</span>
          </div>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Area: </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <div style={{ position: 'relative', marginLeft: '4px' }}>
                <input
                  type="text"
                  placeholder="Type to search areas..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '300px',
                    fontSize: '14px'
                  }}
                />
                {areas.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginTop: '4px',
                    zIndex: 1000,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {areas.map((area, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setEditableArea(area.fullName);
                          setSearchTerm(area.fullName);
                          setAreas([]);
                        }}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: index < areas.length - 1 ? '1px solid #eee' : 'none',
                          backgroundColor: 'white',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        {area.fullName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Address: </strong>
            <span>{user.address}</span>
          </div>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Phone: </strong>
            <span>{user.phone}</span>
          </div>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Gender: </strong>
            <span>{user.gender}</span>
          </div>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Transport: </strong>
            <select
              value={editableTransport}
              onChange={(e) => setEditableTransport(e.target.value)}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginLeft: '4px',
                width: '200px'
              }}
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Public Transport">Public Transport</option>
              <option value="Walk">Walk</option>
            </select>
          </div>
          <div className="info-row" style={{ marginBottom: '12px' }}>
            <strong>Teams Email: </strong>
            <span>{user.teamsEmail}</span>
          </div>
          {saveStatus && (
            <div className="save-status" style={{ color: saveStatus.includes('Failed') ? 'red' : 'green', marginBottom: '12px' }}>
              {saveStatus}
            </div>
          )}
          <button 
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
