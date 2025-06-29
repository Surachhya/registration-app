# Towson University Workshop Registration App

This is a simple and efficient MEAN stack web application built with **Angular** (frontend) and **Node.js/Express + MongoDB** (backend). The app allows users to request information and manage registrations for Towson University workshops and programs.

---

## Project Overview

The application provides:

- A user-friendly form for prospective students or interested individuals to submit workshop information requests.
- An admin interface (backend APIs) to manage these requests, including viewing, updating, marking as complete, and deleting.
- Email confirmation sent to users upon successful submission.
- Mobile-friendly and responsive UI built with Angular and Bootstrap.

---

## Project Structure
```bash
root/
│
├── backend/                  # Backend server folder (Node.js + Express)
│   ├── models/               # Mongoose data models (e.g. Registration schema)
│   ├── routes/               # Express routes / API endpoints
│   ├── server.js             # Main server entry point
│   └── package.json          # Backend dependencies and scripts
│
└── registration-app/         # Angular frontend app folder
    ├── src/
    │   ├── app/
    │   │   ├── components/   # Angular components (e.g. registration form, details)
    │   │   ├── services/     # Angular services (e.g. API service)
    │   ├── assets/           # Static assets
    ├── angular.json          # Angular CLI config
    └── package.json          # Frontend dependencies and scripts

```


---

## Prerequisites

- [Node.js (v19+ (That is what I used ))](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli) (for frontend)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

---

## Setup and Run Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

`cd backend`
`npm install`
`node server.js`
```
The backend server will start (default on port 3000). Ensure MongoDB is running or your connection string is configured properly in the backend config.

3. Setup and start the frontend Angular app
Open a new terminal window/tab, then:

```bash
`cd registration-app`
`npm install`
`ng serve`
```
The Angular app will compile and run on http://localhost:4200/ by default.


Features
- User registration form with validation
- Admin management of registration requests
- Email confirmation via Gmail SMTP with Nodemailer
- Responsive UI with Bootstrap
- Easy to extend and maintain with modular structure

Troubleshooting
- Email login errors: Ensure you use a Gmail App Password if using 2FA and that credentials are correct.
- MongoDB connection issues: Verify your connection string and MongoDB service status.
- Angular build errors: Run npm install to ensure dependencies are installed and use ng serve --open to auto-open browser.

---

  Developed by Surachhya Adhikari

