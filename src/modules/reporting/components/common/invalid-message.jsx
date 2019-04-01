import React from "react";

const InvaildMessage = () => (
  <>
    <div>
      If a timezone isn’t provided in the Market Question and/or Additional
      Details, use the Official Reporting Start Time in UTC-0
    </div>
    <div>
      Guidelines for spotting markets that resolve as invalid:
      <ul>
        <li>The question is subjective in nature</li>
        <li>The outcome was not known at market end time</li>
        <li>
          The title, details, end time, resolution source, and outcomes are in
          direct conflict
        </li>
        <li>
          There are strong arguments for the market resolving as multiple
          outcomes.
        </li>
        <li>
          The resolution source does not provide a readily available answer.
        </li>
        <li>
          The resolution source provides different answers to different viewers.
          a
        </li>
      </ul>
    </div>
  </>
);

export default InvaildMessage;
