import { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./TeamAnalytics.module.scss";
import { MdBarChart } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import ImpactSummaryCard from "../ImpactSummaryCard";
// import {
//   teamAnalyticsSummary,
//   teamAnalyticsSummary2,
//   teamAnalyticsTableData,
//   teamAnalyticsTableData2,
// } from "./teamData";
import {
  // Metric,
  // TeamAnalyticsColumns,
  TimeSpan,
  TeamAnalyticsSummary,
} from "../../../types";
// import TeamAnalyticsTable from "./TeamAnalyticsTable";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/config";
import {
  // getAccessTokenFromRefreshToken,
  renewAccessToken,
} from "../../../services/authService";
import TeamAnalyticsTable from "./TeamAnalyticsTable";

const TeamAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("Last Week");

  const { data: AnalyticsSummaryManager } = useQuery({
    queryFn: () => fetchAnalyticsSummaryManager(),
    queryKey: ["analyticsSummaryManagerData", { timeSpan }],
  });

  async function fetchAnalyticsSummaryManager(): Promise<TeamAnalyticsSummary> {
    // Renew access Token
    await renewAccessToken();
    const response = await fetch(
      `${BASE_URL}/manager/analytics-summary/${timeSpan}`,
      {
        // Use the constructed URL with query params
        method: "GET", // Change the method to GET
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json", // Keep the Content-Type header for consistency
        },
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }

  return (
    <main>
      <Title Icon={MdBarChart} title="Team Analytics" />
      <div className={styles.summary}>
        <div className={styles.info}>
          <h2>{timeSpan} </h2> {/* TODO: Add a proper header */}
          <span>
            {AnalyticsSummaryManager?.tableData &&
              AnalyticsSummaryManager.tableData[0].name}
          </span>
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
        {AnalyticsSummaryManager?.summaryData?.map((metric) => (
          <ImpactSummaryCard
            metric={metric}
            timeSpan={timeSpan}
            key={metric.title}
          />
        ))}
      </div>
      <div className={styles.tableContainer}>
        {AnalyticsSummaryManager?.tableData ? (
          <TeamAnalyticsTable
            teamAnalyticsTableData={AnalyticsSummaryManager?.tableData}
            key={Date.now()}
          />
        ) : (
          <p>No Data</p>
        )}
      </div>
    </main>
  );
};

export default TeamAnalytics;
