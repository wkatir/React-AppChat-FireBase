# Chat Application

A real-time chat application built using React, Tailwind CSS, Vite, and Firebase for authentication and messaging.

## Features
- User authentication using Firebase
- Real-time chat functionality
- Dynamic room creation
- Responsive design using Tailwind CSS

## Technologies Used

### Frontend:
- React
- Tailwind CSS
- Vite

### Backend:
- Firebase (for authentication and Firestore)

### Others:
- Universal Cookies (for managing user sessions)

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/wkatir/React-AppChat-FireBase.git
   cd React-AppChat-FireBase
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new project in Firebase Console.
   - Enable Authentication (e.g., Google Sign-In).
   - Create a Firestore database.
   - Update the `fireBaseConfig.ts` file with your Firebase configuration.

4. Run the application:
   ```bash
   npm run dev
   ```

5. Open your browser:
   - Navigate to [http://localhost:5173/](http://localhost:5173/).

## Usage
- Sign in using Google to start chatting.
- Enter a room name to create or join a chat room.
- Send messages in real-time with other users in the same room.

## Room Preview
![Room Preview](https://res.cloudinary.com/di0cvbfdb/image/upload/v1728248635/Chat/s1latyfbkbslyrpr7zbx.png)

## Chat Preview
![Chat Preview](https://res.cloudinary.com/di0cvbfdb/image/upload/v1728248636/Chat/xym6cragjg8hhnxmouhr.png)

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request

## License
This project is licensed under the MIT License.
```

Feel free to adjust any parts as necessary!