import React from "react";
import PropTypes from "prop-types";

const EtherscanLink = ({ baseUrl, txhash, label, showNonLink }) => (
  <span>
    {baseUrl && (
      <a href={baseUrl + txhash} target="blank">
        {label}
      </a>
    )}
    {!baseUrl && showNonLink && <span>{label}</span>}
  </span>
);

EtherscanLink.propTypes = {
  baseUrl: PropTypes.string,
  txhash: PropTypes.string,
  label: PropTypes.string,
  showNonLink: PropTypes.bool
};

export default EtherscanLink;
