import { Metric, TeamAnalyticsColumns } from "../../../types";

export const teamAnalyticsSummary: Metric[] = [
  {
    title: "Impacts Recorded",
    value: "560",
    trend: 20,
  },
  {
    title: "Contributing Players",
    value: "6",
    trend: 10,
  },
  {
    title: "Highest Contributor",
    value: "69 Angelo Mathews",
  },
  {
    title: "Frequent Direction",
    value: "Left",
  },
];

export const teamAnalyticsSummary2: Metric[] = [
  {
    title: "Impacts Recorded",
    value: "999",
    trend: 20,
  },
  {
    title: "Contributing Players",
    value: "999",
    trend: 10,
  },
  {
    title: "Highest Contributor",
    value: "69 Kaushitha Silva",
  },
  {
    title: "Frequent Direction",
    value: "Front",
  },
];

export const teamAnalyticsTableData: TeamAnalyticsColumns[] = [
  {
    jersey_number: 69,
    name: "Angelo Mathews",
    impacts_recorded: 35,
    average_impact: 10,
    highest_impact: 89,
    dominant_direction: "left",
    cumulative_impact: 100,
    concussions: 1,
  },
  {
    jersey_number: 23,
    name: "John Doe",
    impacts_recorded: 28,
    average_impact: 8,
    highest_impact: 78,
    dominant_direction: "right",
    cumulative_impact: 85,
    concussions: 0,
  },
  {
    jersey_number: 42,
    name: "Jane Smith",
    impacts_recorded: 40,
    average_impact: 12,
    highest_impact: 95,
    dominant_direction: "front",
    cumulative_impact: 120,
    concussions: 2,
  },
  // Add 20 more objects with dummy data...
  {
    jersey_number: 10,
    name: "David Johnson",
    impacts_recorded: 21,
    average_impact: 6,
    highest_impact: 62,
    dominant_direction: "back",
    cumulative_impact: 60,
    concussions: 0,
  },
  {
    jersey_number: 88,
    name: "Sarah Adams",
    impacts_recorded: 33,
    average_impact: 9,
    highest_impact: 81,
    dominant_direction: "left",
    cumulative_impact: 95,
    concussions: 1,
  },
  {
    jersey_number: 55,
    name: "Michael Brown",
    impacts_recorded: 30,
    average_impact: 10,
    highest_impact: 73,
    dominant_direction: "right",
    cumulative_impact: 110,
    concussions: 0,
  },
];

export const teamAnalyticsTableData2: TeamAnalyticsColumns[] = [
  {
    jersey_number: 69,
    name: "Kaushitha Silva",
    impacts_recorded: 35,
    average_impact: 10,
    highest_impact: 89,
    cumulative_impact: 200,
    dominant_direction: "left",
    concussions: 1,
  },
  {
    jersey_number: 23,
    name: "Mansitha Eashwara",
    impacts_recorded: 28,
    average_impact: 8,
    highest_impact: 78,
    dominant_direction: "right",
    cumulative_impact: 200,
    concussions: 0,
  },
];
