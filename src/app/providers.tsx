"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/features/quiz/store/store";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
