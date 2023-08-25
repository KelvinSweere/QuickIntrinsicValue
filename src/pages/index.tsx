import LandingPage from '@/components/landing/landing-page';
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2806858064287732"
      />
      <Head>
        <title>Quick Intrinsic Value</title>
        <meta name="description" content="QuickIntrinsicValue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <>
        <LandingPage />
      </>
    </>
  );
}
