"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "../src/components/dashboard";
import { AppDataProvider } from "../src/hooks/appData";

const queryClient = new QueryClient();

export default function Page(): JSX.Element {
  return (
    <AppDataProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </AppDataProvider>
  );
}
