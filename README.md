# Caffeine - Mobile App and Backend API ☕

Caffeine is a platform designed for programmers and tech enthusiasts. The app provides a space to share posts, follow users, interact with content, and manage coding-related resources.

This repository contains the **Expo-based frontend**

## Technologies Used

### Frontend
- **Expo**: Framework for React Native to build cross-platform mobile applications.
- **React Native**: UI framework for building native mobile apps using React.
- **Reanimated**: For smooth animations and transitions.
- **React Navigation**: File-based routing and navigation.
- **Expo Router**: Simplified file-based routing for the Expo project.

## Features

### Frontend (Mobile App)
- User Authentication: Login, register, and password recovery.
- Post Management: Create, edit, delete, and like/unlike posts.
- Profile Customization: Update profile details, manage followers, and view activity history.
- Tag-Based Search: Filter posts by tags.
- Interactive UI: Smooth animations and a responsive design.


## Postman Documentation

Explore the API endpoints with the provided Postman collection:
[Postman Collection](https://martian-equinox-636176.postman.co/workspace/Caffeine~f37c04df-2be3-41d9-89ef-3345ceec60df/collection/30633673-da3be000-02f2-4816-b9bb-16c09b8eb191?action=share&creator=30633673)

### Key Endpoints
#### Auth
- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: User login.
- `POST /api/v1/auth/forgot-password`: Request password reset email.
- `POST /api/v1/auth/reset-password`: Reset user password.

#### Posts
- `GET /api/v1/posts`: Get all posts with pagination.
- `POST /api/v1/post`: Create a new post.
- `PUT /api/v1/post/:id`: Update a specific post.
- `DELETE /api/v1/post/:id`: Delete a specific post.

#### Users
- `GET /api/v1/users/:id`: Fetch user details.
- `PUT /api/v1/users/update/:id`: Update user details.
- `POST /api/v1/users/follow/:id`: Follow another user.
- `POST /api/v1/users/unfollow/:id`: Unfollow another user.


### Installation


#### Frontend
1. Navigate to the frontend directory and install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npx expo start
   ```

### API Usage

Use Postman to test the API or integrate the endpoints directly into your mobile app. See the [Postman Collection](https://martian-equinox-636176.postman.co/workspace/Caffeine~f37c04df-2be3-41d9-89ef-3345ceec60df/collection/30633673-da3be000-02f2-4816-b9bb-16c09b8eb191?action=share&creator=30633673) for examples.


## Contribution Guidelines

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Submit a pull request with a detailed description of the changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy building and contributing to Caffeine! ☕

