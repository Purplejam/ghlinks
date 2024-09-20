# Full Stack Project: Backend + Frontend

This project consists of a backend (NestJS) and a frontend (React). The backend runs on port `3000`, and the frontend runs on port `8080`. Follow the instructions below to run both applications locally using terminal commands.

## Project Structure

```
├── backend/      # Backend (NestJS)
├── frontend/     # Frontend (React)
├── README.md
```

## Backend Setup

1. Navigate to the backend directory: `cd backend`

2. Install dependencies: `npm install`

3. Copy .env.example to .env file

4. Run the backend in development mode: `npm run start:dev:server`. This will start the NestJS server on `http://localhost:3000`.

## Frontend Setup

1. Open a new terminal window and navigate to the frontend directory: `cd frontend`

2. Install dependencies: `npm install`

3. Copy .env.example to .env file

4. Run the frontend in development mode: `npm run start:dev`. This will start the React application with hot-reloading on `http://localhost:8080`.

## Access the Application

Once both the frontend and backend are running:

- **Frontend**: Open your browser and go to `http://localhost:8080`
- **Backend**: The backend API is available at `http://localhost:3000`