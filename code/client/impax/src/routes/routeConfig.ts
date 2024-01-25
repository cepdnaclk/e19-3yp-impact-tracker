/* eslint-disable @typescript-eslint/no-explicit-any */
import SignUp from "../components/Profile/SignUp";
import Success from "../components/StatusScreens/Success";
import TeamExists from "../components/StatusScreens/TeamExists";
import Live from "../components/Live/Live";
import Devices from "../components/Devices/Devices";
import PlayerAnalytics from "../components/Analytics/PlayerAnalytics/PlayerAnalytics";
import PlayerManagement from "../components/PlayerManagement/PlayerManagement";
import ManagerProfile from "../components/Profile/ManagerProfile/ManagerProfile";
import PlayerProfile from "../components/Profile/PlayerProfile/PlayerProfile";
import TeamCreation from "../components/Profile/TeamCreation";
import JoinTeam from "../components/Profile/JoinTeam";
import TeamAnalytics from "../components/Analytics/TeamAnalytics/TeamAnalytics";
import SignupSuccess from "../components/StatusScreens/SignupSuccess";
import { useSignupState } from "../states/formState";
interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  props?: any;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    component: useSignupState.getState().isLoggedInManager
      ? Live
      : useSignupState.getState().isLoggedInPlayer
      ? PlayerAnalytics
      : SignUp,
  },
  {
    path: "/SignUp",
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
    path: "login/player",
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
    path: "/team-analytics",
    component: TeamAnalytics,
  },
  {
    path: "/player-management",
    component: PlayerManagement,
  },
  {
    path: "/player-profile",
    component: PlayerProfile,
  },
  {
    path: "/manager-profile",
    component: ManagerProfile,
  },
  {
    path: "/signup/manager",
    component: TeamCreation,
  },
  {
    path: "/signup/manager/success",
    component: SignupSuccess,
    props: {
      title: "Signup",
      description: "Please Verify your email address.",
    },
  },
  {
    path: "/signup/player/success",
    component: SignupSuccess,
    props: {
      title: "Signup",
      description: "Please Verify your email address.",
    },
  },
  {
    path: "/signup/manager/teamexists",
    component: TeamExists,
  },
  {
    path: "/signup/manager/jointeam",
    component: JoinTeam,
  },
];

export default routes;
