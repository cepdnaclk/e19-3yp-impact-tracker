import { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./PlayerAnalytics.module.scss";
import { MdBarChart } from "react-icons/md";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaChevronDown,
} from "react-icons/fa6";
import { data, criticalSessions } from "./playerData";
import { StackedBarChart } from "./StackedBarChart";
import CriticalSession from "./CriticalSession";

type timeSpan = "Last 7 Days" | "Last Month" | "All Time";
const PlayerAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<timeSpan>("Last 7 Days");
  return (
    <main>
      <Title Icon={MdBarChart} title="Player Analytics" />
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
                  <button onClick={() => setTimeSpan("Last 7 Days")}>
                    Last 7 Days
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
        {data.map((metric) => (
          <div className={styles.card}>
            <h3>{metric.title}</h3>
            <p className={styles.value}>
              {metric.value}
              {metric.metaUnits && (
                <span className={styles.metaUnits}>{metric.metaUnits}</span>
              )}
            </p>
            <p className={styles.trend}>
              {metric.trend > 0 ? (
                <FaArrowTrendUp className={styles.iconUp} />
              ) : (
                <FaArrowTrendDown className={styles.iconDown} />
              )}
              <span>{metric.trend}%</span>
              <span className={styles.duration}>vs Last Week</span>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.chartAndRecentSessionsContainer}>
        <div className={styles.chartContainer}>
          <h2>Impact Histogram</h2>
          <StackedBarChart />
        </div>
        <div className={styles.criticalSessions}>
          <h2>Critical Sessions</h2>
          {criticalSessions.map((session) => (
            <div className={styles.criticalSessionContainer}>
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
    </main>
  );
};

export default PlayerAnalytics;
