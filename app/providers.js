"use client";

import { DataProvider } from "./(root)/context/Context";

export function Providers({ children }) {
  return <DataProvider>{children}</DataProvider>;
}
