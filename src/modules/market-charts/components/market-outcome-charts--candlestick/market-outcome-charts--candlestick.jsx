import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import PeriodSelector from "modules/market-charts/components/market-outcome-charts--candlestick-period-selector/market-outcome-charts--candlestick-period-selector";
import CustomPropTypes from "utils/custom-prop-types";
import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";

import { map, sortBy } from "lodash";

import findPeriodSeriesBounds from "modules/markets/helpers/find-period-series-bounds";
// import { BUY, SELL } from "modules/transactions/constants/types";

import Styles from "modules/market-charts/components/market-outcome-charts--candlestick/market-outcome-charts--candlestick.styles";
import StylesHeader from "modules/market-charts/components/market-outcome-charts--header/market-outcome-charts--header.styles";

import { createBigNumber } from "utils/create-big-number";
import { getTickIntervalForRange } from "modules/markets/helpers/range";

class MarketOutcomeCandlestick extends React.PureComponent {
  static propTypes = {
    // currentTimeInSeconds: PropTypes.number,
    fixedPrecision: PropTypes.number.isRequired,
    isMobile: PropTypes.bool,
    // isMobileSmall: PropTypes.bool,
    marketMax: CustomPropTypes.bigNumber.isRequired,
    marketMin: CustomPropTypes.bigNumber.isRequired,
    // outcomeName: PropTypes.string.isRequired,
    priceTimeSeries: PropTypes.array.isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    selectedRange: PropTypes.number.isRequired,
    updateSelectedPeriod: PropTypes.func.isRequired,
    updateSelectedRange: PropTypes.func.isRequired,
    pricePrecision: PropTypes.number.isRequired
  };

  static defaultProps = {
    // currentTimeInSeconds: null,
    isMobile: false
    // isMobileSmall: false
  };

  static getDerivedStateFromProps(
    {
      currentTimeInSeconds,
      pricePrecision,
      marketMax,
      marketMin,
      priceTimeSeries,
      selectedPeriod,
      selectedRange,
      isMobileSmall
    },
    state
  ) {
    const { candleDim, containerHeight, containerWidth } = state;

    const outcomeBounds = findPeriodSeriesBounds(
      priceTimeSeries,
      marketMin,
      marketMax
    );
    const drawParams = determineDrawParams({
      candleDim,
      containerHeight,
      containerWidth,
      currentTimeInSeconds,
      pricePrecision,
      marketMax,
      marketMin,
      outcomeBounds,
      priceTimeSeries,
      selectedPeriod,
      selectedRange,
      isMobileSmall
    });

    return {
      ...state,
      ...drawParams
    };
  }

  constructor(props) {
    super(props);

    this.state = MarketOutcomeCandlestick.getDerivedStateFromProps(props, {
      candleDim: {
        width: 16,
        gap: 9
      },
      containerHeight: 0,
      containerWidth: 0,
      yScale: null,
      hoveredPrice: null,
      hoveredPeriod: {},
      chart: null
    });

    this.getContainerWidths = this.getContainerWidths.bind(this);
    this.updateContainerWidths = this.updateContainerWidths.bind(this);
    this.updateHoveredPrice = this.updateHoveredPrice.bind(this);
    this.updateHoveredPeriod = this.updateHoveredPeriod.bind(this);
    this.clearCrosshairs = this.clearCrosshairs.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateContainerWidths);
  }

  componentWillReceiveProps(nextProps) {
    const containerWidths = this.getContainerWidths();
    const drawParams = MarketOutcomeCandlestick.getDerivedStateFromProps(
      nextProps,
      {
        ...this.state,
        ...containerWidths
      }
    );

    this.setState({
      ...drawParams
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateContainerWidths);
  }

  getContainerWidths() {
    return {
      containerWidth: this.drawContainer.clientWidth,
      containerHeight: this.drawContainer.clientHeight
    };
  }

  updateContainerWidths() {
    this.setState(this.getContainerWidths());
  }

  updateHoveredPrice(hoveredPrice) {
    this.setState({
      hoveredPrice
    });
  }

  updateHoveredPeriod(hoveredPeriod) {
    this.setState({
      hoveredPeriod
    });
  }

  clearCrosshairs() {
    this.updateHoveredPrice(null);
    this.updateHoveredPeriod({});
  }

  drawChart() {
    const candleChartContainer = new ReactFauxDOM.Element("div");
    const {
      pricePrecision,
      marketMax,
      marketMin,
      priceTimeSeries,
      selectedRange
    } = this.props;

    const {
      boundDiff,
      candleDim,
      chartDim,
      containerHeight,
      containerWidth,
      drawableWidth,
      xScale,
      yDomain,
      yScale,
      hoveredPrice,
      hoveredPeriod
    } = this.state;

    const candleChartSvg = d3.select(candleChartContainer).append("svg");
    const candleChart = candleChartSvg
      .attr("id", "candlestick_chart")
      .attr("height", containerHeight)
      .attr("width", drawableWidth);

    const defs = candleChartSvg.append("defs");
    defs
      .append("filter")
      .attr("id", "dilate-filter")
      .append("feMorphology")
      .attr("operator", "erode")
      .attr("radius", 1)
      .attr("in", "SourceGraphic");

    defs
      .append("mask")
      .attr("class", "candle-mask")
      .attr("id", "candle-mask")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("fill", "white");

    drawTicks({
      boundDiff,
      candleDim,
      candleChartSvg,
      chartDim,
      containerHeight,
      containerWidth,
      pricePrecision,
      marketMax,
      marketMin,
      priceTimeSeries,
      xScale,
      yDomain,
      yScale
    });

    drawCandles({
      boundDiff,
      candleChart,
      candleDim,
      chartDim,
      clearCrosshairs: this.clearCrosshairs,
      containerHeight,
      containerWidth,
      hoveredPeriod,
      pricePrecision,
      priceTimeSeries,
      updateHoveredPeriod: this.updateHoveredPeriod,
      updateHoveredPrice: this.updateHoveredPrice,
      xScale,
      yDomain,
      yScale
    });

    drawXAxisLabels({
      priceTimeSeries,
      candleChart,
      containerWidth,
      containerHeight,
      chartDim,
      candleDim,
      boundDiff,
      tickInterval: getTickIntervalForRange(selectedRange),
      yDomain,
      xScale
    });

    drawCrosshairs({
      candleChart,
      candleDim,
      chartDim,
      containerHeight,
      hoveredPeriod,
      hoveredPrice,
      pricePrecision,
      xScale,
      yScale
    });

    return candleChartContainer.toReact();
  }

  render() {
    const {
      fixedPrecision,
      pricePrecision,
      isMobile,
      priceTimeSeries,
      selectedPeriod,
      selectedRange,
      updateSelectedPeriod,
      updateSelectedRange
    } = this.props;

    const { hoveredPeriod } = this.state;

    const chart = this.drawChart();

    return (
      <section className={Styles.MarketOutcomeCandlestick}>
        <section>
          <div
            className={Styles["MarketOutcomeChartsHeader__chart-interaction"]}
          >
            <div
              className={classNames(
                Styles.MarketOutcomeChartsHeader__selector,
                {
                  [Styles[
                    "MarketOutcomeChartsHeader__selector--mobile"
                  ]]: isMobile
                }
              )}
            >
              <PeriodSelector
                priceTimeSeries={priceTimeSeries}
                updateSelectedPeriod={updateSelectedPeriod}
                updateSelectedRange={updateSelectedRange}
                selectedPeriod={selectedPeriod}
                selectedRange={selectedRange}
              />
            </div>
            <div
              className={classNames(
                StylesHeader.MarketOutcomeChartsHeader__stats,
                Styles.MarketOutcomeChartsHeader__stats
              )}
            >
              <span
                className={classNames(
                  StylesHeader.MarketOutcomeChartsHeader__stat,
                  Styles.MarketOutcomeChartsHeader__stat
                )}
              >
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-title`]}
                >
                  o:
                </span>
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-value`]}
                >
                  {hoveredPeriod.open ? (
                    hoveredPeriod.open.toFixed(pricePrecision).toString()
                  ) : (
                    <span>&mdash;</span>
                  )}
                </span>
              </span>
              <span
                className={classNames(
                  StylesHeader.MarketOutcomeChartsHeader__stat,
                  Styles.MarketOutcomeChartsHeader__stat
                )}
              >
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-title`]}
                >
                  c:
                </span>
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-value`]}
                >
                  {hoveredPeriod.close ? (
                    hoveredPeriod.close.toFixed(pricePrecision).toString()
                  ) : (
                    <span>&mdash;</span>
                  )}
                </span>
              </span>
              <span
                className={classNames(
                  StylesHeader.MarketOutcomeChartsHeader__stat,
                  Styles.MarketOutcomeChartsHeader__stat
                )}
              >
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-title`]}
                >
                  h:
                </span>
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-value`]}
                >
                  {hoveredPeriod.high ? (
                    hoveredPeriod.high.toFixed(pricePrecision).toString()
                  ) : (
                    <span>&mdash;</span>
                  )}
                </span>
              </span>
              <span
                className={classNames(
                  StylesHeader.MarketOutcomeChartsHeader__stat,
                  Styles.MarketOutcomeChartsHeader__stat
                )}
              >
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-title`]}
                >
                  l:
                </span>
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-value`]}
                >
                  {hoveredPeriod.low ? (
                    hoveredPeriod.low.toFixed(pricePrecision).toString()
                  ) : (
                    <span>&mdash;</span>
                  )}
                </span>
              </span>
              <span
                className={classNames(
                  StylesHeader.MarketOutcomeChartsHeader__stat,
                  Styles.MarketOutcomeChartsHeader__stat
                )}
              >
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-title`]}
                >
                  v:
                </span>
                <span
                  className={Styles[`MarketOutcomeChartsHeader__stat-value`]}
                >
                  {hoveredPeriod.volume ? (
                    hoveredPeriod.volume.toFixed(fixedPrecision).toString()
                  ) : (
                    <span>&mdash;</span>
                  )}
                </span>
              </span>
            </div>
          </div>
        </section>
        <div
          ref={drawContainer => {
            this.drawContainer = drawContainer;
          }}
          className={Styles.MarketOutcomeCandlestick__container}
        >
          {chart}
        </div>
      </section>
    );
  }
}

function determineDrawParams({
  containerHeight,
  containerWidth,
  currentTimeInSeconds,
  marketMax,
  marketMin,
  priceTimeSeries,
  selectedRange,
  isMobileSmall
}) {
  // Dimensions/Positioning
  const chartDim = {
    top: 5,
    bottom: 30,
    right: 5,
    left: isMobileSmall ? 20 : 10,
    stick: 5,
    tickOffset: 90
  };

  // Domain
  //  X
  const xDomain = [
    new Date((currentTimeInSeconds - selectedRange) * 1000),
    new Date(currentTimeInSeconds * 1000)
  ];

  //  Y
  const highValues = sortBy(priceTimeSeries, ["high"]);
  const lowValues = sortBy(priceTimeSeries, ["low"]);
  const max = highValues.length
    ? highValues[highValues.length - 1].high
    : marketMax.toNumber();
  const min = lowValues.length ? lowValues[0].low : marketMin.toNumber();

  const bnMax = createBigNumber(max);
  const bnMin = createBigNumber(min);
  const priceRange = bnMax.minus(bnMin);
  const buffer = priceRange.times(".10");
  const marketPriceRange = marketMax.minus(marketMin).dividedBy(2);
  const ltHalfRange = marketPriceRange.gt(priceRange);
  const maxPrice = ltHalfRange
    ? bnMax.plus(marketPriceRange)
    : bnMax.plus(buffer);
  const minPrice = ltHalfRange
    ? bnMin.minus(marketPriceRange)
    : bnMin.minus(buffer);

  let yDomain = [
    (maxPrice.gt(marketMax) ? marketMax : maxPrice).toNumber(),
    (minPrice.lt(marketMin) ? marketMin : minPrice).toNumber()
  ];

  // common case with low volume
  if (yDomain[0] === yDomain[1]) {
    if (yDomain[0] === 0) {
      yDomain = [marketMax.toNumber(), marketMin.toNumber()];
    } else {
      yDomain = [
        createBigNumber(yDomain[0])
          .times(1.5)
          .toNumber(),
        createBigNumber(yDomain[0])
          .times(0.5)
          .toNumber()
      ];
    }
  }

  // sigment y into 10 to show prices
  const boundDiff = createBigNumber(yDomain[0])
    .minus(createBigNumber(yDomain[1]))
    .dividedBy(2);

  // Scale
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(xDomain))
    .range([
      chartDim.left,
      containerWidth - chartDim.left - chartDim.tickOffset
    ]);

  const yScale = d3
    .scaleLinear()
    .clamp(true)
    .domain(d3.extent(yDomain))
    .range([containerHeight - chartDim.bottom, chartDim.top]);

  return {
    chartDim,
    drawableWidth: containerWidth,
    boundDiff,
    yDomain,
    xScale,
    yScale
  };
}

function drawTicks({
  boundDiff,
  candleChartSvg,
  chartDim,
  containerWidth,
  pricePrecision,
  xScale,
  yScale
}) {
  const [x1, x2] = xScale.range();
  //  Ticks
  const offsetTicks = yScale.ticks(3);

  candleChartSvg
    .selectAll("line")
    .data(offsetTicks)
    .enter()
    .append("line")
    .attr("class", "tick-line")
    .attr("x1", x1)
    .attr("x2", x2)
    .attr("y1", d => yScale(d))
    .attr("y2", d => yScale(d));

  candleChartSvg
    .selectAll("text.tick-value")
    .data(offsetTicks)
    .enter()
    .append("text")
    .attr("class", "tick-value")
    .attr("x", x2 + chartDim.right)
    .attr("y", d => yScale(d))
    .text(d => `${d.toFixed(pricePrecision)} ETH`);
}

function twoUpperCornerRoundedRect(x, y, width, height, radius) {
  return (
    "M" +
    (x + width) +
    "," +
    (y + height) +
    "v" +
    -(height - radius) +
    "a" +
    radius +
    "," +
    radius +
    " 0 0 0 " +
    -radius +
    "," +
    -radius +
    "h" +
    -(width - 2 * radius) +
    "a" +
    radius +
    "," +
    radius +
    " 0 0 0 " +
    -radius +
    "," +
    radius +
    "v" +
    (height - radius) +
    "z"
  );
}

function drawCandles({
  priceTimeSeries,
  updateHoveredPeriod,
  updateHoveredPrice,
  pricePrecision,
  candleChart,
  containerWidth,
  containerHeight,
  candleDim,
  hoveredPeriod,
  clearCrosshairs,
  xScale,
  yScale
}) {
  if (priceTimeSeries.length === 0) {
    drawNullState({ candleChart, containerWidth, containerHeight });
  } else {
    const yVolumeDomain = [0, ...map(priceTimeSeries, "volume")];
    const [yMax, ymin] = yScale.range();
    const yVolumeScale = d3
      .scaleLinear()
      .domain(d3.extent(yVolumeDomain))
      .range([yMax, yMax * 0.85]);

    candleChart
      .select("mask.candle-mask")
      .selectAll("rect.candle-mask-rect")
      .data(priceTimeSeries)
      .enter()
      .append("rect")
      .attr("class", "candle-mask-rect")
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("x", d => xScale(d.period))
      .attr("y", d => yScale(d3.max([d.open, d.close])))
      .attr("height", d =>
        Math.max(Math.abs(yScale(d.open) - yScale(d.close)), 1)
      )
      .attr("width", candleDim.width)
      .attr("fill", "Black");

    const g = candleChart
      .selectAll("g.periods")
      .data(priceTimeSeries)
      .enter()
      .append("g")
      .attr("class", "periods");

    g.append("rect")
      .attr("x", d => xScale(d.period))
      .attr("y", () => ymin)
      .attr("height", () => yMax - ymin)
      .attr("width", () => candleDim.width)
      .attr("class", "period-volume-background")
      .classed("hovered", d => d.period === hoveredPeriod.period);

    g.append("path")
      .attr("d", d =>
        twoUpperCornerRoundedRect(
          xScale(d.period),
          yVolumeScale(d.volume),
          candleDim.width,
          yMax - yVolumeScale(d.volume),
          2
        )
      )
      .attr("class", "period-volume")
      .classed("hovered", d => d.period === hoveredPeriod.period);

    g.append("rect")
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("x", d => xScale(d.period))
      .attr("y", d => yScale(d3.max([d.open, d.close])))
      .attr("height", d =>
        Math.max(Math.abs(yScale(d.open) - yScale(d.close)), 1)
      )
      .attr("width", candleDim.width)
      .attr("class", d => (d.close > d.open ? "up-period" : "down-period"));
    g.append("rect")
      .attr("class", "stem")
      .attr("x", d => xScale(d.period) + candleDim.width / 2)
      .attr("width", 1)
      .attr("y", d => yScale(d.high))
      .attr("height", d => yScale(d.low) - yScale(d.high))
      .attr("class", d => (d.close > d.open ? "up-period" : "down-period"));

    g.append("rect")
      .attr("class", "period-hover-target")
      .attr("x", d => xScale(d.period))
      .attr("y", () => ymin)
      .attr("height", () => yMax - ymin)
      .attr("width", () => candleDim.width)
      .on("mouseover", updateHoveredPeriod)
      .on("mousemove", () => {
        const y = d3.mouse(d3.event.target)[1];
        updateHoveredPrice(yScale.invert(y).toFixed(pricePrecision));
      })
      .on("mouseout", clearCrosshairs);
  }
}

function drawXAxisLabels({
  candleChart,
  containerHeight,
  chartDim,
  tickInterval,
  xScale
}) {
  candleChart
    .append("g")
    .attr("class", "candlestick-x-axis")
    .attr("transform", `translate(0, ${containerHeight - chartDim.bottom})`)
    .call(tickInterval(d3.axisBottom(xScale)));

  candleChart
    .select(`.candlestick-x-axis`)
    .attr("font", null)
    .attr("font-family", null)
    .attr("font-size", null)
    .attr("text-anchor", null);

  candleChart.selectAll(".tick text").attr("fill", null);
}

function drawCrosshairs({
  candleChart,
  candleDim,
  chartDim,
  chartWidth,
  containerHeight,
  hoveredPeriod: { period },
  hoveredPrice,
  pricePrecision,
  xScale,
  yScale
}) {
  if (hoveredPrice != null) {
    const [x1, x2] = xScale.range();
    const yPosition = yScale(hoveredPrice);
    const clampedHoveredPrice = yScale.invert(yPosition);

    candleChart
      .append("line")
      .attr("class", "crosshair")
      .attr("x1", x1)
      .attr("y1", yPosition)
      .attr("x2", x2)
      .attr("y2", yPosition);

    candleChart
      .append("foreignObject")
      .attr("x", x2 + chartDim.right)
      .attr("y", yScale(hoveredPrice))
      .append("div")
      .style("min-width", chartDim.tickOffset - 2)
      .attr("class", Styles["MarketOutcomeCandlestick__price_label-inner"])
      .html(`${clampedHoveredPrice.toFixed(pricePrecision)} ETH`);

    candleChart
      .append("foreignObject")
      .attr("x", xScale(period) + candleDim.width / 2)
      .attr("y", containerHeight - chartDim.bottom)
      .append("div")
      .attr("class", Styles["MarketOutcomeCandlestick__date_label-inner"])
      .html(`${clampedHoveredPrice.toFixed(pricePrecision)} ETH`);
  }
}

function drawNullState(options) {
  const { containerWidth, containerHeight, candleChart } = options;

  candleChart
    .append("text")
    .attr("class", Styles["MarketOutcomeCandlestick__null-message"])
    .attr("x", containerWidth / 2)
    .attr("y", containerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .text("No Completed Trades");
}

export default MarketOutcomeCandlestick;
