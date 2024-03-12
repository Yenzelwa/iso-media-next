import Link from "next/link";
import React from "react";

const AccountPage = () =>{

    return(
        <>
        <h1>Confirm account details</h1>
        <h3> Set up your membership to stream Gaia on your favorite devices.</h3>
        <div className='py-8'>
        <Link href="/account/create"
            className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
          >
            Continue
          </Link>
        </div>
        </>
    )
}

export default AccountPage;