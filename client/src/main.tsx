import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./routes/route";
import "flowbite/dist/flowbite.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store/store";
import { Provider } from "react-redux";

// init query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={route} />
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  </HelmetProvider>
);
