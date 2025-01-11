# EventEase Platform  
---
**EventEase** is a simplified event management platform for creating and managing events, registering attendees, and providing real-time updates. The platform includes a backend built with Express and MongoDB, and a frontend developed with Next.js and Tailwind CSS.  

## Features  

### Backend  
1. **User Authentication**  
   - User registration and login with email and password.  
   - Secure API endpoints to restrict event creation and registration to authenticated users.  

2. **Event Management**  
   - Create, update, and delete events.  
   - Each event includes:  
     - Name, date, location, maximum attendees, and creator information.  

3. **Attendee Registration**  
   - API to allow users to register for events, limiting registrations based on maximum attendees.  

4. **Real-time Updates**  
   - Socket.IO for broadcasting:  
     - Notifications when a new attendee registers.  
     - Updates when events are modified or reach maximum capacity.  

### Frontend  
1. **Authentication**  
   - Login and signup pages with user session persistence.  
   - Personalized dashboard displaying events created by the user.  

2. **Event Dashboard**  
   - Display a list of events with the ability to create and register for events.  
   - Styled with Tailwind CSS for a modern and responsive design.  

3. **Real-time Notifications**  
   - Show real-time updates for attendee registrations and event changes.  

---

## Tech Stack  
- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.IO  
- **Frontend**: Next.js, Tailwind CSS  
- **Authentication**: JSON Web Tokens (JWT)  
- **Real-time Updates**: Socket.IO  

---

## Getting Started  

### Prerequisites  
- Node.js  
- MongoDB  
- Yarn or npm  

### Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/eventease.git  
   cd eventease  
   ```  

2. Install dependencies:  
   ```bash  
   yarn install  
   # or  
   npm install  
   ```  

3. Set up environment variables:  
   Create a `.env` file in the root directory with the following keys:  
   ```env  
   PORT=3000  
   MONGO_URI=your_mongo_db_connection_string  
   JWT_SECRET=your_jwt_secret  
   ```  

4. Start the development servers:  
   ```bash  
   # Start backend  
   yarn run dev:backend  

   # Start frontend  
   yarn run dev:frontend  
   ```  

5. Open the application in your browser at `http://localhost:3000`.  

---

## How to Use  
1. Sign up or log in to the platform.  
2. View all available events.  
3. Create new events or register for existing ones (authenticated users only).  
4. Receive real-time notifications for attendee registrations and event updates.  

---
