'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UserMenu = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <span className="text-white">Login</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            {session?.user?.email && (
              <div className="px-4 py-2 text-gray-700">
                {session.user.email}
              </div>
            )}
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
          <div className="border-t border-gray-200">
            <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
            <Link href="/library" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Library</Link>
            <Link href="/blogs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Blogs</Link>
            <Link href="/stats" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Stats</Link>
            <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
            <Link href="/help" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Help</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 