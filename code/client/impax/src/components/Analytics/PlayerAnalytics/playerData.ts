export const data: {
  title: string;
  value: string;
  trend: number;
  metaUnits?: string;
}[] = [
  {
    title: "Cumulative Impacts",
    value: "850 g",
    trend: -20,
  },
  {
    title: "Impacts Recorded",
    value: "50",
    trend: 20,
  },
  {
    title: "Impact Frequency",
    value: "400",
    metaUnits: "/hr",
    trend: 10,
  },
  {
    title: "Average Impact",
    value: "43 g",
    trend: 40,
  },
];

export const criticalSessions: {
  name: string;
  date: string;
  cumulative: number;
  average: number;
  highest: number;
}[] = [
  {
    name: "Sri Lanka vs England",
    date: "12 Jan 2024",
    cumulative: 560,
    average: 40,
    highest: 96,
  },
  {
    name: "Sri Lanka vs Zimbabwe",
    date: "23 Dec 2023",
    cumulative: 400,
    average: 25,
    highest: 75,
  },
  {
    name: "Sri Lanka vs India",
    date: "06 Dec 2023",
    cumulative: 100,
    average: 25,
    highest: 30,
  },
];
