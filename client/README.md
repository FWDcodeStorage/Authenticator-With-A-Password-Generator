# **AUTHENTICATOR** WITH A PASSWORD GENERATOR **MERN**

A **MERN** Stack web application that allows users to create an account, generate strong passwords, and log in securely. The app uses MongoDB with **Mongoose** for data storage, **Express** and Node.js for the backend, and **React** for the frontend. It also incorporates **JSON Web Token** (JWT) for authentication and **React Hot Toast** for displaying messages.

![App Screenshot](./public/screenshot.png)

## Key Features

- **User Registration**: Users can create a new account by providing a profile photo, username, email address, and a chosen password or by using the strong password generator.

- **Password Generator**: For users who prefer a strong, randomly generated password, the app provides a built-in password generator.

- **Secure Authentication**: The app uses JSON Web Token (JWT) for secure authentication during user registration and login processes.

- **Login Form**: Registered users can log in securely using their email address and password.

## Technologies Used

- **MongoDB and Mongoose**: For database management and data modeling.

- **Express and Node.js**: For building the backend server.

- **React**: For building the frontend user interface.

- **JSON Web Token (JWT)**: For secure authentication and token-based user sessions.

- **Axios**: For making API requests from the frontend to the backend.

- **React Hot Toast**: For displaying user-friendly messages and notifications.

- **Tailwind CSS**: For styling the user interface with responsive design.

## Installation

1.Clone the [repository](https://github.com/FWDcodeStorage/Authenticator-With-A-Password-Generator) to your local machine

```bash
git clone https://github.com/FWDcodeStorage/Authenticator-With-A-Password-Generator.git

```

2.Navigate to the project directory.

```bash
cd authenticator-with-password-generator

```

3.Install the dependencies for both the frontend and backend.

```bash
cd client && npm install
cd ../server && npm install
```

4.Create a .env file in the server directory and add the following environment variables:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace your_mongodb_connection_string with your MongoDB connection string, and your_jwt_secret_key with a secret key for JWT token generation.

5.Run the development server.

```bash
cd ../client && npm start
cd ../server && npm run dev
```

## Contributing

Contributions are welcome! If you find a bug or have an enhancement in mind, please submit an issue or create a pull request. If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

### Collaboration

*[AhmedHHamdy](https://github.com/AhmedHHamdy)*
