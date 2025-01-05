'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";

interface SignInComponentProps {
  providers: any;
}

const SignInComponent = ({ providers }: SignInComponentProps) => {
  return (
    <div className="flex flex-col gap-4">
      {Object.values(providers || {}).map((provider: any) => (
        <button
          key={provider.id}
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          className="flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {provider.id === 'google' && (
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
            />
          )}
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default SignInComponent; 