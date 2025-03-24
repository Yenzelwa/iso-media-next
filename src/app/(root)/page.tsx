import Image from 'next/image'
import BrowsePage from './browse/page'
import { getServerSession } from 'next-auth';

export default async function Home() {
  return (
    <>
   <BrowsePage /> 
   {/* tet */}
    </>
  )
}
 