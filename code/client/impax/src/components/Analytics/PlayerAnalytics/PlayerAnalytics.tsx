import { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./PlayerAnalytics.module.scss";
import { MdBarChart } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { StackedBarChart } from "./StackedBarChart";
import CriticalSession from "./CriticalSession";
import { PlayerAnalyticsSummary, TimeSpan } from "../../../types";
import ImpactSummaryCard from "../ImpactSummaryCard";
import { useQuery } from "@tanstack/react-query";
import { renewAccessToken } from "../../../services/authService";
import { BASE_URL } from "../../../config/config";
import { useAppState } from "../../../states/appState";
import NoInternetConnection from "../../StatusScreens/NoInternetConnection";
import ImpactSummarySkeleton from "../ImpactSummarySkeleton";
import Spinner from "../../StatusScreens/Spinner";
import { useLoginState } from "../../../states/profileState";
const PlayerAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("Last Week");
  const loginInfo = useLoginState((state) => state.loginInfo);

  const { data: AnalyticsSummaryPlayer, isLoading } = useQuery({
    queryFn: () => fetchAnalyticsSummaryPlayer(),
    queryKey: ["AnalyticsSummaryPlayerData", { timeSpan }],
  });

  async function fetchAnalyticsSummaryPlayer(): Promise<PlayerAnalyticsSummary> {
    await renewAccessToken();
    const response = await fetch(
      `${BASE_URL}/player/analytics-summary/${timeSpan}`,
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
    return responseData.analyticsSummary;
  }

  const isInternetAvailable = useAppState((state) => state.isInternetAvailable);
  if (!isInternetAvailable) {
    //show no internet connection component
    if (!isInternetAvailable) {
      return (
        <main>
          <Title title={"Player Analytics"} Icon={MdBarChart} />
          <NoInternetConnection />
        </main>
      );
    }
  }

  return (
    <main>
      <Title Icon={MdBarChart} title="Player Analytics" />
      <div className={styles.summary}>
        <div className={styles.info}>
          <h2>Analyze your Individual Impacts</h2>{" "}
          <span>{loginInfo.email}</span>
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

      {isLoading ? (
        <div>
          <ImpactSummarySkeleton />
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.impactSummaryContainer}>
            {AnalyticsSummaryPlayer?.summaryData?.map((metric) => (
              <ImpactSummaryCard
                metric={metric}
                timeSpan={timeSpan}
                key={metric.title}
              />
            ))}
          </div>

          <div className={styles.chartAndRecentSessionsContainer}>
            <div className={styles.chartContainer}>
              <h2>Impact Histogram</h2>
              {AnalyticsSummaryPlayer?.histogramData ? (
                <StackedBarChart {...AnalyticsSummaryPlayer.histogramData} />
              ) : (
                <div>No data Available</div>
              )}
            </div>
            <div className={styles.criticalSessions}>
              <h2>Critical Sessions</h2>
              {AnalyticsSummaryPlayer?.criticalSessions?.length == 0 && (
                <p>No sessions recorded</p>
              )}
              {AnalyticsSummaryPlayer?.criticalSessions?.map((session) => (
                <div
                  className={styles.criticalSessionContainer}
                  key={session.name}
                >
                  <CriticalSession
                    name={session.name}
                    date={session.date}
                    cumulative={session.cumulative}
                    average={session.average}
                    highest={session.highest}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default PlayerAnalytics;
