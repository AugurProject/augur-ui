import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import Styles from "modules/common/components/chevron-flip/chevron-flip.styles";

// todo: simpilify this by making these in /icon folder and passing in params

const ChevronFlip = p => {
  if (p.filledInIcon) {
    return (
      <svg 
        width="12px" 
        height="8px" 
        viewBox="0 0 12 8"
        className={classNames(Styles.ChevronFlip, p.className, {
          [Styles.pointDown]: p.pointDown,
          [Styles.big]: p.big
        })}
      >
          <g id="Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="messages-stacked" transform="translate(-290.000000, -461.000000)" fill={p.stroke ? p.stroke : "#A7A2B2"} fillRule="nonzero">
                  <g id="Group-2" transform="translate(24.000000, 367.000000)">
                      <g id="Group-5" transform="translate(189.000000, 91.000000)">
                          <polygon id="Triangle" transform="translate(82.538462, 7.000000) scale(1, -1) translate(-82.538462, -7.000000) " points="82.5384615 3 88.0769231 11 77 11"></polygon>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
    )
  } else {
    return (
      <svg
        className={classNames(Styles.ChevronFlip, p.className, {
          [Styles.pointDown]: p.pointDown,
          [Styles.big]: p.big
        })}
        viewBox="0 0 16 16"
      >
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g stroke={p.stroke ? p.stroke : "#A7A2B2"}>
            <polyline
              transform="translate(8.156854, 11.156854) scale(1, -1) rotate(-225.000000) translate(-8.156854, -11.156854) "
              points="3.65685425 6.65685425 12.6568542 6.65685425 12.6568542 15.6568542"
            />
          </g>
        </g>
      </svg>
    )
  }  
};

ChevronFlip.propTypes = {
  className: PropTypes.string,
  pointDown: PropTypes.bool,
  stroke: PropTypes.string,
  big: PropTypes.bool,
  filledInIcon: PropTypes.bool,
};

export default ChevronFlip;


