import { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./TeamAnalytics.module.scss";
import { MdBarChart } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import ImpactSummaryCard from "../ImpactSummaryCard";
import {
  teamAnalyticsSummary,
  teamAnalyticsSummary2,
  teamAnalyticsTableData,
  teamAnalyticsTableData2,
} from "./teamData";
import { Metric, TeamAnalyticsColumns, TimeSpan } from "../../../types";
import TeamAnalyticsTable from "./TeamAnalyticsTable";
import { useQuery } from "react-query";

const TeamAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("Last Month");

  const { data: impactSummary } = useQuery(
    ["impactSummaryData", { timeSpan }],
    fetchImpactSummary
  );

  const {
    data: tableData,
    // isLoading: isMetricDataLoading,
    // isError: isMetricDataError,
  } = useQuery(["tableData", { timeSpan }], fetchTableData);
  console.log(tableData);
  async function fetchImpactSummary(): Promise<Metric[]> {
    // const response = await fetch("<PLAYER_DATA_API_ENDPOINT_URL>"); // Replace <PLAYER_DATA_API_ENDPOINT_URL> with the actual URL to fetch player data from
    // if (!response.ok) {
    //   throw new Error("Failed to fetch player data");
    // }
    // return response.json();
    if (timeSpan == "Last Week") return teamAnalyticsSummary;
    if (timeSpan == "Last Month") return teamAnalyticsSummary2;
    else return teamAnalyticsSummary;
  }
  async function fetchTableData(): Promise<TeamAnalyticsColumns[]> {
    // const response = await fetch("<PLAYER_DATA_API_ENDPOINT_URL>"); // Replace <PLAYER_DATA_API_ENDPOINT_URL> with the actual URL to fetch player data from
    // if (!response.ok) {
    //   throw new Error("Failed to fetch player data");
    // }
    // return response.json();
    if (timeSpan == "Last Week") return teamAnalyticsTableData;
    if (timeSpan == "Last Month") return teamAnalyticsTableData2;
    else return teamAnalyticsTableData;
  }

  return (
    <main>
      <Title Icon={MdBarChart} title="Team Analytics" />
      <div className={styles.summary}>
        <div className={styles.info}>
          <h2>Total Impacts: 9820g </h2> <span>0 marked concussion</span>
        </div>
        <div className={styles.controls}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className={styles.selectTimeSpan}>
                {timeSpan} <FaChevronDown className={styles.icon} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className={styles.DropdownMenuContent}>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  <button onClick={() => setTimeSpan("Last Week")}>
                    Last Week
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  <button onClick={() => setTimeSpan("Last Month")}>
                    Last Month
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                  <button onClick={() => setTimeSpan("All Time")}>
                    All Time
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className={styles.impactSummaryContainer}>
        {impactSummary?.map((metric) => (
          <ImpactSummaryCard metric={metric} timeSpan={timeSpan} />
        ))}
      </div>
      {/* TODO: table render issue */}
      <div className={styles.tableContainer}>
        {tableData ? (
          <TeamAnalyticsTable teamAnalyticsTableData={tableData} />
        ) : (
          <div>No Data is available</div>
        )}
      </div>
    </main>
  );
};

export default TeamAnalytics;
