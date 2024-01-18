import React, { useState } from "react";
import Title from "../../Title/Title";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./PlayerAnalytics.module.scss";
import { MdBarChart } from "react-icons/md";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaChevronDown,
} from "react-icons/fa6";
import { data } from "./playerData";
import { StackedBarChart } from "./StackedBarChart";

type timeSpan = "7-days" | "month" | "all";
const PlayerAnalytics = () => {
  const [timeSpan, setTimeSpan] = useState<timeSpan>("7-days");
  return (
    <main>
      <Title Icon={MdBarChart} title="Player Analytics" />
      <div className={styles.summary}>
        <div className={styles.info}>
          <h2>Total Impacts: 9820g </h2> <span>0 marked concussion</span>
        </div>
        <div className={styles.controls}></div>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.selectTimeSpan}>
            Last 7 Days <FaChevronDown className={styles.icon} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.DropdownMenuContent}>
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <button>Last 7 Days</button>
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <button>Last Month</button>
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <button>All Time</button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

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

      <div className={styles.chartContainer}>
        <StackedBarChart />
      </div>
    </main>
  );
};

export default PlayerAnalytics;
