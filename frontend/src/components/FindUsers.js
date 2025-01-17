import React, { useState, useEffect } from 'react';
import axios from 'axios';
import teamsLogo from '../assets/teams-logo.svg';
import { loadGoogleMapsScript } from '../utils/googleMapsLoader';

function FindUsers() {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState({
    area: '',
    transportMode: '',
    gender: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const autocompleteRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Add CSS for Places Autocomplete dropdown
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pac-container {
        z-index: 10000 !important;
        border-radius: 4px !important;
        margin-top: 4px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        border: 1px solid #ccc !important;
        font-family: inherit !important;
      }
      .pac-item {
        padding: 8px 12px !important;
        cursor: pointer !important;
      }
      .pac-item:hover {
        background-color: #f5f5f5 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Initialize Places Autocomplete
  useEffect(() => {
    const initPlacesAutocomplete = async () => {
      try {
        await loadGoogleMapsScript();
        
        if (!inputRef.current) return;

        // Create a SearchBox for place search
        const searchBox = new window.google.maps.places.SearchBox(inputRef.current);
        
        // Set SearchBox bounds to Mumbai
        const mumbaiCenter = new window.google.maps.LatLng(19.0760, 72.8777);
        const mumbaiArea = {
          north: 19.2591,
          south: 18.8928,
          east: 72.9790,
          west: 72.7764,
        };
        
        searchBox.setBounds(new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(mumbaiArea.south, mumbaiArea.west),
          new window.google.maps.LatLng(mumbaiArea.north, mumbaiArea.east)
        ));

        // Listen for the event fired when the user selects a prediction
        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          if (places.length === 0) return;

          const place = places[0];
          console.log('Selected place:', place);

          // Get the most specific location name
          let locationName = '';
          if (place.address_components) {
            // Try to find the most specific component in order of preference
            const component = place.address_components.find(
              comp => comp.types.includes('sublocality_level_1')
            ) || place.address_components.find(
              comp => comp.types.includes('sublocality')
            ) || place.address_components.find(
              comp => comp.types.includes('locality')
            );

            if (component) {
              locationName = component.long_name;
            }
          }

          // If no specific component found, use place name
          if (!locationName) {
            locationName = place.name;
          }

          console.log('Setting location:', locationName);
          setSearchCriteria(prev => ({
            ...prev,
            area: locationName
          }));
          handleSearch(1);
        });

        autocompleteRef.current = searchBox;
      } catch (error) {
        console.error('Error initializing Places:', error);
      }
    };

    initPlacesAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, []);

  // Rest of your component code...

  return (
    <div className="find-users-container">
      <div className="search-filters">
        <div className="filter-group">
          <label>AREA</label>
          <div className="area-input-container" style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type to search for an area"
              className="form-input"
              style={{ 
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindUsers;
