import { getProviders } from "next-auth/react";
import SignInComponent from "@/components/SignInComponent";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <SignInComponent providers={providers} />
      </div>
    </div>
  );
}