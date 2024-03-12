import Link from "next/link";


const PlanSelectionPage = () =>{

    return (
        <>
        <h1>Choose your plan</h1>
        <p>
        Enjoy a 25-day trial with our monthly and annual plans
        </p>
        <Link href="/plan-selection/plans"
            className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
          >
            See Plans
          </Link>
        </>
    )
}
export default PlanSelectionPage;