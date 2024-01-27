export type AnalyticsSummary = {
    summaryData: Array<{
      title: string;
      value: string | number;
      trend: number | ImpactDirection;
    }>;
    histogramData: {
      left: number[];
      right: number[];
      front: number[];
      back: number[];
    };
    criticalSessions: Array<{
      name: string;
      date: string;
      cumulative: number;
      average: number;
      largest: number;
    }>;
  };
  
export type ImpactDirection = 'left' | 'right' | 'front' | 'back'| 'none';

export type SessionAnalytics = {
  sessionName: string;
  sessionDate: string;
  cumulativeImpact: number;
  averageImpact: number;
  largestImpact: number;
};

export type ImpactStats = {
    impactsCumulative: number;
    impactsRecorded: number;
    highestImpact: number;
    directionCount: {
      front: number;
      back: number;
      left: number;
      right: number;
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
    trend?: string | number;
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


  