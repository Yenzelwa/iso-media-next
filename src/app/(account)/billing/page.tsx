import React from "react";
import Link from "next/link";


const BillingPage = () =>{

    return (
        <>
         <div className="p-6 bg-dark rounded-lg  shadow-md max-w-md">
         <p className="text-gray">STEP 3 OF 3</p>
             <h1 className="text-2xl font-bold mb-4">Select payment option</h1>
             <h3 className="text-lg text-gray mb-6">All payment details are encrypted and can be changed. Cancel anytime</h3>
        
        <div>
        <div className="relative">
  <div className="border border-gray rounded-lg p-4">
    <p className="absolute top-0 left-0 mt-[-0.5rem] ml-4 text-sm font-medium text-gray">Pay with</p>
    <ul className="flex flex-col space-y-2">
      <li className="bg-white shadow-md p-2 rounded-lg">
        <input type="radio" id="paypal" name="paymentMethod" className="sr-only" />
        <label htmlFor="paypal" className="flex items-center cursor-pointer">
          <span className="w-10 h-10 flex justify-center items-center bg-gray rounded-lg">
            <img src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/paypal.svg" alt="PayPal" className="w-6 h-6" />
          </span>
          <span className="text-base font-medium text-gray ml-2">PayPal</span>
        </label>
      </li>
      <li className="bg-white shadow-md p-2 rounded-lg">
        <input type="radio" id="creditCard" name="paymentMethod" className="sr-only" />
        <label htmlFor="creditCard" className="flex items-center cursor-pointer">
          <span className="w-10 h-10 flex justify-center items-center bg-gray rounded-lg">
            <img src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/card.svg" alt="Credit Card" className="w-6 h-6" />
          </span>
          <span className="text-base font-medium text-gray ml-2">Credit or Debit Card</span>
        </label>
      </li>
    </ul>
  </div>
</div>

        </div>
        <div className='py-8'>
        <Link href="/billing/payment"
            className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
          >
            Continue
          </Link>
        </div>
        </div>
        </>
    )
}

export default BillingPage;