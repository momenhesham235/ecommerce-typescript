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
const ProfilePage = lazy(() => import("@pages/profile/ProfilePage"));
import ErrorPage from "@pages/errorBoundary/ErrorBoundary";

// components
import { LottieHandler, PageSuspenseFallback } from "@components/feedback";

import productsPrefixGuard from "@routes/loaders/productsPrefixGuard";
import { ProtectedRoute } from "@components/auth";
import { GuestRoute } from "@components/auth";
import { ROUTES } from "@utils";

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
        // 🌍 public routes
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <HomePage />
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

        // 👤 guest routes
        {
          element: <GuestRoute />,
          children: [
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
          ],
        },

        // 🔒 protected routes
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: ROUTES.WISHLIST,
              element: (
                <PageSuspenseFallback>
                  <WishlistPage />
                </PageSuspenseFallback>
              ),
            },
            {
              path: ROUTES.PROFILE,
              element: (
                <PageSuspenseFallback>
                  <ProfilePage />
                </PageSuspenseFallback>
              ),
            },
          ],
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
