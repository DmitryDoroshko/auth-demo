import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { CookiesProvider } from "react-cookie";

import "./index.css";
import { SignUpPage } from "./pages/SignUp/SignUpPage.tsx";
import { LoginPage } from "./pages/Login/LoginPage.tsx";
import { Layout } from "./layouts/Layout.tsx";
import { HomePage } from "./pages/Home/HomePage.tsx";
import { ProfilePage } from "./pages/Profile/ProfilePage.tsx";
import { AppRoutes } from "./constants/routing.ts";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { ProtectedLayout } from "./layouts/ProtectedLayout.tsx";

const router = createBrowserRouter([
  {
    path: AppRoutes.BASE,
    Component: Layout,
    children: [
      {
        path: AppRoutes.SIGN_UP,
        Component: SignUpPage,
      },
      {
        path: AppRoutes.LOGIN,
        Component: LoginPage,
      },
      {
        Component: ProtectedLayout,
        children: [
          {
            path: AppRoutes.HOME,
            Component: HomePage,
          },
          {
            path: AppRoutes.PROFILE,
            Component: ProfilePage,
          },
        ],
      },
    ],
  },
]);

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>,
);
