import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState('');
  const [transportMode, setTransportMode] = useState('All');
  const [gender, setGender] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filterUsers = () => {
    let filtered = [...users];

    if (area) {
      filtered = filtered.filter(user => 
        user.area && user.area.toLowerCase().includes(area.toLowerCase())
      );
    }

    if (transportMode !== 'All') {
      filtered = filtered.filter(user => 
        user.transportMode === transportMode
      );
    }

    if (gender !== 'All') {
      filtered = filtered.filter(user => 
        user.gender === gender
      );
    }

    return filtered;
  };

  const filteredUsers = filterUsers();
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleReset = () => {
    setArea('');
    setTransportMode('All');
    setGender('All');
    setCurrentPage(1);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <div style={{
        background: '#1e4976',
        padding: '40px 20px',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          fontSize: '2.5em', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          Find Your <span style={{ color: '#ff6b4a' }}>सहयात्री</span>
        </h1>
        <p style={{ 
          fontSize: '1.2em', 
          color: '#e0e0e0',
          margin: 0
        }}>
          Connect with colleagues in your area to share a ride
        </p>
      </div>

      {/* Filters Section */}
      <div style={{ 
        background: 'white', 
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Area Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              color: '#1e4976', 
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              AREA
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Type to search for an area"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Transport Mode Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              color: '#1e4976', 
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              TRANSPORT MODE
            </label>
            <select
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: '#fff'
              }}
            >
              <option value="All">All</option>
              <option value="Car">Car</option>
              <option value="Public Transport">Public Transport</option>
              <option value="Walk">Walk</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              color: '#1e4976', 
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              GENDER
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: '#fff'
              }}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setCurrentPage(1)}
            style={{
              padding: '8px 0',
              background: '#1e4976',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              width: '150px',
              textTransform: 'uppercase'
            }}
          >
            Search
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '8px 0',
              background: 'white',
              color: '#1e4976',
              border: '1px solid #1e4976',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              width: '150px',
              textTransform: 'uppercase'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Pagination Info */}
      <div style={{ 
        textAlign: 'center', 
        margin: '20px 0',
        color: '#666',
        fontSize: '14px'
      }}>
        Page {currentPage} of {totalPages} ({filteredUsers.length} total users)
      </div>

      {/* Pagination Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '5px 15px',
            background: currentPage === 1 ? '#f8f9fa' : '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'default' : 'pointer',
            color: currentPage === 1 ? '#999' : '#666'
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: '5px 15px',
            background: currentPage === totalPages ? '#f8f9fa' : '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: currentPage === totalPages ? 'default' : 'pointer',
            color: currentPage === totalPages ? '#999' : '#666'
          }}
        >
          Next
        </button>
      </div>

      {/* Users Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading users...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          padding: '20px 0'
        }}>
          {currentUsers.map(user => (
            <div
              key={user._id}
              style={{
                background: 'white',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #eee'
              }}
            >
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '8px', 
                color: '#333',
                fontWeight: '500'
              }}>
                {user.name}
              </h3>
              <p style={{ 
                color: '#666', 
                marginBottom: '4px',
                fontSize: '14px'
              }}>
                Area: {user.area}
              </p>
              <p style={{ 
                color: '#666',
                fontSize: '14px'
              }}>
                Transport: {user.transportMode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindUsers;
