export type AnalyticsSummary = {
  summaryData: Array<{
    title: string;
    value: string | number;
    trend: number | ImpactDirection | "--";
  }>;
  histogramData: {
    Left: number[];
    Right: number[];
    Front: number[];
    Back: number[];
  };
  criticalSessions: Array<{
    name: string;
    date: string;
    cumulative: number;
    average: number;
    highest: number;
  }>;
};

export type ImpactDirection = "Left" | "Right" | "Front" | "Back" | "none";

export type SessionAnalytics = {
  name: string;
  date: string;
  cumulative: number;
  average: number;
  highest: number;
};

export type ImpactStats = {
  impactsCumulative: number;
  impactsRecorded: number;
  highestImpact: number;
  directionCount: {
    Front: number;
    Back: number;
    Left: number;
    Right: number;
  };
  sessionAnalytics: SessionAnalytics[];
};

export type TeamPlayerResponse = {
  name: string;
  email: string;
  verification: string;
};

export type AnalyticsSummaryTeam = {
  summaryData: Array<{
    title: string;
    value: string | number;
    trend?: string | number | "--";
  }>;
  tableData: Array<{
    jersey_number: number;
    name: string;
    impacts_recorded: number;
    average_impact: number;
    highest_impact: number;
    dominant_direction: ImpactDirection;
    cumulative_impact: number;
    concussions: number;
  }>;
};
