# Pilates Studio Management

A comprehensive Pilates Studio Management mobile application built with React Native and Expo.

## Features

- Multi-role authentication (Studio Owners, Trainers, Members)
- Member management and registration
- Session scheduling and calendar management
- Payment processing and financial reporting
- Trainer performance tracking
- Notifications and reminders
- Multi-language support (Turkish/English)

## Tech Stack

- **Frontend**: React Native 0.79.1, Expo 53.0.4, TypeScript 5.8.3
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context + React Query
- **Backend**: Hono + tRPC (type-safe APIs)
- **UI**: Dark theme with custom design system

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Project Structure

```
├── app/                     # Expo Router file-based routing
├── assets/                  # Static assets
├── backend/                 # Hono + tRPC backend
├── contexts/               # React Context providers
├── constants/              # App constants and colors
├── types/                  # TypeScript type definitions
├── lib/                    # Utility functions
└── tmp/                    # Temporary files
```

## License

MIT