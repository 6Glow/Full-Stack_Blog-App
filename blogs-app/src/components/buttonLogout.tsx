"use client";

import { signOut } from "next-auth/react"

const ButtonLogout = () => {
  return (
    <div onClick={() => signOut()} className="text-white hover:underline cursor-pointer">
      Logout
    </div>
  )
}

export default ButtonLogout
