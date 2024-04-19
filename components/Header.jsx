import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import Link from "next/link";
export default async function Header() {
  const user = await currentUser();
  //   console.log(user);
  return (
    <header className="flex justify-between p-5">
      <div className="flex gap-10">
        <Link href="/month">Current Month</Link>
        <Link href="/year">Year</Link>
      </div>
      <SignedIn>
        {/* Mount the UserButton component */}
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600 text-end ">
            <p className="text-gray-800 font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs">{user?.emailAddresses[0].emailAddress}</p>
          </div>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}
