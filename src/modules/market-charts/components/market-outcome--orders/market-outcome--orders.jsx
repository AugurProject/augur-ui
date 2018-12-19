import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MarketOutcomeHeaderOrders from "modules/market-charts/components/market-outcome--header-orders/market-outcome--header-orders";

import { ASKS, BIDS } from "modules/orders/constants/orders";
import { BUY, SELL } from "modules/transactions/constants/types";

import Styles from "modules/market-charts/components/market-outcome--orders/market-outcome--orders.styles";
import StylesHeader from "modules/market-charts/components/market-outcome-charts--header/market-outcome-charts--header.styles";
import { isEmpty, isEqual } from "lodash";

export default class MarketOutcomeChartsOrders extends Component {
  static propTypes = {
    sharedChartMargins: PropTypes.object.isRequired,
    orderBook: PropTypes.object.isRequired,
    fixedPrecision: PropTypes.number.isRequired,
    pricePrecision: PropTypes.number.isRequired,
    updateHoveredPrice: PropTypes.func.isRequired,
    updateSelectedOrderProperties: PropTypes.func.isRequired,
    updatePrecision: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number.isRequired,
    hasOrders: PropTypes.bool.isRequired,
    orderBookKeys: PropTypes.object.isRequired,
    marketId: PropTypes.string,
    selectedOutcome: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hoveredOrderIndex: null,
      hoveredSide: null
    };
  }

  componentDidMount() {
    this.asks.scrollTop = this.asks.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    const { orderBook } = this.props;
    if (
      isEmpty(prevProps.orderBook.asks) &&
      !isEqual(prevProps.orderBook.asks, orderBook.asks)
    ) {
      this.asks.scrollTop = this.asks.scrollHeight;
    }
  }

  render() {
    const {
      fixedPrecision,
      pricePrecision,
      orderBook,
      sharedChartMargins,
      updateHoveredPrice,
      updatePrecision,
      updateSelectedOrderProperties,
      isMobile,
      headerHeight,
      hasOrders,
      orderBookKeys
    } = this.props;
    const s = this.state;

    const orderBookAsks = orderBook.asks || [];

    return (
      <section
        className={Styles.MarketOutcomeOrderBook}
      >
        <MarketOutcomeHeaderOrders
          updatePrecision={updatePrecision}
          isMobile={isMobile}
          headerHeight={headerHeight}
        />
        <div
          className={classNames(
            Styles.MarketOutcomeOrderBook__Side,
            Styles["MarketOutcomeOrderBook__side--asks"]
          )}
        >
          <div
            className={classNames(
              Styles.MarketOutcomeOrderBook__container,
              Styles["MarketOutcomeOrderBook__container--asks"]
            )}
            ref={asks => {
              this.asks = asks;
            }}
          >
            {orderBookAsks.map((order, i) => (
              <div
                key={order.cumulativeShares}
                className={classNames(Styles.MarketOutcomeOrderBook__row, Styles.MarketOutcomeOrderBook__rowPositive, {
                  [Styles["MarketOutcomeOrderBook__row--head-bid"]]:
                    i === orderBook.asks.length - 1,
                  [Styles["MarketOutcomeOrderBook__row--hover"]]:
                    i === s.hoveredOrderIndex && s.hoveredSide === ASKS,
                  [Styles["MarketOutcomeOrderbook__row--hover-encompassed"]]:
                    s.hoveredOrderIndex !== null &&
                    s.hoveredSide === ASKS &&
                    i > s.hoveredOrderIndex
                })}
                onMouseEnter={() => {
                  //updateHoveredPrice(order.price.value);
                  this.setState({
                    hoveredOrderIndex: i,
                    hoveredSide: ASKS
                  });
                }}
                onMouseLeave={() => {
                  //updateHoveredPrice(null);
                  this.setState({
                    hoveredOrderIndex: null,
                    hoveredSide: null
                  });
                }}
              >
                <button
                  className={Styles.MarketOutcomeOrderBook__RowItem_ask}
                  onClick={() =>
                    updateSelectedOrderProperties({
                      orderPrice: order.price.value.toString(),
                      orderQuantity: order.cumulativeShares.toString(),
                      selectedNav: BUY
                    })
                  }
                  style={{justifyContent: 'flex-start'}}
                >
                  <span>
                    {order.shares.value.toFixed(fixedPrecision).toString()}
                  </span>
                </button>
                <button
                  className={Styles.MarketOutcomeOrderBook__RowItem_ask}
                  onClick={() =>
                    updateSelectedOrderProperties({
                      orderPrice: order.price.value.toString(),
                      orderQuantity: order.cumulativeShares.toString(),
                      selectedNav: BUY
                    })
                  }
                  style={{justifyContent: 'center'}}
                >
                  <span>
                    {order.price.value.toFixed(pricePrecision)}
                  </span>
                </button>
                <button
                  className={Styles.MarketOutcomeOrderBook__RowItem_ask}
                  onClick={() =>
                    updateSelectedOrderProperties({
                      orderPrice: order.price.value.toString(),
                      orderQuantity: order.cumulativeShares.toString(),
                      selectedNav: BUY
                    })
                  }
                >
                  <span>
                    {order.mySize
                      ? order.mySize.value.toFixed(fixedPrecision).toString()
                      : "—"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={Styles.MarketOutcomeOrderBook__Midmarket}>
          { hasOrders &&
            <div>
              <span className={Styles.MarketOutcomeOrderBook__MidmarketSpread}>Spread:</span> {orderBookKeys.spread.toFixed(pricePrecision)} 
              <span className={Styles.MarketOutcomeOrderBook__MidmarketEth}>ETH</span>
            </div>
          }
        </div>
        <div
          className={classNames(
            Styles.MarketOutcomeOrderBook__Side,
            Styles["MarketOutcomeOrderBook__side--bids"]
          )}
        >
          <div
            className={Styles.MarketOutcomeOrderBook__container}
            ref={bids => {
              this.bids = bids;
            }}
          >
            {(orderBook.bids || []).map((order, i) => (
              <div
                key={order.cumulativeShares}
                className={classNames(Styles.MarketOutcomeOrderBook__row, {
                  [Styles["MarketOutcomeOrderBook__row--head-ask"]]: i === 0,
                  [Styles["MarketOutcomeOrderBook__row--hover"]]:
                    i === s.hoveredOrderIndex && s.hoveredSide === BIDS,
                  [Styles["MarketOutcomeOrderbook__row--hover-encompassed"]]:
                    s.hoveredOrderIndex !== null &&
                    s.hoveredSide === BIDS &&
                    i < s.hoveredOrderIndex
                })}
                onMouseEnter={() => {
                  //updateHoveredPrice(order.price.value);
                  this.setState({
                    hoveredOrderIndex: i,
                    hoveredSide: BIDS
                  });
                }}
                onMouseLeave={() => {
                  //updateHoveredPrice(null);
                  this.setState({
                    hoveredOrderIndex: null,
                    hoveredSide: null
                  });
                }}
              >
                <button
                  className={Styles.MarketOutcomeOrderBook__RowItem_bid}
                  onClick={() =>
                    updateSelectedOrderProperties({
                      orderPrice: order.price.value.toString(),
                      orderQuantity: order.cumulativeShares.toString(),
                      selectedNav: SELL
                    })
                  }
                  style={{justifyContent: 'flex-start'}}
                >
                  <span>
                    {order.shares.value.toFixed(fixedPrecision).toString()}
                  </span>
                </button>
                <button
                  className={Styles.MarketOutcomeOrderBook__RowItem_bid}
                  onClick={() =>
                    updateSelectedOrderProperties({
                      orderPrice: order.price.value.toString(),
                      orderQuantity: order.cumulativeShares.toString(),
                      selectedNav: SELL
                    })
                  }
                  style={{justifyContent: 'center'}}
                >
                  <span>
                    {order.price.value.toFixed(pricePrecision)}
                  </span>
                </button>
                <button
                  className={Styles.MarketOutcomeOrderBook__RowItem_bid}
                  onClick={() =>
                    updateSelectedOrderProperties({
                      orderPrice: order.price.value.toString(),
                      orderQuantity: order.cumulativeShares.toString(),
                      selectedNav: SELL
                    })
                  }
                >
                  <span>
                    {order.mySize
                      ? order.mySize.value.toFixed(fixedPrecision).toString()
                      : "—"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
