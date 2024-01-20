import { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./TeamAnalytics.module.scss";
import cardStyles from "../ImpactSummaryCard.module.scss";
import { MdBarChart } from "react-icons/md";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaChevronDown,
} from "react-icons/fa6";
import ImpactSummaryCard from "../ImpactSummaryCard";
import { teamAnalyticsSummary } from "./teamData";

type timeSpan = "Last 7 Days" | "Last Month" | "All Time";
const TeamAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<timeSpan>("Last 7 Days");
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

      <div className={styles.impactSummaryContainer}></div>
    </main>
  );
};

export default TeamAnalytics;
