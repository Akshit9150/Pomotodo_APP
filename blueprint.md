
# Project Blueprint: Pomotodo

## Overview

This document outlines the plan and progress for creating a combined Pomodoro and Todo application with a streak system and a contribution heatmap, deployed on Firebase.

## Implemented Features

*   **Initial Setup:**
    *   Project initialized with Vite and React.
    *   TypeScript is used for type safety.
*   **Component Library:** Mantine is integrated for a rich set of UI components and hooks.
*   **Styling:** A modern, minimalist dark theme is implemented using Mantine's theming capabilities. The primary color is a vibrant "grape" purple.
*   **Branding:** A custom logo for "Pomotodo" has been created and integrated into the application's header and authentication pages.
*   **Firebase Integration:**
    *   Firebase SDK is added to the project.
    *   Firebase configuration file is created.
    *   Firebase MCP configuration is set up for deployment.
*   **Core Components:**
    *   **`Header.tsx`**: A modern header featuring the Pomotodo logo and a logout button.
    *   **`Pomodoro.tsx`**: The main Pomodoro timer component.
    *   **`TodoList.tsx`**: The component for managing the user's tasks.
    *   **`Streak.tsx`**: A component to display the user's daily streak.
    *   **`Heatmap.tsx`**: A component to display a heatmap of the user's contributions.
*   **Authentication:** User authentication is implemented using Firebase Auth, with a dedicated login page that matches the application's theme and features the Pomotodo logo.
*   **Layout:** A responsive grid layout is used to display the main components.

## Current Plan

### Phase 1: Core Functionality and UI Setup (Completed)

### Phase 2: Refactoring, Theming, and Branding (Completed)

*   **Theme Update:** The entire application has been updated to use a new modern, minimalist theme with a "grape" primary color.
*   **Code Refactoring:** All components have been refactored to remove hardcoded styles and use the Mantine theme for a consistent look and feel.
*   **Branding:** The application has been branded as "Pomotodo" with a custom logo.

### Phase 3: Advanced Features (In Progress)

*   **Pomodoro Timer:**
    *   Implement start, pause, and reset functionality.
    *   Add settings to customize timer durations.
*   **Todo List:**
    *   Allow users to add, edit, and delete tasks.
    *   Associate tasks with Pomodoro sessions.
*   **Firebase Backend:**
    *   Use Firestore to store tasks, time spent, and user data.
    *   Implement user authentication.
*   **Streak System:**
    *   Track daily streaks for completing at least one Pomodoro session.
    *   Implement a streak freeze feature.
*   **Heatmap:**
    *   Display a 6-month contribution heatmap.

### Phase 4: Deployment

*   Deploy the application to Firebase Hosting.
