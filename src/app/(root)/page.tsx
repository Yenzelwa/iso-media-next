import Image from 'next/image'
import BrowsePage from './browse/page'
import { authConfig, loginIsRequiredServer } from '../api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export default async function Home() {
  return (
    <>
   <BrowsePage /> 
   {/* tet */}
    </>
  )
}
 