// List of routes that should not use token verification middleware
const excludedRoutes = [
  { method: "POST", path: "/login/manager" },
  { method: "POST", path: "/login/player" },
  { method: "GET", path: "/team/exists" },
  { method: "GET", path: "/team/exists/teamId" },
  { method: "POST", path: "/team" },
  { method: "GET", path: "/manager" },
  { method: "POST", path: "/manager" },
  // Add more entries as needed
];

export default excludedRoutes;
