import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, isEmpty, isEqual, minBy } from "lodash";

import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";
import { timeFormat } from "utils/time-format";

import { createBigNumber } from "utils/create-big-number";

import Styles from "modules/market-charts/components/market-outcomes-chart/market-outcomes-chart.styles";
import { checkPropsChange } from "src/utils/check-props-change";

export default class MarketOutcomesChart extends Component {
  static propTypes = {
    creationTime: PropTypes.number.isRequired,
    currentTimestamp: PropTypes.number.isRequired,
    estimatedInitialPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    minPrice: PropTypes.number.isRequired,
    outcomes: PropTypes.array.isRequired,
    // fixedPrecision: PropTypes.number.isRequired,
    hasPriceHistory: PropTypes.bool.isRequired,
    bucketedPriceTimeSeries: PropTypes.object.isRequired,
    isMobileSmall: PropTypes.bool,
    isYesNo: PropTypes.bool,
    isScalar: PropTypes.bool,
    scalarDenomination: PropTypes.string.isRequired,
    selectedOutcome: PropTypes.string.isRequired
  };

  static defaultProps = {
    isMobileSmall: false,
    isYesNo: false,
    isScalar: false
  };

  constructor(props) {
    super(props);

    this.state = {
      chart: null,
      drawParams: {},
      hoveredLocation: []
    };

    this.drawChart = this.drawChart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.updateHoveredLocation = this.updateHoveredLocation.bind(this);
  }

  componentDidMount() {
    this.drawChart(this.props);
    window.addEventListener("resize", this.onResize);
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      checkPropsChange(this.props, nextProps, [
        "currentTimestamp",
        "outcomes",
        "selectedOutcome"
      ])
    ) {
      this.drawChart(nextProps);
    }

    if (
      !isEqual(this.state.hoveredLocation, nextState.hoveredLocation) ||
      !isEqual(this.state.drawParams, nextState.drawParams)
    ) {
      updateHoveredLocationCrosshairs({
        bucketedPriceTimeSeries: nextProps.bucketedPriceTimeSeries,
        hoveredLocation: nextState.hoveredLocation,
        drawParams: nextState.drawParams,
        selectedOutcome: nextProps.selectedOutcome,
        isScalar: nextProps.isScalar
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize() {
    const {
      creationTime,
      currentTimestamp,
      estimatedInitialPrice,
      // fixedPrecision,
      maxPrice,
      minPrice,
      outcomes,
      hasPriceHistory,
      bucketedPriceTimeSeries,
      isMobileSmall,
      isYesNo,
      isScalar,
      scalarDenomination,
      selectedOutcome
    } = this.props;
    // this is stupid but done for prop-type validation.
    this.drawChart({
      creationTime,
      currentTimestamp,
      estimatedInitialPrice,
      // fixedPrecision,
      maxPrice,
      minPrice,
      outcomes,
      hasPriceHistory,
      bucketedPriceTimeSeries,
      isMobileSmall,
      isYesNo,
      isScalar,
      scalarDenomination,
      selectedOutcome
    });
  }

  drawChart({
    creationTime,
    currentTimestamp,
    estimatedInitialPrice,
    maxPrice,
    minPrice,
    outcomes,
    hasPriceHistory,
    bucketedPriceTimeSeries,
    isMobileSmall,
    selectedOutcome,
    isYesNo,
    isScalar,
    scalarDenomination,
    fixedPrecision
  }) {
    if (this.outcomesChart) {
      const drawParams = determineDrawParams({
        creationTime,
        currentTimestamp,
        estimatedInitialPrice,
        drawContainer: this.outcomesChart,
        maxPrice,
        minPrice,
        outcomes,
        hasPriceHistory,
        bucketedPriceTimeSeries,
        isMobileSmall,
        isScalar,
        fixedPrecision
      });
      const fauxDiv = new ReactFauxDOM.Element("div");
      const chart = d3
        .select(fauxDiv)
        .append("svg")
        .attr("id", "priceTimeSeries_chart")
        .attr("width", drawParams.width)
        .attr("height", drawParams.height);

      //  Fills
      const linearGradient = chart
        .append("defs")
        .append("linearGradient")
        .attr("id", "scalarGradient")
        .attr("x1", 0)
        .attr("y1", 1)
        .attr("x2", 0)
        .attr("y2", 0);

      linearGradient
        .append("stop")
        .attr("class", Styles.MarketOutcomesChart__scalar_gradient_stop_top)
        .attr("offset", "0%");

      linearGradient
        .append("stop")
        .attr("class", Styles.MarketOutcomesChart__scalar_gradient_stop_bottom)
        .attr("offset", "80%");

      chart
        .append("text")
        .attr("class", Styles.MarketOutcomesChart__scalar_denomination_label)
        .attr("x", drawParams.containerWidth / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text(scalarDenomination);

      drawTicks({
        drawParams,
        chart
      });

      drawXAxisLabels({
        drawParams,
        chart
      });

      drawSeries({
        chart,
        creationTime,
        estimatedInitialPrice,
        outcomes,
        drawParams,
        bucketedPriceTimeSeries,
        selectedOutcome,
        isYesNo,
        isScalar
      });

      drawCrosshairs({
        chart,
        drawParams
      });

      attachHoverHandler({
        drawParams,
        chart,
        updateHoveredLocation: this.updateHoveredLocation
      });

      if (!hasPriceHistory) {
        drawNullState({
          drawParams,
          chart
        });
      }

      this.setState({
        chart: fauxDiv.toReact(),
        drawParams
      });
    }
  }

  updateHoveredLocation(hoveredLocation) {
    this.setState({
      hoveredLocation
    });
  }

  render() {
    const s = this.state;

    return (
      <div className={Styles.MarketOutcomesChart}>
        <div
          ref={outcomesChart => {
            this.outcomesChart = outcomesChart;
          }}
          className={Styles.MarketOutcomesChart__chart}
        >
          {s.chart}
        </div>
      </div>
    );
  }
}

function yTickFormatFn(fixedPrecision, isScalar) {
  return price => {
    const fixedPrice = createBigNumber(price)
      .toNumber()
      .toFixed(fixedPrecision);

    return isScalar ? `${fixedPrice}` : `${fixedPrice}`;
  };
}

function determineDrawParams({
  drawContainer,
  maxPrice,
  minPrice,
  bucketedPriceTimeSeries,
  isScalar,
  fixedPrecision
}) {
  const chartDim = {
    top: 0,
    right: 10,
    bottom: 30,
    left: 10,
    tickOffset: 70
  };

  const containerWidth = drawContainer.clientWidth - chartDim.right;
  const containerHeight = drawContainer.clientHeight;
  const xDomain = bucketedPriceTimeSeries.timeBuckets;
  const yDomain = [minPrice, maxPrice];

  const xExtents = d3.extent(xDomain);
  const xScale = d3
    .scaleTime()
    .domain(xExtents)
    .range([chartDim.tickOffset, containerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(yDomain))
    .range([containerHeight - chartDim.bottom, chartDim.top]);

  return {
    timeFormat,
    yTickFormat: yTickFormatFn(fixedPrecision, isScalar),
    chartDim,
    containerWidth,
    containerHeight,
    xDomain,
    yDomain,
    xScale,
    yScale
  };
}

function drawTicks({ drawParams, chart }) {
  const numberOfTicks = 6;
  const ticks = drawParams.yScale.ticks(numberOfTicks).slice(1, 5);

  chart
    .append("g")
    .selectAll("line")
    .data(ticks)
    .enter()
    .append("line")
    .classed(Styles["MarketOutcomesChart__tick-line"], true)
    .attr("x1", drawParams.chartDim.tickOffset)
    .attr("x2", drawParams.containerWidth)
    .attr("y1", d => drawParams.yScale(d))
    .attr("y2", d => drawParams.yScale(d));

  chart
    .append("g")
    .selectAll("text")
    .data(ticks)
    .enter()
    .append("text")
    .classed(Styles["MarketOutcomesChart__tick-value"], true)
    .attr("x", drawParams.chartDim.left)
    .attr("y", drawParams.yScale)
    .text(drawParams.yTickFormat);
}

function drawXAxisLabels({ chart, drawParams }) {
  const axis = d3
    .axisBottom(drawParams.xScale)
    .ticks(6)
    .tickFormat(drawParams.timeFormat);

  chart
    .append("g")
    .attr("class", Styles["MarketOutcomesChart__outcomes-axis"])
    .attr(
      "transform",
      `translate(0, ${drawParams.containerHeight - drawParams.chartDim.bottom})`
    )
    .call(axis);

  chart
    .selectAll(`.${Styles["MarketOutcomesChart__outcomes-axis"]}`)
    .attr("font", null)
    .attr("font-family", null)
    .attr("font-size", null)
    .attr("text-anchor", null);

  chart.selectAll(".tick text").attr("fill", null);
}

function drawSeries({
  creationTime,
  drawParams,
  estimatedInitialPrice,
  outcomes,
  chart,
  bucketedPriceTimeSeries,
  selectedOutcome,
  isYesNo,
  isScalar
}) {
  const outcomeLine = d3
    .line()
    .curve(d3.curveBasis)
    .x(d => drawParams.xScale(d.timestamp))
    .y(d => drawParams.yScale(createBigNumber(d.price).toNumber()));

  outcomes.forEach(outcome => {
    const data = [...bucketedPriceTimeSeries.priceTimeSeries[outcome.id]];

    if (isScalar || isYesNo) {
      const area = d3
        .area()
        .curve(d3.curveBasis)
        .x(d => drawParams.xScale(d.timestamp))
        .y0(drawParams.containerHeight - drawParams.chartDim.bottom)
        .y1(d => drawParams.yScale(createBigNumber(d.price).toNumber()));

      chart
        .append("path")
        .datum(data)
        .attr("class", Styles.MarketOutcomesChart__scalar_gradient_fill)
        .attr("d", area);
    }

    const p = chart
      .append("path")
      .data([data])
      .attr("d", outcomeLine)
      .classed(`${Styles["MarketOutcomesChart__outcome-line"]}`, true)
      .classed(
        `${Styles[`MarketOutcomesChart__outcome-line--${outcome.id}`]}`,
        true
      );

    if (!isEmpty(selectedOutcome)) {
      p.classed(
        `${Styles[`MarketOutcomesChart__outcome-line-selected`]}`,
        selectedOutcome === outcome.id
      ).classed(
        `${Styles[`MarketOutcomesChart__outcome-line-unselected`]}`,
        selectedOutcome !== outcome.id
      );
    }
  });
}

function drawCrosshairs({ chart, drawParams }) {
  chart
    .append("foreignObject")
    .attr("id", "hovered_priceTimeSeries_price_label")
    .attr("class", Styles.MarketOutcomesChart__price_label)
    .style("display", "none")
    .append("div")
    // subtract the width of both borders (1px each).
    .style("min-width", drawParams.chartDim.tickOffset - 2)
    .attr("id", "hovered_priceTimeSeries_price_label-inner")
    .attr("class", Styles["MarketOutcomesChart__price_label-inner"]);

  chart
    .append("foreignObject")
    .attr("id", "hovered_priceTimeSeries_date_label")
    .style("display", "none")
    .append("div")
    .attr("id", "hovered_priceTimeSeries_date_label-inner")
    .attr("class", Styles["MarketOutcomesChart__date_label-inner"]);

  chart
    .append("svg:circle")
    .attr("id", "crosshairDot")
    .attr("r", 3)
    .attr("class", "crosshairDot")
    .style("display", "none");

  chart
    .append("svg:circle")
    .attr("id", "crosshairDotOutline")
    .attr("r", 8)
    .attr("fill", "none")
    .attr("class", "crosshairDotOutline")
    .style("display", "none");

  const crosshairs = chart
    .append("g")
    .attr("id", "priceTimeSeries_crosshairs")
    .style("display", "none");

  crosshairs
    .append("line")
    .attr("id", "priceTimeSeries_crosshairY")
    .attr("class", Styles.MarketOutcomesChart__crosshair);

  crosshairs
    .append("line")
    .attr("id", "priceTimeSeries_crosshairX")
    .attr("class", Styles.MarketOutcomesChart__crosshair);
}

function attachHoverHandler({ updateHoveredLocation, chart, drawParams }) {
  chart
    .on("mousemove", () => {
      const [x, y] = d3.mouse(d3.event.target);
      updateHoveredLocation({
        timestamp: drawParams.xScale.invert(x),
        price: drawParams.yScale.invert(y)
      });
    })
    .on("mouseout", () => updateHoveredLocation([]));
}

function findNearestDataPoint(priceTimeSeries, time, selectedOutcome) {
  const selectedOutcomeObj = get(priceTimeSeries, selectedOutcome);
  return minBy(selectedOutcomeObj, p =>
    Math.abs(p.timestamp - time, selectedOutcomeObj)
  );
}

function updateHoveredLocationCrosshairs({
  bucketedPriceTimeSeries: { priceTimeSeries, timeBuckets },
  drawParams,
  hoveredLocation,
  selectedOutcome
}) {
  // The cursor is not currently on the graph.
  if (hoveredLocation.length === 0) {
    clearCrosshair();
    return;
  }

  if (!selectedOutcome) {
    updateHoveredLocationCrosshairPosition(
      drawParams,
      hoveredLocation,
      selectedOutcome
    );
    return;
  }

  const nearestDataPoint = findNearestDataPoint(
    priceTimeSeries,
    hoveredLocation.timestamp,
    selectedOutcome
  );

  // There is no point near the cursor (Presumably because the there is no data)
  if (!nearestDataPoint) {
    clearCrosshair();
    return;
  }

  updateHoveredLocationCrosshairPosition(
    drawParams,
    nearestDataPoint,
    selectedOutcome
  );
}

function updateHoveredLocationCrosshairPosition(
  drawParams,
  { price, timestamp },
  selectedOutcome
) {
  d3.select("#priceTimeSeries_crosshairs").style("display", null);
  d3.select("#priceTimeSeries_crosshairY")
    .attr("x1", drawParams.chartDim.tickOffset)
    .attr("y1", drawParams.yScale(price))
    .attr("x2", drawParams.containerWidth)
    .attr("y2", drawParams.yScale(price));
  d3.select("#priceTimeSeries_crosshairX")
    .attr("x1", drawParams.xScale(timestamp))
    .attr("y1", drawParams.chartDim.top)
    .attr("x2", drawParams.xScale(timestamp))
    .attr("y2", drawParams.containerHeight - drawParams.chartDim.bottom + 4);

  if (selectedOutcome) {
    d3.select("#crosshairDot")
      .style("display", "inline-block")
      .classed(
        Styles[`MarketOutcomesChart__outcome-dot--${selectedOutcome}`],
        true
      )
      .attr("cx", drawParams.xScale(timestamp))
      .attr("cy", drawParams.yScale(price));

    d3.select("#crosshairDotOutline")
      .style("display", "inline-block")
      .classed(
        Styles[`MarketOutcomesChart__outcome-dot-outline--${selectedOutcome}`],
        true
      )
      .attr("cx", drawParams.xScale(timestamp))
      .attr("cy", drawParams.yScale(price));
  } else {
    d3.select("#crosshairDot").style("display", "none");
    d3.select("#crosshairDotOutline").style("display", "none");
  }

  d3.select("#hovered_priceTimeSeries_price_label")
    .style("display", "inline-block")
    .attr("x", 0)
    .attr("y", drawParams.yScale(price));

  d3.select("#hovered_priceTimeSeries_price_label-inner").html(
    drawParams.yTickFormat(price)
  );

  d3.select("#hovered_priceTimeSeries_date_label")
    .style("display", "inline-block")
    .attr("x", drawParams.xScale(timestamp))
    .attr("y", drawParams.containerHeight - drawParams.chartDim.bottom + 4);

  d3.select("#hovered_priceTimeSeries_date_label-inner").html(
    drawParams.timeFormat(new Date(timestamp))
  );
}

function clearCrosshair() {
  d3.select("#priceTimeSeries_crosshairs").style("display", "none");
  d3.select("#hovered_priceTimeSeries_price_label").style("display", "none");
  d3.select("#hovered_priceTimeSeries_date_label").style("display", "none");
  d3.select("#crosshairDot").style("display", "none");
  d3.select("#crosshairDotOutline").style("display", "none");
}

function drawNullState({ drawParams, chart }) {
  chart
    .append("text")
    .attr("class", Styles["MarketOutcomesChart__null-message"])
    .attr("x", drawParams.containerWidth / 2)
    .attr("y", drawParams.containerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .text("No Completed Trades");
}
