import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import teamsLogo from '../assets/teams-logo.svg';
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e4976',
    },
    secondary: {
      main: '#ff6b4a',
    },
  },
});

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
    '& .underline': {
      transform: 'translateX(2px)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b4a, #1e4976, #ff6b4a)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover::before': {
    transform: 'translateX(0)',
  },
}));

const Underline = styled('div')({
  width: '40px',
  height: '2px',
  background: '#ff6b4a',
  marginBottom: '8px',
  transition: 'transform 0.3s ease',
});

const TeamsButton = styled(Button)({
  backgroundColor: '#464EB8',
  color: 'white',
  '&:hover': {
    backgroundColor: '#3238A0',
  },
});

const FindUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState('');
  const [transportMode, setTransportMode] = useState('All');
  const [gender, setGender] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8080/api/users/search?page=${page}`, {
        area: area || '',
        transportMode: transportMode === 'All' ? '' : transportMode,
        gender: gender === 'All' ? '' : gender
      });
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.totalPages);
      setTotalUsers(response.data.pagination.totalUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  }, [area, transportMode, gender]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(currentPage);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage, area, transportMode, gender, fetchUsers]);

  useEffect(() => {
    const handleUserUpdate = () => {
      fetchUsers(currentPage);
    };
    window.addEventListener('userUpdated', handleUserUpdate);
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [currentPage, fetchUsers]);

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'primary.main',
            p: 4,
            borderRadius: 2,
            color: 'white',
            textAlign: 'center',
            mb: 3
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Find Your <span style={{ color: '#ff6b4a' }}>सहयात्री</span>
          </Typography>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
            Connect with colleagues in your area to share a ride
          </Typography>
        </Paper>

        {/* Filters Section */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="SEARCH BY AREA"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>TRANSPORT MODE</InputLabel>
                <Select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  label="TRANSPORT MODE"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Car">Car</MenuItem>
                  <MenuItem value="Public Transport">Public Transport</MenuItem>
                  <MenuItem value="Walk">Walk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>GENDER</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="GENDER"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{ textTransform: 'uppercase' }}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{ textTransform: 'uppercase' }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Users Grid */}
        {loading ? (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography>Loading users...</Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {users.map(user => (
              <Grid item xs={12} sm={6} md={4} key={user._id}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {user.name}
                    </Typography>
                    <Underline className="underline" />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Area:</strong> {user.area}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Transport:</strong> {user.transportMode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Gender:</strong> {user.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Designation:</strong> {user.designation}
                    </Typography>
                    <TeamsButton
                      startIcon={
                        <img
                          src={teamsLogo}
                          alt="Teams"
                          style={{
                            width: '20px',
                            height: '20px',
                            filter: 'brightness(0) invert(1)'
                          }}
                        />
                      }
                      onClick={() => {
                        const email = `${user.name.replace(' ', '.')}@piramal.com`;
                        const webUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
                        
                        // Open Teams web URL in a new window
                        window.open(webUrl, '_blank');
                      }}
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Chat
                    </TeamsButton>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Page {currentPage} of {totalPages} ({totalUsers} total users)
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              size="small"
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              size="small"
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default FindUsers;
