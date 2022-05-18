import Head from 'next/head';
import { useAuth } from '../lib/auth';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fast feedback</h1>
        <p>
          Current user{' '}
          <code >
            {auth?.user?.displayName}
            {auth?.user?.email}
          </code>
        </p>
        <div>
          {!auth.user ? (
            <button onClick={() => auth.signInWithGithub()}>sign in</button>
          ) : (
            <button onClick={() => auth.logOut()}>log out</button>
          )}
        </div>
      </main>
    </div>
  );
}
