import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fast feedback</h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div>
          {!auth.user ? (
            <button onClick={() => auth.signInWithGithub()}>sign in</button>
          ) : (
            <button onClick={() => auth.logOut()}>log out</button>
          )}
        </div>
        <div>{auth?.user?.displayName}</div>
        <div>{auth?.user?.email}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
