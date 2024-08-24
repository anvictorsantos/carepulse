# Healthcare Patient Management Application

A healthcare patient management application built with modern web technologies, allowing patients to easily register, book, and manage their appointments with doctors. The application also features administrative tools for scheduling, confirming, and canceling appointments, with integrated SMS notifications to keep patients informed.

## Features

- **Patient Management**: Easy patient registration and profile management.
- **Appointment Booking**: Intuitive interface for booking and managing appointments with doctors.
- **Admin Tools**: Administrative features for scheduling, confirming, and canceling appointments.
- **SMS Notifications**: Automated SMS alerts to keep patients updated on their appointments.

## Tech Stack

- **Next.js**: React framework for building fast and scalable web applications.
- **Appwrite**: Backend server for handling authentication, database, and storage.
- **Typescript**: Typed JavaScript to enhance code quality and maintainability.
- **TailwindCSS**: Utility-first CSS framework for building responsive and modern UI.
- **ShadCN**: Collection of UI components built for TailwindCSS.
- **Twilio**: SMS API for sending notifications to patients.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn
- Appwrite instance setup
- Twilio account for SMS notifications

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/healthcare-patient-management.git
    cd healthcare-patient-management
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure environment variables:

   Create a \`.env.local\` file in the root directory and add your Appwrite and Twilio credentials:

    ```bash
    NEXT_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
    NEXT_PUBLIC_APPWRITE_PROJECT=your-appwrite-project-id
    TWILIO_ACCOUNT_SID=your-twilio-account-sid
    TWILIO_AUTH_TOKEN=your-twilio-auth-token
    ```

4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- **Patient Registration**: Sign up and create a profile.
- **Book Appointments**: Browse available doctors and schedule appointments.
- **Admin Panel**: Admin users can manage all appointments, confirm, reschedule, or cancel them.
- **SMS Alerts**: Receive appointment confirmations, reminders, and updates via SMS.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
