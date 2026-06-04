import React from "react";

export function Columnas({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6 my-6">{children}</div>;
}

export function Col({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>;
}
