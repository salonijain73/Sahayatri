# Sahayatri - Your Travel Companion

Sahayatri (सहयात्री) is a collaborative travel platform designed to help colleagues connect and share their daily commute. The name comes from Sanskrit, meaning "fellow traveler" or "companion", reflecting our mission to make commuting more social, efficient, and environmentally friendly.

## Features

- **User Search**: Find colleagues in your area with similar commute patterns
- **Smart Filtering**: Filter users by:
  - Area/Location
  - Transport Mode (Car, Public Transport, Walk)
  - Gender
- **Microsoft Teams Integration**: Direct chat integration with Microsoft Teams
- **Interactive UI**: 
  - Responsive grid layout
  - Animated user cards
  - Pagination support
  - Real-time search updates

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- GeoJSON support for location-based queries
- RESTful API architecture

### Frontend
- React.js
- Axios for API communication
- Modern UI with CSS-in-JS styling
- Microsoft Teams integration

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Microsoft Teams account (for chat features)

### Environment Setup
Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_connection_string
```

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The server will run on port 8080.

2. Start the frontend development server:
```bash
cd frontend
npm start
```

## API Endpoints

### Users
- `POST /api/users/search` - Search users with filters
  - Parameters:
    - area (string)
    - transportMode (string)
    - gender (string)
    - page (number)

## Data Model

### User
- name (String)
- area (String)
- transportMode (Enum: ['Car', 'Bike', 'Bus', 'Train', 'Metro', 'Auto', 'Public Transport', 'Walk'])
- gender (Enum: ['Male', 'Female'])
- designation (String)
- teamsEmail (String)
- phone (String)
- address (String)
- location (GeoJSON Point)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.
