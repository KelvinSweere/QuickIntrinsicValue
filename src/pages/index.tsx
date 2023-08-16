import LandingPage from '@/components/landing/landing-page';
import styles from '@/styles/Home.module.scss';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Quick Intrinsic Value</title>
        <meta name="description" content="QuickIntrinsicValue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LandingPage />
      </main>
    </>
  );
}
