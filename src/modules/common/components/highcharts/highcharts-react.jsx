import React, { PureComponent } from "react";
import Highcharts from "highcharts/highstock";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

export default class HighchartsReact extends PureComponent {
  static propTypes = {
    options: PropTypes.object.isRequired,
    constructionType: PropTypes.string,
    allowChartUpdate: PropTypes.bool,
    updateArgs: PropTypes.array,
    callback: PropTypes.func
  };

  static defaultProps = {
    constructionType: "stockChart",
    updateArgs: [true, true],
    allowChartUpdate: true,
    callback: () => {}
  };

  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  componentDidMount() {
    const { options, callback, constructionType } = this.props;
    this.chart = Highcharts[constructionType](
      this.container,
      options,
      callback
    );
  }

  componentWillUpdate(nextProps) {
    const { allowChartUpdate, options, updateArgs } = nextProps;
    if (!isEqual(this.props.options, options)) {
      if (allowChartUpdate === true) {
        this.chart.update(options, ...updateArgs);
      }
    }
  }

  componentWillUnmount() {
    // Destroy chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  render() {
    return (
      <div
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
