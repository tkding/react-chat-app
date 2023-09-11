# React Web Application README

This is a React web application that allows users to interact with a real-time messaging system and post and view content. The application is built using React, JavaScript, CSS, HTML, Firebase, and Firestore. Users are required to sign in with their Google account to access the functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Page Details](#page-details)
- [Contributing](#contributing)

## Features

### Page 1: Main Page (All Posts)

- Displays all posts based on the most recent posts first.
- Implements pagination with 10 posts per page.
- Allows users to like and unlike posts.
- Each post displays a title, the username of the author, and the number of likes.

### Page 2: User Page

- Shows all posts by a specific user.
- Provides the option to delete a post.
- Posts are sorted based on the most recent first.
- Each post on the user page displays a title, description, and the number of likes.

### Page 3: Create Post

- Users can create up to 5 posts in total.
- A form is provided for creating posts with fields for title and description.
- Both fields are mandatory, and the user will be warned if they attempt to submit empty fields.

### Page 4: Messaging

- There are 1-9 chat rooms available.
- Users can enter any of the rooms to enjoy a real-time messaging experience.
- Messages must be at least 5 characters long.
- The chat view automatically scrolls to the bottom for a seamless messaging experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine.
- A Google account for authentication.
- Firebase project set up with Firestore for data storage.

## Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your/repo.git
   ```

2. Navigate to the project directory:

   ```shell
   cd your-project-directory
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

## Usage
### method 1 uinsg the link

Access the application via your web browser at [furrya.com](https://chatapp-22a6b.web.app/createpost).

### method 2 using a shell
1. Create a Firebase project and set up Firestore as your database.

2. Configure Firebase in your project by providing the Firebase configuration in a `.env` file or directly in your code.

   ```javascript
   // src/firebase.js
   import firebase from "firebase/app";
   import "firebase/auth";
   import "firebase/firestore";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   export const auth = firebase.auth();
   export const firestore = firebase.firestore();
   ```

3. Start the development server:

   ```shell
   npm start
   ```

4. Access the application in your web browser at `http://localhost:3000`.

5. Sign in with your Google account to use the app's functionality.

## Page Details

- **Main Page (All Posts):** Accessible at the root URL (`/`), displays all posts with pagination and like/unlike functionality.

- **User Page:** Accessible at `/user/:username`, where `:userId` is the user's unique identifier. Allows users to view their posts and delete them.

- **Create Post:** Accessible at `/createpost`. Users can create new posts, and they are limited to a maximum of 5 posts.

- **Messaging:** Accessible at `/chat`. Users can enter chat rooms and enjoy real-time messaging.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.
