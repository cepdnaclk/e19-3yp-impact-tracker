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
      <div>
        <p
          className={`${cardStyles.value} ${
            (String(metric.value).length > 20 && cardStyles.longlongText) ||
            (String(metric.value).length > 10 && cardStyles.longText)
          }`}
        >
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
            <span>{metric.trend}% vs</span>
            <span className={cardStyles.duration}>{timeSpan}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ImpactSummaryCard;
