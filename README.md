# Access Manager Project

## Introduction

This project aims to provide an access management system where users can log in, view their access and device information, and perform actions such as logging out other users from the admin dashboard. The project utilizes Next.js for the frontend, MongoDB for the database, and Socket.io for real-time monitoring.

## Next Steps

### 1. **User Authentication and Authorization:**

- Implement token-based authentication to secure user logins.
- Verify if the username and token exist in the `LoginUser` collection in the MongoDB database before allowing access.
- Define user roles and permissions to control access to certain features or pages.

### 2. **Admin Dashboard Functionality:**

- Develop an admin dashboard where authorized users can view and manage user access.
- Provide functionality to log out users by removing their name from the `LoginUser` collection in the database.

### 3. **Real-time Monitoring with Socket.io:**

- Integrate Socket.io to enable real-time monitoring on the dashboard page.
- Implement live updates for user access and device information.
- Display notifications or alerts for relevant events such as user logins or logouts.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure environment variables for database connection and authentication.
4. Run the development server using `npm run dev`.
5. Access the application in your browser at `http://localhost:3000`.

## Contributors

- Sumit Jagtap - Project Lead & Developer
