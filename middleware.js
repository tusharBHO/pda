import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Add more public routes here
const isPublicRoute = createRouteMatcher([
    "/(auth)/sign-in(.*)", // sign-in + nested routes
    "/(auth)/sign-up(.*)", // sign-up + nested routes
    "/",                   // homepage
    "/api/predict",        // 👈 allow API proxy without login
    "/upload",             // 👈 allow upload page without login (optional)
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect(); // redirect if not logged in
    }
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)", // everything except static files & _next
        "/",                      // homepage
    ],
};