# Booking-ph Application

## Overview

This application serves as a personal project developed to explore and deepen understanding of the MERN stack. It utilizes various libraries and APIs to enhance functionality and showcase their integration within a real-world context.

## Purpose

The application allows users to search for available accommodations, make bookings, and view their booking history. It supports payment via credit card and enables users to manage their bookings, with property availability managed on a per-room basis.

## Scope

### For Users

- **Accommodation Search**: Users can search for available accommodations and make bookings.
- **Booking History**: Users can view their past booking history for better management.

### For Admin

- **Accommodation Search**: Admins can also search for available properties.
- **Room Management**: Admins can manage property listings and room details.
- **Notable Feature**: Includes a feature for admins to search for a location using the Nominatim API to retrieve location coordinates.

## Technologies Used

### Core Technologies

- MongoDB
- Express
- React (with TypeScript)
- Node.js

### APIs and SDKs

- **Stripe**: Handles secure card payments.
- **Nominatim API**: Provides location search and place positioning.
- **Cloudinary SDK**: Facilitates image uploads and automatic optimization.

## Architecture

### Frontend

- **Generic Repository Pattern**: Abstracts and manages data interactions, ensuring a clean separation of concerns.
- **API Layer**: Facilitates efficient communication between the frontend and backend.

### Backend

- **Route-Controller-Service-Model Layer**: A structured approach to backend development, maintaining a clean and scalable architecture.

## Testing

- **Vitest**: Utilized for unit testing in the backend (selected service only).
- **Playwright**: Employed for end-to-end (E2E) testing of property and room management features in the frontend.

## Responsiveness

- **Admin**: Strictly for desktop/laptop only.
- **User Pages**:
  - Ideal for 801px (or greater) for large devices.
  - Ideal for 576px to 800px for medium devices.

## Additional Libraries and Packages

- **React Hook Form**: Simplifies form creation and validation.
- **Axios**: Handles HTTP requests to the backend.
- **Multer**: Manages image uploads by temporarily storing files before transferring them to the cloud.
- **Zod**: Schema validation in the backend.
- **Mongoose**: ODM library for MongoDB.

_For a complete list of libraries and packages, please refer to the `package.json` file._

## Notes

This application extends beyond basic CRUD operations, although there are areas for future improvement. The developer acknowledges these gaps and plans to address them in future updates, while currently focusing on other projects.

Furthermore, please note that this public repository is NOT the complete code and only showcases the admin functionalities, as the developer has opted to keep the full code private. Future updates and additional functionalities are still open for development.
