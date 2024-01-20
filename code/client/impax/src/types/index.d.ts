//Example ImpactHistory
// { 12:  [
//  {magntitude: 10, direction: "left", timestamp: 123456789, isConcussion: true }
// ],
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
  magnitude: number;
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

export type PlayersActiveTime = {
  [jersey_number: number]: number;
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
  | "player-management"
  | "player-analytics"
  | "team-analytics";

export type sessionToBeUploaded = {
  session: Session;
  playerImpactHistory: PlayerImpactHistory;
};

//Types for analytics
export type Metric = {
  title: string;
  value: string | number;
  trend?: number;
  metaUnits?: string;
};

export type TimeSpan = "Last 7 Days" | "Last Month" | "All Time";
