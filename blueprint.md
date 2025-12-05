
# Project Blueprint: Pomodoro + Todo App

## Overview

This document outlines the plan and progress for creating a combined Pomodoro and Todo application with a streak system and a contribution heatmap, deployed on Firebase.

## Implemented Features

*   **Initial Setup:**
    *   Project initialized with Vite and React.
    *   TypeScript is used for type safety.
*   **Component Library:** Mantine is integrated for a rich set of UI components and hooks.
*   **Styling:** A dark blue theme is implemented using Mantine's theming capabilities.
*   **Firebase Integration:**
    *   Firebase SDK is added to the project.
    *   Firebase configuration file is created.
    *   Firebase MCP configuration is set up for deployment.
*   **Core Components:**
    *   **`Header.tsx`**: A simple header for the application with a logout button.
    *   **`Pomodoro.tsx`**: The main Pomodoro timer component.
    *   **`TodoList.tsx`**: The component for managing the user's tasks.
    *   **`Streak.tsx`**: A component to display the user's daily streak.
    *   **`Heatmap.tsx`**: A component to display a heatmap of the user's contributions.
*   **Authentication:** User authentication is implemented using Firebase Auth, with a dedicated login page.
*   **Layout:** A responsive grid layout is used to display the main components.

## Current Plan

### Phase 1: Core Functionality and UI Setup (Completed)

### Phase 2: Advanced Features (In Progress)

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

### Phase 3: Deployment

*   Deploy the application to Firebase Hosting.
