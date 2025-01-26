import React, { useState, useEffect } from 'react';
import axios from 'axios';
import teamsLogo from '../assets/teams-logo.svg';

const FindUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState('');
  const [transportMode, setTransportMode] = useState('All');
  const [gender, setGender] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      console.log('Sending search request with params:', {
        area,
        transportMode,
        gender,
        page
      });
      const response = await axios.post(`http://localhost:8080/api/users/search?page=${page}`, {
        area: area || '',
        transportMode: transportMode === 'All' ? '' : transportMode,
        gender: gender === 'All' ? '' : gender
      });
      console.log('Search response:', response.data);
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.totalPages);
      setTotalUsers(response.data.pagination.totalUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Error details:', error.response?.data);
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(currentPage);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, area, transportMode, gender]);

  // Listen for user updates
  useEffect(() => {
    const handleUserUpdate = () => {
      fetchUsers(currentPage);
    };
    window.addEventListener('userUpdated', handleUserUpdate);
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [currentPage]);

  const handleSearch = () => {
    fetchUsers(1);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setArea('');
    setTransportMode('All');
    setGender('All');
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
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
        padding: '30px 20px',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
        marginBottom: '20px'
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
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px'
        }}>
          {/* Area Filter */}
          <div style={{ width: '35%' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              color: '#1e4976', 
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              SEARCH BY AREA
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Type to search by area"
              style={{
                width: '100%',
                padding: '6px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          </div>

          {/* Transport Mode Filter */}
          <div style={{ width: '20%' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              color: '#1e4976', 
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              TRANSPORT MODE
            </label>
            <select
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '13px',
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
          <div style={{ width: '15%' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              color: '#1e4976', 
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              GENDER
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '13px',
                backgroundColor: '#fff'
              }}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex',
            gap: '8px',
            marginLeft: 'auto'
          }}>
            <button
              onClick={handleSearch}
              style={{
                padding: '6px 16px',
                background: '#1e4976',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              Search
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '6px 16px',
                background: 'white',
                color: '#1e4976',
                border: '1px solid #1e4976',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading users...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          padding: '20px 0',
          marginBottom: '20px'
        }}>
          {users.map(user => (
            <div
              key={user._id}
              style={{
                background: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #eee',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.querySelector('.top-line').style.transform = 'translateX(0)';
                e.currentTarget.querySelector('.underline').style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.querySelector('.top-line').style.transform = 'translateX(-100%)';
                e.currentTarget.querySelector('.underline').style.transform = 'translateX(0)';
              }}
            >
              <div 
                className="top-line"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #ff6b4a, #1e4976)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease'
                }}
              />
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  marginBottom: '8px', 
                  color: '#1e4976',
                  fontWeight: '600'
                }}>
                  {user.name}
                </h3>
                <div 
                  className="underline"
                  style={{
                    width: '40px',
                    height: '2px',
                    background: '#ff6b4a',
                    marginBottom: '8px',
                    transition: 'transform 0.3s ease'
                  }} 
                />
              </div>
              <p style={{ 
                color: '#666', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                <strong>Area:</strong> {user.area}
              </p>
              <p style={{ 
                color: '#666',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                <strong>Transport:</strong> {user.transportMode}
              </p>
              <p style={{ 
                color: '#666',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p style={{ 
                color: '#666',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                <strong>Designation:</strong> {user.designation}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px 12px',
                background: '#464EB8',
                color: 'white',
                borderRadius: '4px',
                width: 'fit-content',
                transition: 'background 0.3s ease'
              }}
              onClick={() => window.open(`https://teams.microsoft.com/l/chat/0/0?users=${user.name.replace(' ', '.')}@piramal.com`)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#3238A0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#464EB8'}
              >
                <img 
                  src={teamsLogo} 
                  alt="Teams" 
                  style={{
                    width: '20px',
                    height: '20px',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  Chat
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Info and Controls */}
      <div style={{ 
        background: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <div style={{ 
          color: '#666',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          Page {currentPage} of {totalPages} ({totalUsers} total users)
        </div>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              padding: '6px 16px',
              background: currentPage === 1 ? '#f8f9fa' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'default' : 'pointer',
              color: currentPage === 1 ? '#999' : '#666',
              fontSize: '13px'
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 16px',
              background: currentPage === totalPages ? '#f8f9fa' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'default' : 'pointer',
              color: currentPage === totalPages ? '#999' : '#666',
              fontSize: '13px'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindUsers;
