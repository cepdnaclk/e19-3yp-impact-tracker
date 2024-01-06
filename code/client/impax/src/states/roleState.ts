import { create } from "zustand";
import {Role} from "../types";

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleState = create<RoleState>()((set) => ({
  role: "manager",
  setRole: (role) => set({ role: role==="player"?"manager":"player"}),
}));
