import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return (
    <div className="flex h-screen lg:h-[calc(100vh-20rem)] justify-center items-center container">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
        <div className="flex flex-col gap-3 lg:gap-4 items-center lg:items-start justify-center">
          <Image
            src="logo.svg"
            width={200}
            height={200}
            alt="logo"
            className="w-32 lg:w-48"
          />

          <h2 className="max-w-md lg:text-start text-center text-gray-500 text-sm lg:text-base px-4">
            Enjoy daily saving with good user experience application and
            achieved your goal by easy methods.
          </h2>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
