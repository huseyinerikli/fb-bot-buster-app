# Facebook Bot Buster

A sophisticated Facebook bot detection application that helps identify automated accounts using machine learning and behavioral analysis.

## Features

- Real-time bot detection using machine learning algorithms
- Facebook user account analysis
- Historical behavior tracking
- Interactive dashboard with visualization
- REST API endpoints for integration
- Detailed bot probability scoring

## Tech Stack

### Frontend
- React.js
- Bootstrap 5
- Chart.js for visualizations
- Axios for API calls

### Backend
- Java Spring Boot
- Spring Security
- Spring Data JPA
- H2 Database (in-memory)

## Prerequisites

- Node.js (v18 or higher)
- Java JDK 17 or higher
- Maven
- Facebook Developer Account

## Installation

### Backend Setup

1. Clone the repository
2. Navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
3. Run the application:
   ```powershell
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm start
   ```
   The frontend will start on `http://localhost:3000`

## Running Without Authentication

The application is configured to run without authentication by default. All API endpoints are publicly accessible.

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- H2 Database Console: http://localhost:8080/h2-console
  - JDBC URL: jdbc:h2:mem:fbbotbuster
  - Username: sa
  - Password: (leave empty)

## Configuration

Create a `.env` file in the frontend directory with your Facebook API credentials:

```
REACT_APP_FACEBOOK_APP_ID=your_app_id
REACT_APP_FACEBOOK_APP_SECRET=your_app_secret
```

## Development Notes

- The application uses H2 in-memory database, which means data will be reset when the application restarts
- CORS is configured to allow requests from `http://localhost:3000`
- All API endpoints are publicly accessible without authentication
- The H2 console is enabled for development purposes
- Facebook Graph API is used for fetching user data and follower information

## PowerShell Commands Reference

For Windows PowerShell users, here are some useful commands:

```powershell
# Navigate to parent directory
cd ..

# Navigate to project root
cd fb-bot-buster

# Navigate to backend
cd backend

# Navigate to frontend
cd frontend

# Run multiple commands (PowerShell syntax)
cd backend; mvn spring-boot:run
cd frontend; npm start
```

## License

MIT License - feel free to use this project for any purpose.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
