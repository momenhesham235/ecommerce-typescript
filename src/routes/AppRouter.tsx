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
import ErrorPage from "@pages/errorBoundary/ErrorBoundary";

// components
import { LottieHandler, PageSuspenseFallback } from "@components/feedback";

import { ROUTES } from "@utils";
import productsPrefixGuard from "./loaders/productsPrefixGuard";

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: (
        <Suspense
          fallback={
            <div style={{ marginTop: "10%" }}>
              <LottieHandler type="loading" message="Loading please wait..." />
            </div>
          }
        >
          <MainLayout />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <HomePage />
            </PageSuspenseFallback>
          ),
        },
        {
          path: ROUTES.LOGIN,
          element: (
            <PageSuspenseFallback>
              <LoginPage />
            </PageSuspenseFallback>
          ),
        },
        {
          path: ROUTES.REGISTER,
          element: (
            <PageSuspenseFallback>
              <RegisterPage />
            </PageSuspenseFallback>
          ),
        },
        {
          path: ROUTES.ABOUT,
          element: (
            <PageSuspenseFallback>
              <AboutUsPage />
            </PageSuspenseFallback>
          ),
        },
        {
          path: ROUTES.PRODUCTS,
          element: (
            <PageSuspenseFallback>
              <ProductsPage />
            </PageSuspenseFallback>
          ),
          loader: productsPrefixGuard,
        },
        {
          path: ROUTES.CATEGORIES,
          element: (
            <PageSuspenseFallback>
              <CategoriesPage />
            </PageSuspenseFallback>
          ),
        },
        {
          path: ROUTES.CART,
          element: (
            <PageSuspenseFallback>
              <CartPage />
            </PageSuspenseFallback>
          ),
        },
        {
          path: ROUTES.WISHLIST,
          element: (
            <PageSuspenseFallback>
              <WishlistPage />
            </PageSuspenseFallback>
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
