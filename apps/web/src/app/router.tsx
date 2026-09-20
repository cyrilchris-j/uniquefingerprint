import * as React from "react";
import { RouterProvider, createBrowserRouter, type RouteObject } from "react-router";

import { ErrorBoundary } from "../components/ErrorBoundary.js";
import { AccountLayout } from "../layouts/AccountLayout.js";
import { AdminLayout } from "../layouts/AdminLayout.js";
import { RootLayout } from "../layouts/RootLayout.js";
import { CATALOGUE_CATEGORIES } from "../lib/registry.js";

/**
 * The route table.
 *
 * Two conventions worth knowing before changing anything here:
 *
 *  - **Categories are real paths, not query parameters.** `/themes` and
 *    `/motion` are separate routes with their own metadata, because a category is
 *    a place on this site, not a filter applied to one page.
 *  - **Detail routes are registered per category.** `/motion/ticker` and
 *    `/components/magnetic-button` are distinct route definitions rather than a
 *    single `/:category/:slug`. That keeps a typo like `/motions/foo` a genuine
 *    404 instead of a page that silently renders an empty category, and it lets
 *    each category be code-split independently.
 *
 * Heavy routes — the playground and the builder — are lazy. The playground pulls
 * in a bundler and an editor; the builder pulls in the audit engine. Neither
 * belongs in the bundle a visitor downloads to read the catalogue.
 */

const HomePage = React.lazy(() => import("../routes/home.js"));
const ExplorePage = React.lazy(() => import("../routes/explore.js"));
const CategoryPage = React.lazy(() => import("../routes/category.js"));
const ResourcePage = React.lazy(() => import("../routes/resource.js"));
const SearchPage = React.lazy(() => import("../routes/search.js"));
const PlaygroundPage = React.lazy(() => import("../routes/playground.js"));
const BuilderPage = React.lazy(() => import("../routes/builder.js"));
const SubmitPage = React.lazy(() => import("../routes/submit.js"));
const DocsPage = React.lazy(() => import("../routes/docs.js"));
const NotFoundPage = React.lazy(() => import("../routes/not-found.js"));
const AdvancedPage = React.lazy(() => import("../routes/advanced.js"));
const AdvancedDetailPage = React.lazy(() => import("../routes/advanced-detail.js"));

// Contributor pages live in the same module as the index, so one chunk serves
// both. `ContributorsPage` is the module's default export.
const ContributorsPage = React.lazy(() => import("../routes/contributors.js"));
const ContributorPage = React.lazy(() =>
  import("../routes/contributors.js").then((module) => ({ default: module.ContributorPage })),
);
const CollectionsPage = React.lazy(() =>
  import("../routes/collections.js").then((module) => ({ default: module.CollectionsPage })),
);
const CollectionPage = React.lazy(() =>
  import("../routes/collections.js").then((module) => ({ default: module.CollectionPage })),
);

const ProfilePage = React.lazy(() =>
  import("../routes/account.js").then((module) => ({ default: module.ProfilePage })),
);
const FavoritesPage = React.lazy(() =>
  import("../routes/account.js").then((module) => ({ default: module.FavoritesPage })),
);
const AccountCollectionsPage = React.lazy(() =>
  import("../routes/account.js").then((module) => ({ default: module.AccountCollectionsPage })),
);
const AccountSubmissionsPage = React.lazy(() =>
  import("../routes/account.js").then((module) => ({ default: module.AccountSubmissionsPage })),
);

const AdminOverviewPage = React.lazy(() =>
  import("../routes/admin.js").then((module) => ({ default: module.AdminOverviewPage })),
);
const AdminSubmissionsPage = React.lazy(() =>
  import("../routes/admin.js").then((module) => ({ default: module.AdminSubmissionsPage })),
);
const AdminResourcesPage = React.lazy(() =>
  import("../routes/admin.js").then((module) => ({ default: module.AdminResourcesPage })),
);
const AdminReportsPage = React.lazy(() =>
  import("../routes/admin.js").then((module) => ({ default: module.AdminReportsPage })),
);
const AdminUsersPage = React.lazy(() =>
  import("../routes/admin.js").then((module) => ({ default: module.AdminUsersPage })),
);
const AdminAnalyticsPage = React.lazy(() =>
  import("../routes/admin.js").then((module) => ({ default: module.AdminAnalyticsPage })),
);
const CatalogueAdminPage = React.lazy(() => import("../routes/catalogue-admin.js"));

/** Every resource category route, generated from the single taxonomy. */
const categoryRoutes: RouteObject[] = CATALOGUE_CATEGORIES.map((category) => ({
  path: category.slug,
  element: <CategoryPage category={category.slug} />,
}));

const resourceRoutes: RouteObject[] = CATALOGUE_CATEGORIES.map((category) => ({
  path: `${category.slug}/:slug`,
  element: <ResourcePage />,
}));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "playground", element: <PlaygroundPage /> },
      { path: "builder", element: <BuilderPage /> },
      { path: "submit", element: <SubmitPage /> },

      { path: "advanced", element: <AdvancedPage /> },
      { path: "advanced/:category", element: <AdvancedPage /> },
      { path: "advanced/:category/:slug", element: <AdvancedDetailPage /> },

      ...categoryRoutes,
      ...resourceRoutes,

      { path: "collections", element: <CollectionsPage /> },
      { path: "collections/:id", element: <CollectionPage /> },
      { path: "contributors", element: <ContributorsPage /> },
      { path: "contributors/:username", element: <ContributorPage /> },

      // Docs: `/docs` lands on the first page rather than an empty index.
      { path: "docs", element: <DocsPage /> },
      { path: "docs/:slug", element: <DocsPage /> },

      {
        path: "account",
        element: <AccountLayout />,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "favorites", element: <FavoritesPage /> },
          { path: "collections", element: <AccountCollectionsPage /> },
          { path: "submissions", element: <AccountSubmissionsPage /> },
        ],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverviewPage /> },
          // The catalogue dashboard reads published artifacts only — no
          // database, no PII — so unlike the moderation pages it is also
          // useful unauthenticated and sits outside the role gate.
          { path: "catalogue", element: <CatalogueAdminPage /> },
          { path: "submissions", element: <AdminSubmissionsPage /> },
          { path: "resources", element: <AdminResourcesPage /> },
          { path: "reports", element: <AdminReportsPage /> },
          { path: "users", element: <AdminUsersPage /> },
          { path: "analytics", element: <AdminAnalyticsPage /> },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

/**
 * The browser router.
 *
 * Created once at module scope, which is what React Router wants: recreating a
 * router on render would discard its internal history state on every render.
 */
export const router = createBrowserRouter(routes);

export function AppRouter(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
