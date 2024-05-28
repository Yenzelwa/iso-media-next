import Link from "next/link";
import React from "react";

const AccountPage = () =>{

    return(
        <>
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img  src="registration_image.png" alt="Registration Image" className="mx-auto mb-6"></img>
        <p className="text-gray-500">STEP 1 OF 3</p>
        <h1 className="text-2xl font-bold mb-4">Confirm your account details</h1>
        <h3 className="text-lg text-gray mb-6">IsolakwaMUNTU is committed to give you all you need to awaken your inner child.</h3>
        <div className="flex justify-center">
            <a href="/account/create" className="bg-red text-white px-16 py-3 rounded-md inline-block hover:bg-red-600 transition duration-300">Continue</a>
        </div>
    </div>
        </>
    )
}

export default AccountPage;