import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { LoginFormPage } from "./pages/LoginForm";
import { RootLayout } from "./pages/Root";
import { SignupForm } from "./pages/SignupForm";
import { AccountPage } from "./pages/user/Account";
import { DashboardPage } from "./pages/user/Dashboard";
import { FavoritePage } from "./pages/user/Favorite";
import { MyBookPage } from "./pages/user/MyBook";
import { RootUserLayout } from "./pages/user/RootUser";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth/login", element: <LoginFormPage /> },
      { path: "/auth/signup", element: <SignupForm /> },
    ],
  },
  {
    path: "/user",
    element: <RootUserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashbord", element: <DashboardPage /> },
      { path: "my-book", element: <MyBookPage /> },
      { path: "favorite", element: <FavoritePage /> },
      { path: "account", element: <AccountPage /> },
    ],
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
    </QueryClientProvider>
  );
};
