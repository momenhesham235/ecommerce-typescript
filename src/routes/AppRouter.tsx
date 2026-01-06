import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

// layouts
const MainLayout = lazy(() => import("@layouts/mainLayout/MainLayout"));

// lazy pages
const HomePage = lazy(() => import("@pages/home/HomePage"));
const LoginPage = lazy(() => import("@pages/login/LoginPage"));
const RegisterPage = lazy(() => import("@pages/register/RegisterPage"));
const AboutUsPage = lazy(() => import("@pages/aboutUs/AboutUsPage"));
const CategoriesPage = lazy(() => import("@pages/categories/CategoriesPage"));
const ProductsPage = lazy(() => import("@pages/products/ProductsPage"));
const CartPage = lazy(() => import("@pages/cart/CartPage"));
const WishlistPage = lazy(() => import("@pages/wishlist/WishlistPage"));
const ErrorPage = lazy(() => import("@pages/errorBoundary/ErrorBoundary"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <MainLayout />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <RegisterPage />
            </Suspense>
          ),
        },
        {
          path: "about-us",
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <AboutUsPage />
            </Suspense>
          ),
        },
        {
          path: "categories/products/:prefix",
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <ProductsPage />
            </Suspense>
          ),
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
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <CategoriesPage />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <CartPage />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense
              fallback={<div className="text-center mt-5">Loading...</div>}
            >
              <WishlistPage />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: "/ecommerce-typescript/",
  }
);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
