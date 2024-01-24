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
      sessionName: string;
      sessionDate: string;
      cumulativeImpact: number;
      averageImpact: number;
      largestImpact: number;
    }>;
  };
  
export type ImpactDirection = 'left' | 'right' | 'front' | 'back';

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
  