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
      session_name: string;
      session_date: string;
      cumulative_impact: number;
      average_impact: number;
      largest_impact: number;
    }>;
  };
  
  export type ImpactDirection = 'left' | 'right' | 'front' | 'back';
  