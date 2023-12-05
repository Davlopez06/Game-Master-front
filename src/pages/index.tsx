import Head from 'next/head';
import LandingPage from '@/layout/landingpage';
import icon from '@/app/favicon.ico';
import '@/app/globals.scss';

export default function Landing() {
  return (
    <>
      <Head>
        <title>Game Master</title>
        <link rel="icon" href={icon?.src} />
      </Head>
      <div>
        <LandingPage />
      </div>
    </>
  );
}
