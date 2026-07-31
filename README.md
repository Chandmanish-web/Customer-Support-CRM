# Customer Support Ticketing CRM

A full-stack ticketing system for managing customer support requests. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create tickets with customer info, subject, and description (auto-generated ticket ID)
- List all tickets in a clean table view
- Live search across name, ID, email, and description
- Filter tickets by status (Open / In Progress / Closed)
- View ticket details, update status, and add notes/comments

## Tech Stack

- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Atlas free tier)
- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios

## Project Structure

```
customer-support-crm/
├── backend/
│   ├── controllers/ticketController.js
│   ├── models/Ticket.js
│   ├── models/Note.js
│   ├── routes/tickets.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/          (Home, CreateTicket, TicketDetail)
    │   ├── components/     (TicketList, SearchFilter, StatusBadge)
    │   ├── api.js
    │   └── App.jsx
    └── .env.example
```

## Local Setup

### 1. Database (MongoDB Atlas — free)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user and allow network access from anywhere (0.0.0.0/0) for simplicity
3. Copy your connection string

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your MONGO_URI
npm run dev
```

Server runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

App runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint                | Description                          |
|--------|--------------------------|---------------------------------------|
| POST   | `/api/tickets`           | Create a new ticket                  |
| GET    | `/api/tickets`           | List tickets (`?status=`, `?search=`)|
| GET    | `/api/tickets/:ticket_id`| Get one ticket + its notes           |
| PUT    | `/api/tickets/:ticket_id`| Update status and/or add a note      |

## Deployment

**Backend → Render.com**
1. Push this repo to GitHub
2. New Web Service on Render, root directory `backend`
3. Build command: `npm install` — Start command: `npm start`
4. Add environment variables: `MONGO_URI`, `CLIENT_ORIGIN` (your deployed frontend URL)

**Frontend → Vercel**
1. Import the repo, set root directory to `frontend`
2. Framework preset: Vite
3. Add environment variable: `VITE_API_URL` = your Render backend URL + `/api`
4. Deploy

After both are live, update `CLIENT_ORIGIN` on the backend to match your Vercel URL exactly (no trailing slash), and redeploy the backend.

## Local Docker Setup (Optional)

This repo also includes local Docker support for development only.

1. Install Docker Desktop.
2. Run `docker compose up --build` from the project root.
3. Local services:
   - `mongo` on `localhost:27017`
   - `backend` on `localhost:5000`
   - `frontend` on `localhost:5173`

> This compose file is for local development only and is not used for Render deployment.

## Render Deployment

Use Render for production deployment with:
- `backend` as a free Web Service using `backend/Dockerfile`
- `frontend` as a free Static Site using the `frontend` directory

Make sure Render environment variables are set for:
- `MONGO_URI`
- `CLIENT_ORIGIN`
- `VITE_API_URL`

## Notes

This scaffold covers the required schema, all 4 REST endpoints, and all core UI flows. Before submitting, review each file, adjust styling/validation to your taste, and make sure you can explain every part of it — that's part of the evaluation.
