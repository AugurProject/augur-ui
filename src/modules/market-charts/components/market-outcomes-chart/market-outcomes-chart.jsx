import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, isEmpty, isEqual, minBy } from "lodash";

import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";

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
    fixedPrecision: PropTypes.number.isRequired,
    hasPriceHistory: PropTypes.bool.isRequired,
    bucketedPriceTimeSeries: PropTypes.object.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    isMobileSmall: PropTypes.bool
  };

  static defaultProps = {
    isMobileSmall: false
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
    const { pricePrecision } = this.props;

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
        pricePrecision
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
      fixedPrecision,
      maxPrice,
      minPrice,
      outcomes,
      hasPriceHistory,
      bucketedPriceTimeSeries,
      isMobileSmall
    } = this.props;
    // this is stupid but done for prop-type validation.
    this.drawChart({
      creationTime,
      currentTimestamp,
      estimatedInitialPrice,
      fixedPrecision,
      maxPrice,
      minPrice,
      outcomes,
      hasPriceHistory,
      bucketedPriceTimeSeries,
      isMobileSmall
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
    pricePrecision,
    isMobileSmall,
    selectedOutcome
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
        isMobileSmall
      });
      const fauxDiv = new ReactFauxDOM.Element("div");
      const chart = d3
        .select(fauxDiv)
        .append("svg")
        .attr("id", "priceTimeSeries_chart")
        .attr("width", drawParams.width)
        .attr("height", drawParams.height);

      drawTicks({
        drawParams,
        chart,
        pricePrecision
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
        selectedOutcome
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

function determineDrawParams({
  drawContainer,
  maxPrice,
  minPrice,
  bucketedPriceTimeSeries,
  isMobileSmall
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

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(xDomain))
    .range([chartDim.left, containerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(yDomain))
    .range([containerHeight - chartDim.bottom, chartDim.top]);

  return {
    timeFormat: d3.timeFormat("%b-%d"),
    chartDim,
    containerWidth,
    containerHeight,
    xDomain,
    yDomain,
    xScale,
    yScale
  };
}

function drawTicks({ drawParams, chart, pricePrecision }) {
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
    .attr("x", 0)
    .attr("y", drawParams.yScale)
    .text(d => `${d.toFixed(pricePrecision)} ETH`);
}

function drawXAxisLabels({ chart, drawParams }) {
  const axis = d3
    .axisBottom(drawParams.xScale)
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
  selectedOutcome
}) {
  const initialPoint = {
    price: estimatedInitialPrice.toString(),
    timestamp: creationTime
  };

  const outcomeLine = d3
    .line()
    .x(d => drawParams.xScale(d.timestamp))
    .y(d => drawParams.yScale(createBigNumber(d.price).toNumber()));

  outcomes.forEach((outcome, i) => {
    const p = chart
      .append("path")
      .data([
        [initialPoint, ...bucketedPriceTimeSeries.priceTimeSeries[outcome.id]]
      ])
      .attr("d", outcomeLine)
      .classed(`${Styles["MarketOutcomesChart__outcome-line"]}`, true)
      .classed(`${Styles[`MarketOutcomesChart__outcome-line--${i}`]}`, true);
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
    .attr("r", 6)
    .attr("class", "crosshairDot")
    .style("display", "none");

  chart
    .append("svg:circle")
    .attr("id", "crosshairDotOutline")
    .attr("r", 16)
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
  pricePrecision,
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
      pricePrecision,
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
    pricePrecision,
    nearestDataPoint,
    selectedOutcome
  );
}

function updateHoveredLocationCrosshairPosition(
  drawParams,
  pricePrecision,
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

  d3.select("#hovered_priceTimeSeries_price_label")
    .style("display", "inline-block")
    .attr("x", 0)
    .attr("y", drawParams.yScale(price));

  d3.select("#hovered_priceTimeSeries_price_label-inner").html(
    `${createBigNumber(price)
      .toNumber()
      .toFixed(pricePrecision)} ETH`
  );

  d3.select("#hovered_priceTimeSeries_date_label")
    .style("display", "inline-block")
    .attr("x", drawParams.xScale(timestamp))
    .attr("y", drawParams.containerHeight - drawParams.chartDim.bottom + 4);

  d3.select("#hovered_priceTimeSeries_date_label-inner").html(
    drawParams.timeFormat(timestamp)
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
