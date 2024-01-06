import { Map } from "immutable";

export type BuddyStatus = {
  battery: number;
  timestamp: number;
};

export type Impact = {
  magntitude: number;
  direction: "left" | "right" | "front" | "back" | "top" | "bottom";
  timestamp: number;
};

export type Buddies = {
  [id: number]: BuddyStatus;
};
export type BuddiesImpact = {
  [id: number]: Impact;
};

export type PlayerMap = {
  [buddy_id: number]: number;
};

export type Players = {
  [jersey_number: number]: {
    name: string;
    email?: string;
    verification?: "verified" | "pending" | "rejected";
  };
};

export type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";
