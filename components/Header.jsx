import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import Nav from "./Nav";
import AppSettings from "./AppSettings";
export default async function Header() {
  const user = await currentUser();
  return (
    <header className="flex justify-between p-5">
      <Nav />
      <div className="flex gap-10 items-center">
        <AppSettings />
        <SignedIn>
          {/* Mount the UserButton component */}
          <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-600 text-end hidden md:block">
              <p className="text-gray-800 font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs">{user?.emailAddresses[0].emailAddress}</p>
            </div>
            <UserButton />
          </div>
        </SignedIn>
      </div>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}
