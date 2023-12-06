import Head from 'next/head';
import '@/app/globals.scss';
import icon from '@/app/favicon.ico';
import { ContextProvider } from '@/context/context';
import GameDetailLayout from '@/layout/gameDetail';

export default function GameDetail() {
  return (
    <>
      <Head>
        <title>Game Master</title>
        <link rel="icon" href={icon?.src} />
      </Head>
      <ContextProvider>
        <GameDetailLayout />
      </ContextProvider>
    </>
  );
}
