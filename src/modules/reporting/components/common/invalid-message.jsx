import React from "react";
import Styles from "modules/reporting/components/common/highlighted-message.styles";

const InvalidMessage = () => (
  <div className={Styles.HighlightedMessage}>
    <div>
      If a timezone isn’t provided in the Market Question and/or Additional
      Details, use the{" "}
      <span className={Styles.bolden}>
        Official Reporting Start Time in{" "}
        <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">
          UTC-0
        </a>
      </span>
    </div>
    <div>
      <span className={Styles.bolden}>Definition: </span>The resolution source is an actor that reports on or decides the results of a market.
    </div>
    <div>
      <span className={Styles.bolden}>
        Guidelines for spotting markets that resolve as invalid:
      </span>
      <ul>
        <li>The question is subjective in nature</li>
        <li>
          The title, details, reporting start time, resolution source, and outcomes are in direct conflict.
        </li>
        <li>
          There are strong arguments for the market resolving as multiple outcomes.
        </li>
        <li>
          The resolution source does not provide a readily available answer.
        </li>
        <li>
          The resolution source provides different answers to different viewers.
        </li>
        <li>
          A resolution source is referenced in the description and is not specified in either the title or the resolution source field.
        </li>
        <li>
          The market refers to an asset that has a public ticker symbol, but is not referred to by that symbol.
        </li>
      </ul>
    </div>
  </div>
);

export default InvalidMessage;
