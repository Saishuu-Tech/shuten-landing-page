import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("join", "routes/join.tsx"),
  route("api/waitlist", "routes/api.waitlist.tsx"),
  route("legal", "routes/legal/_layout.tsx", [
    route("privacy", "routes/legal/privacy.tsx"),
    route("dpa", "routes/legal/dpa.tsx"),
    route("terms", "routes/legal/terms.tsx"),
    route("subprocessors", "routes/legal/subprocessors.tsx"),
  ]),
] satisfies RouteConfig;
