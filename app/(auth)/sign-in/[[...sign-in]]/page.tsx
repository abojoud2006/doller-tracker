import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-20rem)] justify-center items-center container">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <Image src="logo.svg" width={200} height={200} alt="logo" />
          <h2 className="max-w-md lg:text-start text-center text-gray-500">
            Enjoy daily saving with good user experience application and
            achieved your goal by easy methods.
          </h2>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
