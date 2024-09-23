import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import { BookingContextProvider } from "./contexts/BookingContext.tsx";
import { AuthContextProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false, // Disable refetch on window focus globally
      refetchInterval: false, // Disable automatic polling
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppContextProvider>
          <SearchContextProvider>
            <BookingContextProvider>
              <App />
            </BookingContextProvider>
          </SearchContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
