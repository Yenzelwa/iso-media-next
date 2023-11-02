import Link from "next/link";

const ResetPasswordPage = () =>{
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="bg-gray p-12 rounded-lg shadow-md max-w-md">
            <h2 className="text-3xl font-bold mb-4">Reset Password</h2>
            <p className="text-gray-600 mb-6">
              Enter your new password to reset your account.
            </p>
            <form>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Confirm your new password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red text-white py-2 rounded-md hover:bg-red-600"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      );
    }
export default ResetPasswordPage;