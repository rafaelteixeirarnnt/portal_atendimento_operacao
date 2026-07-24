import { useMemo } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { ContractPage } from "@/pages/ContractPage";
import { HomePage } from "@/pages/HomePage";

const createRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "contracts/:contractId", element: <ContractPage /> }
      ]
    }
  ]);

export const App = () => {
  const router = useMemo(createRouter, []);

  return <RouterProvider router={router} />;
};
