import { redirect } from 'next/navigation';

export default function Home() {
  // The main logic for auth checking and redirection is in ClientLayout.
  // This page just needs to forward the user to the main app experience.
  redirect('/chat');
}
