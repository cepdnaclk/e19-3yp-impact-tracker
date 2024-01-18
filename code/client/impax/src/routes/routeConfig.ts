/* eslint-disable @typescript-eslint/no-explicit-any */
import SignUp from "../components/Profile/SignUp";
import Success from "../components/StatusScreens/Success";
import TeamExists from "../components/StatusScreens/TeamExists";
import Live from "../components/Live/Live";
import Devices from "../components/Devices/Devices";
import PlayerAnalytics from "../components/Analytics/PlayerAnalytics/PlayerAnalytics";
import PlayerManagement from "../components/PlayerManagement/PlayerManagement";
import Profile from "../components/Profile/Profile";
import TeamCreation from "../components/Profile/TeamCreation";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  props?: any;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    component: SignUp,
  },
  {
    path: "login/manager",
    component: Success,
    props: {
      title: "Login",
      description:
        "We're thrilled to see you again. Feel free to explore all the features and functionalities we offer.",
    },
  },
  {
    path: "/live",
    component: Live,
  },
  {
    path: "/devices",
    component: Devices,
  },
  {
    path: "/player-analytics",
    component: PlayerAnalytics,
  },
  {
    path: "/player-management",
    component: PlayerManagement,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/signup/manager",
    component: TeamCreation,
  },
  {
    path: "/signup/manager/success",
    component: Success,
    props: {
      title: "Signup",
      description:
        "Welcome to our platform! We're excited to have you join our community. Get ready to explore all the amazing features and services we offer.",
    },
  },
  {
    path: "/signup/manager/teamexists",
    component: TeamExists,
  },
];

export default routes;