import React from "react";
import cardStyles from "./ImpactSummaryCard.module.scss";
import { Metric, TimeSpan } from "../../types";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const ImpactSummaryCard: React.FC<{ metric: Metric; timeSpan: TimeSpan }> = ({
  metric,
  timeSpan,
}) => {
  return (
    <div className={cardStyles.card}>
      <h3>{metric.title}</h3>
      <p className={cardStyles.value}>
        {metric.value}
        {metric.metaUnits && (
          <span className={cardStyles.metaUnits}>{metric.metaUnits}</span>
        )}
      </p>
      {timeSpan != "All Time" && metric.trend && (
        <p className={cardStyles.trend}>
          {metric.trend > 0 ? (
            <FaArrowTrendUp className={cardStyles.iconUp} />
          ) : (
            <FaArrowTrendDown className={cardStyles.iconDown} />
          )}
          <span>{metric.trend}%</span>
          <span className={cardStyles.duration}>vs {timeSpan}</span>
        </p>
      )}
    </div>
  );
};

export default ImpactSummaryCard;
