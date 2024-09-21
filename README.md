# Full Stack Project: Backend + Frontend

This project consists of a backend (NestJS) and a frontend (React). The backend runs on port `3000`, and the frontend runs on port `8080`.

## Project Structure

```
├── backend/      # Backend (NestJS)
├── frontend/     # Frontend (React)
├── README.md
├── docker-compose.yml
```

## Running with Docker Compose

1. Ensure you have Docker and Docker Compose installed on your machine.

2. Run the following command in the root of the project (where the docker-compose.yml file is located):

```bash
docker-compose up --build
```

This will build the Docker images and start both the backend and frontend services.

Once both the frontend and backend are running:

- **Frontend**: Open your browser and go to `http://localhost:8080`
- **Backend**: The backend API is available at `http://localhost:3000`

## Registration or login as a test user

Then you can create a new account or get access to the profile page as a test user.

Email: `test@admin.com`

Password: `admin`

## Backend Setup (Manual)

1. Navigate to the backend directory: `cd backend`

2. Install dependencies: `npm install`

3. Copy .env.example to .env file

4. Run the backend in development mode: `npm run start:dev:server`. This will start the NestJS server on `http://localhost:3000`.

## Frontend Setup (Manual)

1. Open a new terminal window and navigate to the frontend directory: `cd frontend`

2. Install dependencies: `npm install`

3. Copy .env.example to .env file

4. Run the frontend in development mode: `npm run start:dev`. This will start the React application with hot-reloading on `http://localhost:8080`.

## Access the Application

Once both the frontend and backend are running:

- **Frontend**: Open your browser and go to `http://localhost:8080`
- **Backend**: The backend API is available at `http://localhost:3000`