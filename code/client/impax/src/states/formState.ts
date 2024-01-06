import { create } from "zustand";
import {Role} from "../types";

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}
interface SignupState {
  isSignup: boolean;
  setIsSignup: (isSignup: boolean) => void;
  
}



export const useRoleState = create<RoleState>()((set) => ({
  role: "manager",
  setRole: (role) => set({ role: role==="player"?"manager":"player"}),
}));

export const useSignupState = create<SignupState>()((set) => ({
  isSignup: true,
  setIsSignup: (isSignup) => set({ isSignup: isSignup}),
}));
