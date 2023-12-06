import Head from 'next/head';
import '@/app/globals.scss';
import HomeLayout from '@/layout/home';
import icon from '@/app/favicon.ico';
import { ContextProvider } from '@/context/context';

export default function GameDatail() {
  return (
    <>
      <Head>
        <title>Game Master</title>
        <link rel="icon" href={icon?.src} />
      </Head>
      <ContextProvider>
        <HomeLayout />
      </ContextProvider>
    </>
  );
}
