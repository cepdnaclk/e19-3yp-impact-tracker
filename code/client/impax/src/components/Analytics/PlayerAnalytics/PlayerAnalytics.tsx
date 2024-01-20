import { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./PlayerAnalytics.module.scss";
import { MdBarChart } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { data, criticalSessions } from "./playerData";
import { StackedBarChart } from "./StackedBarChart";
import CriticalSession from "./CriticalSession";
import { TimeSpan } from "../../../types";
import ImpactSummaryCard from "../ImpactSummaryCard";

const PlayerAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("Last Week");
  return (
    <main>
      <Title Icon={MdBarChart} title="Player Analytics" />
      <div className={styles.summary}>
        <div className={styles.info}>
          <h2>John Doe's Individual Analytics</h2>{" "}
          <span>0 marked concussion</span>
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
        {data.map((metric) => (
          <ImpactSummaryCard metric={metric} timeSpan={timeSpan} />
        ))}
      </div>

      <div className={styles.chartAndRecentSessionsContainer}>
        <div className={styles.chartContainer}>
          <h2>Impact Histogram</h2>
          <StackedBarChart />
        </div>
        <div className={styles.criticalSessions}>
          <h2>Critical Sessions</h2>
          {criticalSessions.length == 0 && <p>No sessions recorded</p>}
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
