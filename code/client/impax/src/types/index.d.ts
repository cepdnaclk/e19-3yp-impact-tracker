//Example ImpactHistory
// { 12:  [{magntitude: 10, direction: "left", timestamp: 123456789, isConcussion: true }],
//   13:  [{magntitude: 10, direction: "left", timestamp: 123456789, isConcussion: false }],}
export type PlayerImpactHistory = {
  [jersey_number: number]: Impact[];
};

export type BuddyStatus = {
  battery: number;
  timestamp: number;
};
export type Role = "player" | "manager";

export type Impact = {
  magntitude: number;
  direction: "left" | "right" | "front" | "back" | "top" | "bottom";
  timestamp: number;
  isConcussion?: boolean;
};

export type Buddies = {
  [id: number]: BuddyStatus;
};
// export type BuddiesImpact = {
//   [id: number]: Impact;
// };
export type PlayersImpact = {
  [jersey_id: number]: Impact;
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

export type Session = {
  session_id: string;
  session_name: string;
  createdAt: number;
  updatedAt: number;
  active: boolean;
};

export type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";
