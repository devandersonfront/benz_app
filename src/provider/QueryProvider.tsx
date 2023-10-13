import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {}

function QueryProvider({ children }: PropsWithChildren<Props>) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
