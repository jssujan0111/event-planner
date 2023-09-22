
# Event Planner
# description
I choose to build a web-based event planning application that allows users to organize and manage various types of events, such as parties, conferences, or workshops. The application will provide features for creating events, managing guest lists and managing event details.
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
## Features

- **User Authentication**: Secure user registration and login system.
- **Event Management**: Create, update, and delete events.
- **Guest List**: Maintain a list of guests for each event.
- **Invitation Status**: Track the invitation status of each guest.
- **RSVPs**: Record guest responses (attending, not attending, undecided).
- **Event Details**: View event details including date, time, location, and budget.
- **Pagination**: Easily navigate through lists of events and guests.
- **Sorting and Searching**: Sort and search events and guests by various criteria.

## Technologies Used
- **Backend**:
  - Node.js with Express.js
  - MongoDB for the database
  - Mongoose for database modeling
  - JWT for authentication
  - Swagger for API documentation
  - Docker container
    - MongoDB
    - mongo-express
- **Testing**:
    - Jest 

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- DockerHub installed on your machine. If your machine don't support docker , you can use MongoDB local or MongoDB Atlas.

### Installation
1. Clone the repository
```bash
   git clone https://github.com/jssujan0111/event-planner
```
2. change the project directory
```bash
    cd event-planner
```
3. install dependencies
```bash
    npm install
```
4. run docker to run container. if you don't use  docker change the MongoDB url with local/ Atlas url.
```bash
   docker compose up
```
6. to run Testing
```bash
   npm run test
```
7. create **.env** file in the directory and configure environments variables.
- PORT
- DB_CONNECTION_URL
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_ACCESS_TOKEN_SECRET
- JWT_REFRESH__TOKEN_SECRET
8. to start application
```bash
    npm run dev
```
9. Access the application in your browser at
```bash
    http://localhost:5000
```
## Usage
1. Register a user account or log in if you already have an account.
2. Create and manage events in the dashboard.
3. Add guests to your events and manage their details.
4. Track the invitation status and RSVPs of your guests.
5. Explore the API documentation at **/docs** for more advanced usage.
## API Documentation
The API documentation is available at **/docs** and is generated using Swagger. You can explore the available endpoints, request and response schemas, and test API requests directly from the documentation.
## Acknowledgments
- Thanks to the open-source community for providing the tools and libraries used in this project.
- Special thanks to our contributors for their valuable input and assistance.
