import Head from 'next/head';
import LandingPage from '@/layout/landingpage';
import '@/app/globals.scss';

export default function Landing() {
  return (
    <>
      <Head>
        <title>Game Master</title>
      </Head>
      <div>
        <LandingPage />
      </div>
    </>
  );
}
