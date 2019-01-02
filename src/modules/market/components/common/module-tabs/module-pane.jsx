import React from "react";
import PropTypes from "prop-types";

const ModulePane = p => <div>{p.children}</div>;

ModulePane.propTypes = {
  label: PropTypes.string
};

export default ModulePane;
