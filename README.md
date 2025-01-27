# Sahayatri - Find Your सहयात्री

A web application to help colleagues find and connect with others in their area for ride sharing.

## Features

- **Area-based Search**: Find colleagues in your area with real-time filtering
- **Transport Mode Filter**: Filter by Car, Public Transport, Walk, etc.
- **Gender Filter**: Option to filter by gender preference
- **Teams Integration**: Direct chat integration with Microsoft Teams
- **Material UI**: Modern and responsive design with Material UI components
- **Pagination**: Efficient loading with paginated results

## Tech Stack

- **Frontend**: React.js with Material UI
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: Microsoft Teams SSO

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sahayatri.git
cd sahayatri
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend server (from frontend directory)
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Search by Area**: Enter your area in the search box to find colleagues nearby
2. **Filter Results**: Use transport mode and gender filters to refine your search
3. **Connect**: Click the Teams chat button to instantly connect with a colleague
4. **Navigate**: Use pagination to browse through all available results

## Recent Updates

- Improved Teams chat integration with automatic app/web fallback
- Enhanced UI with gradient animations on user cards
- Added real-time search functionality
- Optimized MongoDB queries for better performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
