"use client";

import { DataProvider } from "./context/Context";

export function Providers({ children }) {
  return <DataProvider>{children}</DataProvider>;
}
