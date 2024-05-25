"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "../components/dashboard";

const queryClient = new QueryClient();

export default function Page(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
