# 🎓 ClubVerse – University Club Explorer

A full-stack web application that helps university students discover clubs, explore campus events, join communities, and experience university life beyond the classroom.

## 🌟 Overview

ClubVerse provides a centralized platform for exploring university clubs and events. Students can discover communities based on their interests, explore club activities, register for events, and manage their participation.

## ✨ Features

- **Explore Clubs:** Browse university clubs across different categories.
- **Club Details:** View club descriptions, activities, achievements, and information.
- **Join Clubs:** Submit membership applications through the website.
- **Events:** Explore upcoming university events.
- **Event Registration:** Register for events directly through the application.
- **Gallery:** Explore campus activities and club moments.
- **Favorites:** Save favorite clubs for quick access.
- **My Space:** View personal club memberships and event registrations.
- **Responsive Interface:** Interactive and user-friendly interface.
- **Backend Integration:** Store membership and event registration data in MongoDB.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST API
- Mongoose

### Database
- MongoDB

### Development Tools
- Visual Studio Code
- Git
- GitHub
- MongoDB Compass

## 🏗️ Project Structure

```text
ClubVerse/
│
├── backend/
│   ├── models/
│   │   ├── Membership.js
│   │   └── Registration.js
│   │
│   ├── routes/
│   │   ├── clubRoutes.js
│   │   ├── eventRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── public/
│   └── gallery/
│
├── src/
│   ├── assets/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── App.css
│
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the Repository


git clone https://github.com/Dhashmithatutorial/ClubVerse.git
cd ClubVerse


### 2. Install Frontend Dependencies

npm install


### 3. Install Backend Dependencies

cd backend
npm install


### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory.


PORT=5000
MONGO_URI=your_mongodb_connection_string


Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 5. Start the Backend

From the backend directory:

```bash
npm start
```

If your backend does not have a start script, use:

```bash
node server.js
```

Backend runs at:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/clubs` | Retrieve clubs |
| GET | `/api/events` | Retrieve events |
| POST | `/api/clubs/:id/join` | Join a club |
| POST | `/api/events/:id/register` | Register for an event |
| GET | `/api/memberships` | Retrieve memberships |
| GET | `/api/registrations` | Retrieve event registrations |

## 🔄 Application Architecture

```text
React + Vite Frontend
        |
        | HTTP Requests
        v
Node.js + Express Backend
        |
        | Mongoose
        v
     MongoDB
```
## 🚀 Live Demo

- **Frontend (Vercel):** [ClubVerse Live Website]
(https://club-verse-tan.vercel.app)

- **Backend (Render):** [ClubVerse API](https://clubverse-backend-4hla.onrender.com)

- **GitHub Repository:** [ClubVerse](https://github.com/Dhashmithatutorial/ClubVerse)

## 🚀 Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlass

## 📌 Future Enhancements

- Student authentication and authorization
- Admin dashboard for club management
- Real-time event notifications
- Advanced club and event filtering
- Enhanced student participation tracking

## 👥 Team Members

ClubVerse was developed as a collaborative group project by a team of four members.

- **Kundeti Naga Dhashmitha** – [GitHub](https://github.com/Dhashmithatutorial) | 

- **V.Bhuvana Teja** – 
[GitHub](https://github.com/vu241fa04341-ops) | 

- **A. Bhargavi sai** – 
[GitHub](https://github.com/Bhargavi171) | 

- **Nazima syed** – 
[GitHub](https://github.com/iamnazimasyed) 

*This project was developed collaboratively as part of a team.*

---

⭐ If you find ClubVerse interesting, consider starring the repository!



