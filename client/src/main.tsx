import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import route from "./routes/route";
import "flowbite/dist/flowbite.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// init query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  </StrictMode>
);
