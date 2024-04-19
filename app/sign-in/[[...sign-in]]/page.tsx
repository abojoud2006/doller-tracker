import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-20rem)] justify-center items-center">
      <SignIn />
    </div>
  );
}
