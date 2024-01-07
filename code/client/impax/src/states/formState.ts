import { create } from "zustand";
import {Role} from "../types";

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

interface signupInfo{
  teamId: string;
  email: string;
}

interface SignupState {
  isSignup: boolean;
  setIsSignup: (isSignup: boolean) => void;
  isManagerExist: boolean;
  setIsManagerExist: (isManagerExist: boolean) => void;
  isTeamExist: boolean;
  setIsTeamExist: (isTeamExist: boolean) => void;
  signupInfo: signupInfo;
  setSignupInfo: (signupInfo: signupInfo) => void;
}



export const useRoleState = create<RoleState>()((set) => ({
  role: "manager",
  setRole: (role) => set({ role: role==="player"?"manager":"player"}),
}));

export const useSignupState = create<SignupState>()((set) => ({
  isSignup: true,
  setIsSignup: (isSignup) => set({ isSignup: isSignup}),
  isManagerExist: true,
  setIsManagerExist: (isManagerExist) => set({ isManagerExist: isManagerExist}),
  isTeamExist: true,
  setIsTeamExist: (isTeamExist) => set({ isTeamExist: isTeamExist}),
  signupInfo: {teamId: "", email: ""},
  setSignupInfo: (signupInfo) => set({ signupInfo: signupInfo}),
}));
