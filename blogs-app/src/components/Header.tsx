import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import UserMenu from "./UserMenu";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href='/' className="text-white text-2xl font-bold">
          My Blogs
        </Link>
        {user ? (
          <UserMenu />
        ) : (
          <Link href="/auth/signin" className='text-white hover:underline'>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;