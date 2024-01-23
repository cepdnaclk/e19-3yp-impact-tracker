export const data: {
  title: string;
  value: string;
  trend?: number;
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

export const data2: {
  title: string;
  value: string;
  trend?: number;
  metaUnits?: string;
}[] = [
  {
    title: "Cumulative Impacts",
    value: "199 g",
    trend: -10,
  },
  {
    title: "Impacts Recorded",
    value: "987",
    trend: 29,
  },
  // {
  //   title: "Impact Frequency",
  //   value: "899",
  //   metaUnits: "/hr",
  //   trend: 69,
  // },
  {
    title: "Average Impact",
    value: "43 g",
    trend: 40,
  },
  {
    title: "Highest Impact",
    value: "70g",
    trend: 10,
  },
  // {
  //   title: "Concussions",
  //   value: "1",
  // },
  {
    title: "Dominant Direction",
    value: "Left",
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

export const criticalSessions2: {
  name: string;
  date: string;
  cumulative: number;
  average: number;
  highest: number;
}[] = [
  {
    name: "Sri SRI vs England",
    date: "12 Jan 2024",
    cumulative: 560,
    average: 99,
    highest: 96,
  },
  {
    name: "Sri SRI vs Zimbabwe",
    date: "23 Dec 2023",
    cumulative: 400,
    average: 25,
    highest: 89,
  },
  {
    name: "Sri SRI vs India",
    date: "06 Dec 2023",
    cumulative: 100,
    average: 458,
    highest: 30,
  },
];
