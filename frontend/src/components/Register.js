import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    designation: '',
    address: {
      area: '',
      pincode: ''
    },
    gender: '',
    transportMode: '',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    }
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getCurrentLocation = () => {
    setLocationStatus('pending');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              type: 'Point',
              coordinates: [position.coords.longitude, position.coords.latitude]
            }
          }));
          setLocationStatus('success');
        },
        (error) => {
          setError('Error getting location: ' + error.message);
          setLocationStatus('error');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLocationStatus('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      if (response.data) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getLocationStatusText = () => {
    switch (locationStatus) {
      case 'pending':
        return 'Getting location...';
      case 'success':
        return 'Location updated successfully';
      case 'error':
        return 'Failed to get location';
      default:
        return 'Get Current Location';
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                minLength="3"
                placeholder="Enter your full name"
                autoComplete="name"
              />
              <div className="field-hint">Minimum 3 characters</div>
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                minLength="6"
                placeholder="Enter password"
                autoComplete="new-password"
              />
              <div className="field-hint">Minimum 6 characters</div>
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit number"
                title="Please enter a valid 10-digit phone number"
                autoComplete="tel"
              />
              <div className="field-hint">10-digit mobile number</div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter your job title"
            autoComplete="organization-title"
          />
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label>Area:</label>
              <input
                type="text"
                name="address.area"
                value={formData.address.area}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your area"
                autoComplete="address-line1"
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label>Pincode:</label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="form-input"
                required
                pattern="[0-9]{6}"
                placeholder="Enter 6-digit pincode"
                title="Please enter a valid 6-digit pincode"
                autoComplete="postal-code"
              />
              <div className="field-hint">6-digit pincode</div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
                required
                autoComplete="sex"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label>Mode of Transport:</label>
              <select
                name="transportMode"
                value={formData.transportMode}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Transport Mode</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="public_transport">Public Transport</option>
                <option value="walk">Walk</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <button
            type="button"
            onClick={getCurrentLocation}
            className={`btn btn-secondary location-btn ${locationStatus ? `location-status ${locationStatus}` : ''}`}
          >
            {getLocationStatusText()}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
