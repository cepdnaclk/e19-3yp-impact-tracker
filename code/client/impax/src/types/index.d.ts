import { Map } from "immutable";

type BuddyStatus = {
  battery: number;
  timestamp: number;
};
export type Role = "player" | "manager";


type Impact = {
  magntitude: number;
  direction: "left" | "right" | "front" | "back" | "top" | "bottom";
};
export interface Buddies extends Map<number, BuddyStatus> {
  get(buddy_id: number): BuddyStatus | undefined;
  set(buddy_id: number, status: BuddyStatus): this;
  has(buddy_id: number): boolean;
  delete(buddy_id: number): this;
}

export interface BuddiesImpact extends Map<number, Impact> {
  get(buddy_id: number): Impact | undefined;
  set(buddy_id: number, impact: Impact): this;
  has(buddy_id: number): boolean;
  delete(buddy_id: number): this;
}

export type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";
