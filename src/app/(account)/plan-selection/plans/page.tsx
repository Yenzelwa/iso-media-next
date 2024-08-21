'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { authConfig, loginIsRequiredServer } from "@/src/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

const PricingPlan = () => {
  const [pricing, setPricing] = useState("Monthly"); // Default pricing plan
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(1);
  const {data:session} = useSession();
  const [userCookie, setUserCookie] = useState();
  const wait = (ms: number | undefined) => new Promise((rs) => setTimeout(rs, ms));

  const pricingLists = [
    {
      id: 1,
      title: "Billed Monthly",
      price: "$7.99",
      type: "Monthly",
      features: [
        "Stream on 1 device",
        "Instant access to over 1500 unique videos",
        "Access 30+ years of David Icke's Content",
        "Watch on your phone and TV",
        "£1.99 for your first month",
        "Renews at £7.99",
      ],
    },
    {
      id: 2,
      title: "Billed Yearly",
      price: "$99.99",
      type: "Yearly",
      features: [
        "Stream on 4 devices",
        "All premium features included",
        "Save 17% with annual billing",
        "24/7 customer support",
        "£1.99 for your first month",
        "Renews at £7.99",
        "Instant access to over 1500 unique videos",
        "Access 30+ years of David Icke's Content",
      ],
    },
  ];

  useEffect(() => {
    const loadSession = async () => {
      await loginIsRequiredServer();
      const session = await getServerSession(authConfig);
      await wait(1000); // Delay for 1 second
    };

    loadSession();
  }, []);

  useEffect(() => {
    debugger;
    const userCookie = Cookies.get("userProfile");
    if (userCookie) {
      const userProfile = JSON.parse(userCookie);
      setUserCookie(userProfile);
      debugger;
      setSelectedPlan(userProfile.plan.id);
    }
  }, []);

  useEffect(() =>{
    debugger;
    const userCookie = Cookies.get("userProfile");
    if (userCookie) {
      const userProfile = JSON.parse(userCookie);
     userProfile.plan.id = selectedPlan
    Cookies.set("userProfile", JSON.stringify(userProfile))
   }
  }, [selectedPlan])

  return (
    <>
      <div className=" py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-gray-500">STEP 2 OF 3</p>
            <h1 className="text-2xl font-bold mb-4">Choose your plan</h1>
            <h3 className="text-lg text-gray mb-6">IsolakwaMUNTU is committed to give you all you need to awaken your inner child.</h3>
          </div>


          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {pricingLists.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg bg-dark p-8 shadow-md ${selectedPlan === item.id ? 'border-2 border-red' : ''
                  }`}
                onClick={() => {
                  setSelectedPlan(item.id);
                }
                }
              >
                <div className="text-center">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-5xl font-extrabold tracking-tight text-red">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <ul>
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-start mt-2">
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-green"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-3 text-base text-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className={`w-1/2 flex justify-center items-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-red hover:bg-red focus:outline-none focus:border-red focus:shadow-outline-red transition duration-150 ease-in-out`}
            onClick={() => router.push("/billing")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default PricingPlan;
function wait(arg0: number) {
  throw new Error("Function not implemented.");
}

