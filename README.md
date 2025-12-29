# AutoMaster — Client Application

## Overview

AutoMaster is a client-side web application designed to simplify the process of selecting, ordering, and testing vehicles.  
The application provides users with a centralized interface where they can browse a car catalog, submit purchase requests, schedule test drives, and track the status of their orders through a personal account.

The platform focuses on clarity, usability, and role-based access, ensuring that different user types interact only with the functionality available to them.

---

## Core Functionality

- Browsing a structured catalog of available vehicles
- Viewing detailed car information and specifications
- User authentication and session restoration
- Submitting car purchase requests
- Scheduling test drives
- Tracking orders and requests in a personal account
- Role-based UI behavior (guest, user, admin)
- Conditional access to features depending on authorization state

---

## Application Logic

- The application is built as a Single Page Application (SPA).
- Client-side routing enables navigation without full page reloads.
- Global state management is used to handle authentication and user-related data.
- User sessions are restored on application load using stored session information.
- Interface elements dynamically adapt based on authentication status and user role.
- Unauthorized users can access public content but cannot interact with restricted features.

---

## Technologies Used

### Frontend

- JavaScript (ES6+)
- React
- React Router
- Redux Toolkit
- SCSS
- HTML5
- CSS3

### State Management

- Redux Toolkit
- Asynchronous actions for API communication
- Persistent session handling using localStorage

### Backend Integration

- REST API
- Axios for HTTP requests
- MongoDB as the primary database on the server side

---

## Project Structure (Client Side)

- `components/` — reusable UI components
- `pages/` — application pages
- `store/` — Redux slices and global state logic
- `routes/` — routing configuration
- `styles/` — global and modular SCSS styles
- `assets/` — images and static resources

---

## Purpose

The purpose of this project is to demonstrate the development of a modern client-side web application with a clean architecture, predictable state management, and a clear separation of concerns between presentation, logic, and data handling.  
AutoMaster reflects common practices used in real-world frontend development.
