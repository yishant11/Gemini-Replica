# **App Name**: Gemini UI Replica

## Core Features:

- OTP Authentication: Simulate OTP-based login/signup flow, including fetching country codes from restcountries.com and simulating OTP send/validation.
- Chatroom Management: Implement a dashboard displaying a list of user's chatrooms, with features to create and delete chatrooms. Toast notifications confirm actions.
- Chat Interface: Develop a chat UI that simulates user and AI messages, timestamps, a 'typing' indicator, delayed AI responses, message throttling, auto-scroll, infinite scroll, client-side pagination, image uploads (base64 or preview URL), and copy-to-clipboard functionality.
- Local Data Management: Implement a debounced search bar for filtering chatrooms and utilize localStorage to save auth & chat data.
- Enhanced UX Features: Include loading skeletons for chat messages and ensure keyboard accessibility for main interactions.

## Style Guidelines:

- Primary color: A soft blue (#90AFC5) to evoke a sense of calm and intellect, reflecting Gemini's conversational AI nature. This will steer clear of overused tech blues, opting for a muted, sophisticated tone.
- Background color: A very light gray (#F0F4F7) providing a clean, distraction-free backdrop that keeps focus on the chat interface and its content. Its desaturation keeps it from overpowering the softer primary.
- Accent color: A muted purple (#80759C) to highlight interactive elements, such as buttons and active states. This will provide visual interest without being overwhelming, given that purple is the approximate analogous color of blue.
- Font pairing: 'Inter' (sans-serif) for body text, and 'Space Grotesk' (sans-serif) for headlines. Space Grotesk offers a slightly techy and modern look to contrast subtly with the very neutral Inter.
- Use a set of minimalist icons for actions like sending messages, uploading images, and managing chatrooms. Icons should be simple line drawings to match the clean aesthetic.
- Employ a modern, responsive layout that adapts fluidly to different screen sizes. Prioritize content hierarchy to ensure usability across desktop and mobile devices.
- Implement subtle animations for actions like sending messages, receiving messages, and loading content. These animations should enhance the user experience without being distracting.