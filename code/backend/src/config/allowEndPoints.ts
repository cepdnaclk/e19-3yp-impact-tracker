// List of routes that should not use token verification middleware
const excludedRoutes = [
  { method: "POST", path: "/login/manager" },
  { method: "POST", path: "/login/player" },
  { method: "GET", path: "/team/exists" },
  { method: "GET", path: "/team/exists/teamId" },
  { method: "POST", path: "/team" },
  { method: "POST", path: "/manager" },
  { method: "POST", path: "/team/manager" },
  // Add more entries as needed
];

const excludedRoutesStartWith = [
  { method: "GET", path: "/team/exists/teamId" },
  { method: "GET", path: "/manager/exists/email" },
  // Add more entries as needed
];

export { excludedRoutes, excludedRoutesStartWith };
