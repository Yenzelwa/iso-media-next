import exp from "constants";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const AccountNav = () =>{
    const {data: session} = useSession();

    const handleLogout = async () =>{
        await signOut();
    }

    return (
        <>
        <nav className="container flex justify-between items-center">
        <div className="font-semibold">
        <svg
            className="fill-current h-8 w-8 mr-2 text-red"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            IsolaKwaMUNTU
          </span>
        </div>
        <div className="flex items-center gap-4 text-lg">
        {session  && session.user && session.user.name?  ( 
            <div className="flex items-center">
              <span className="mr-2"> {session.user.name}</span> 
              <img 
               // src={session.user.image}
                alt={session.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <button onClick={ async ()=>{await handleLogout()}} >Log out</button>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="inline-block font-semibold text-sm px-4 py-2 leading-none border rounded text-white border-red hover:border-transparent hover:text-teal-500 mt-4 ml-4 lg:mt-0"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </nav>
        </>
    
    )
}

export default AccountNav;