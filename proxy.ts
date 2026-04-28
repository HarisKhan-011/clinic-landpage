import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/landingpage(.*)",
  "/find-doctor(.*)",
  "/health-library(.*)",
  "/institutes(.*)",
  "/patients-visitors(.*)",
  "/appointments(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Admin routes — must be signed in + have admin role
  if (isAdminRoute(request)) {
    if (!userId) return redirectToSignIn();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected routes — must be signed in
  if (isProtectedRoute(request) && !userId) {
    return redirectToSignIn();
  }

  // All other non-public routes
  if (!isPublicRoute(request) && !isAdminRoute(request) && !isProtectedRoute(request)) {
    await auth.protect();
  }
  // Public routes: middleware still runs, Clerk attaches session context automatically
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
