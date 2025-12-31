import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import { MainLayout } from "@layouts/index";

// pages
import {
  HomePage,
  LoginPage,
  RegisterPage,
  AboutUsPage,
  ProductsPage,
  CategoriesPage,
  Error,
} from "@pages/index";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "about-us",
          element: <AboutUsPage />,
        },
        {
          path: "categories/products/:prefix",
          element: <ProductsPage />,
          loader: async ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad Request", {
                statusText: "Category not found",
                status: 400,
              });
            }
            return true;
          },
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
      ],
    },
  ],
  {
    basename: "/ecommerce-typescript/",
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
