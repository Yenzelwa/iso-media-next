'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";


const PlanSelectionPage = async () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  //await wait(1000);
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      router.push('/login'); // Redirect if not authenticated
    }
  }, [session, status, router]);

  if (status === 'loading') return <div>Loading...</div>;
  return (
    <>
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img src="registration_image.png" alt="Registration Image" className="mx-auto mb-6"></img>
        <p className="text-gray-500">STEP 2 OF 3</p>
        <h1 className="text-2xl font-bold mb-4">Choose your plan</h1>
        <div className="mt-8">
        <ul className="space-y-4">
          <li className="flex items-start mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" className="w-6 h-6 text-green" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path>
            </svg>
            <span className="ml-3 text-base text-gray">No commitments, cancel anytime.</span>
          </li>
          <li className="flex items-start mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" className="w-6 h-6 text-green" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path>
            </svg>
            <span className="ml-3 text-base text-gray">Everything on Netflix for one low price.</span>
          </li>
          <li className="flex items-start mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" className="w-6 h-6 text-green" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path>
            </svg>
            <span className="ml-3 text-base text-gray">No ads and no extra fees. Ever.</span>
          </li>
        </ul>
        </div>
        <div className="flex justify-center">
          <a href="/plan-selection/plans" className="bg-red text-white w-2/full py-2 px-16 mt-8  rounded-md inline-block hover:bg-red-600 transition duration-300"> See Plans</a>
        </div>
      </div>

    </>
  )
}
export default PlanSelectionPage;