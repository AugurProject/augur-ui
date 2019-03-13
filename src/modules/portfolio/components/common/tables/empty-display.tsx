import React from "react";

import Styles from "modules/portfolio/components/common/tables/empty-display.styles";

export interface EmptyDisplayProps {
  title: string,
}

const EmptyDisplay = (props: EmptyDisplayProps) => (
  <div className={Styles.EmptyDisplay}>
    {props.title}
  </div>
);

export default EmptyDisplay;