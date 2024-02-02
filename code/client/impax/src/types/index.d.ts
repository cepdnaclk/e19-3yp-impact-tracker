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
  direction: "Left" | "Right" | "Front" | "Back";
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

type Verification = "verified" | "pending" | "rejected";
export type Players = {
  [jersey_number: number]: {
    name: string;
    email?: string;
    verification?: Verification;
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

export type SessionToBeUploaded = {
  session: Session;
  playerImpactHistory: PlayerImpactHistory;
};

//Types for analytics
export type Metric = {
  title: string;
  value: string | number;
  trend?: number | Impact.direction | "--";
  metaUnits?: string;
};

export type TimeSpan = "Last Week" | "Last Month" | "All Time";

//for player analytics
export type HistogramData = {
  Left: number[];
  Right: number[];
  Front: number[];
  Back: number[];
};

//for player critical sessions
export type CriticalSessionType = {
  name: string;
  date: string;
  cumulative: number;
  average: number;
  highest: number;
};

//analyticsTableColumns
export type TeamAnalyticsColumns = {
  jersey_number: number;
  name: string;
  impacts_recorded: number;
  cumulative_impact: number;
  highest_impact: number;
  average_impact: number;
  dominant_direction: Impact.direction;
  concussions: number;
};

export type TeamAnalyticsSummary = {
  summaryData: Metric[];
  tableData: TeamAnalyticsColumns[];
};

export type PlayerAnalyticsSummary = {
  summaryData: Metric[];
  histogramData: HistogramData;
  criticalSessions: CriticalSessionType[];
};

//Profile Managers
export type Manager =
  | {
      name: string;
      email: string;
      verification: "verified";
    }
  | {
      email: string;
      verification: "pending" | "rejected";
    };

//Player Profile - My Teams
export type MyTeam = {
  team_id: string;
  team_name: string;
  verification: Verification;
};

// For local storage
export type PlayersWithTimeStamp = {
  timestamp: number;
  players: Players;
};

export type LoginInfo = {
  teamId?: string;
  teamName?: string;
  email: string;
};
