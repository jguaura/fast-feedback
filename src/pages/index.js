import Head from 'next/head';
import { Button, Code, Heading } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading fontFamily={'Inter'}>Fast feedback</Heading>
        <p>
          Current user{' '}
          <Code>
            {auth?.user?.displayName}
            {auth?.user?.email}
          </Code>
        </p>
        <div>
          {!auth.user ? (
            <Button onClick={() => auth.signInWithGithub()}>sign in</Button>
          ) : (
            <Button onClick={() => auth.logOut()}>log out</Button>
          )}
        </div>
      </main>
    </div>
  );
}
