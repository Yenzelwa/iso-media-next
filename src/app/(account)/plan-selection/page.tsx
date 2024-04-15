import Link from "next/link";
import { authConfig, loginIsRequiredServer } from "../../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";

const wait = (ms: number) => new Promise((rs) => setTimeout(rs, ms));
const PlanSelectionPage = async () =>{
  debugger;
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig)
  console.log("plan selection session", session)

  //await wait(1000);
    return (
        <>
        <h1>Choose your plan</h1>
        <h1>{session?.user?.email}</h1>
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