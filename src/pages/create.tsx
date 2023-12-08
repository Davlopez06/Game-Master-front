import Head from 'next/head';
import '@/app/globals.scss';
import CreateLayout from '@/layout/create';
import icon from '@/app/favicon.ico';
import { ContextProvider } from '@/context/context';

export default function Home() {
  return (
    <>
      <Head>
        <title>Game Master</title>
        <link rel="icon" href={icon?.src} />
      </Head>
      <ContextProvider>
        <CreateLayout />
      </ContextProvider>
    </>
  );
}
