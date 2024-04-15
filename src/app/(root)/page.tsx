import Image from 'next/image'
import BrowsePage from './browse/page'
import { authConfig, loginIsRequiredServer } from '../api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const wait = (ms: number) => new Promise((rs) => setTimeout(rs, ms));
  debugger;
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig)
  await wait(1000);
  return (
    <>
   <BrowsePage />
    </>
  )
}
