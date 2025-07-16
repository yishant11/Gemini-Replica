# Gemini Replica - A Conversational AI Chat Application

This project is a high-fidelity replica of Google's Gemini conversational AI interface, built with a modern, production-ready frontend stack. It provides a seamless and responsive chat experience, complete with user authentication, chat management, and a clean, intuitive UI.

## Live Demo

Experience the application live:

**[https://gemini-replica-sigma.vercel.app/](https://gemini-replica-sigma.vercel.app/)**

## Screenshot

![Gemini Replica Screenshot](https://storage.googleapis.com/project-ava-dev-public/github-readme-images/gemini-replica.png)

## Features

*   **User Authentication**: Secure phone number-based authentication (simulated OTP).
*   **Conversational Interface**: Real-time chat with a user-friendly interface.
*   **Chat Management**: Create new chats, search existing conversations, and delete old ones.
*   **Responsive Design**: Fully responsive layout that works seamlessly on desktop and mobile devices.
*   **Dark/Light Mode**: Theme toggling for user preference.
*   **State Management**: Centralized state management using Zustand for a consistent experience.
*   **Image Uploads**: Attach and preview images within the chat.
*   **AI Integration**: Built with Genkit for easy integration with generative AI models.

## Tech Stack

This project is built using a modern and robust technology stack, prioritizing performance, developer experience, and scalability.

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/gemini-replica.git
    cd gemini-replica
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

### Running Genkit

The generative AI features are powered by Genkit. To run the Genkit development server:
```sh
npm run genkit:dev
```
This will start the Genkit development UI where you can inspect and test your AI flows.
