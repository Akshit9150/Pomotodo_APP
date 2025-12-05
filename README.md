
# Pomotodo_APP

This is a web application that combines a Pomodoro timer with a Todo list to help users stay focused and manage their tasks effectively. It also includes a streak system and a contribution heatmap to motivate users and track their progress over time.

## Features

*   **Pomodoro Timer:** A customizable timer to break down work into focused intervals.
*   **Todo List:** Manage your tasks, mark them as complete, and associate them with Pomodoro sessions.
*   **Authentication:** Secure user authentication using Firebase.
*   **Streak Counter:** Tracks your daily consistency to keep you motivated.
*   **Contribution Heatmap:** Visualizes your activity and accomplishments over the past six months.
*   **Responsive Design:** The application is designed to work seamlessly on both desktop and mobile devices.

## Tech Stack

*   **Frontend:** React, Vite, TypeScript
*   **UI Library:** Mantine
*   **Backend & Database:** Firebase (Authentication, Firestore)
*   **Deployment:** Firebase Hosting

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20.19+ or v22.12+)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/Akshit9150/Pomotodo_APP.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `firebase.ts` file in the `src` directory with your Firebase project configuration.

### Running the Application

```sh
npm run dev
```

This will start the development server. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Building for Production

```sh
npm run build
```

This command builds the app for production to the `dist` folder.
