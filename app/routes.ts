import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "./routes/dashboard/index.tsx", [
        index("routes/home.tsx"),
        route('settings', './routes/dashboard/settings.tsx')
    ]),
    route("onboarding", "./routes/onboarding/index.tsx", [
        route("get-started", "./routes/onboarding/start.tsx"),
        route("login", "./routes/onboarding/login.tsx"),
        route("register", "./routes/onboarding/register.tsx"),
        route("employer-register", "./routes/onboarding/employer-register.tsx"),
    ]),
  
] satisfies RouteConfig;
