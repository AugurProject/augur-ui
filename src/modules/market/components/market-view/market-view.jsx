import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import classNames from "classnames";

import MarketHeader from "modules/market/containers/market-header";
// import MarketOutcomesAndPositions from "modules/market/containers/market-outcomes-and-positions";
import MarketOrdersPositionsTable from "modules/market/containers/market-orders-positions-table";
import MarketOutcomesList from "modules/market/containers/market-outcomes-list";
import MarketOutcomeOrders from "modules/market-charts/containers/market-outcome--orders";
import MarketTradingWrapper from "modules/trading/components/trading--wrapper/trading--wrapper";
import MarketChartsPane from "modules/market-charts/components/market-charts-pane/market-charts-pane";
import { createBigNumber } from "utils/create-big-number";
import parseMarketTitle from "modules/markets/helpers/parse-market-title";
import MarketTradeHistory from "modules/market/containers/market-trade-history";
import { CATEGORICAL } from "modules/markets/constants/market-types";
import { BUY } from "modules/transactions/constants/types";
import ModuleTabs from "modules/market/components/common/module-tabs/module-tabs";
import ModulePane from "modules/market/components/common/module-tabs/module-pane";

import Styles from "modules/market/components/market-view/market-view.styles";
import { precisionClampFunction } from "modules/markets/helpers/clamp-fixed-precision";
import { BigNumber } from "bignumber.js";

export default class MarketView extends Component {
  static propTypes = {
    market: PropTypes.object.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    marketId: PropTypes.string.isRequired,
    currentTimestamp: PropTypes.number.isRequired,
    isConnected: PropTypes.bool.isRequired,
    loadFullMarket: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    marketType: PropTypes.string,
    loadingState: PropTypes.any,
    pricePrecision: PropTypes.number,
    isMobile: PropTypes.bool,
    outcomes: PropTypes.array,
    isLogged: PropTypes.bool
  };

  static defaultProps = {
    pricePrecision: 4,
    marketType: undefined,
    loadingState: null,
    isMobile: false,
    outcomes: [],
    isLogged: false
  };

  constructor(props) {
    super(props);

    this.DEFAULT_ORDER_PROPERTIES = {
      orderPrice: "",
      orderQuantity: "",
      selectedNav: BUY
    };

    this.sharedChartMargins = {
      top: 0,
      bottom: 30
    };

    this.state = {
      selectedOrderProperties: this.DEFAULT_ORDER_PROPERTIES,
      selectedOutcome: props.marketType === CATEGORICAL ? 0 : "1",
      fixedPrecision: 4,
      selectedOutcomeProperties: {
        1: {
          ...this.DEFAULT_ORDER_PROPERTIES
        }
      }
    };

    this.updateSelectedOutcome = this.updateSelectedOutcome.bind(this);
    this.updateSelectedOrderProperties = this.updateSelectedOrderProperties.bind(
      this
    );
    this.clearSelectedOutcome = this.clearSelectedOutcome.bind(this);
    this.updatePrecision = this.updatePrecision.bind(this);
  }

  componentWillMount() {
    const { isConnected, loadFullMarket, loadingState, marketId } = this.props;
    if (isConnected && loadingState === null && !!marketId) {
      loadFullMarket(marketId);
    }
  }

  componentDidMount() {
    this.node.scrollIntoView();
  }

  componentWillUpdate(nextProps, nextState) {
    const { isConnected, loadingState, marketId } = this.props;
    if (
      (isConnected !== nextProps.isConnected ||
        loadingState !== nextProps.loadingState) &&
      (nextProps.isConnected &&
        nextProps.loadingState === null &&
        !!nextProps.marketId &&
        (nextProps.marketId !== marketId || nextProps.marketType === undefined))
    ) {
      nextProps.loadFullMarket(nextProps.marketId);
    }
  }

  updateSelectedOutcome(selectedOutcome) {
    const { marketType } = this.props;
    this.setState({
      selectedOutcome:
        selectedOutcome === this.state.selectedOutcome &&
        marketType === CATEGORICAL
          ? 0
          : selectedOutcome,
      selectedOrderProperties: {
        ...this.DEFAULT_ORDER_PROPERTIES
      }
    });

    const { selectedOutcomeProperties } = this.state;
    if (!selectedOutcomeProperties[selectedOutcome]) {
      selectedOutcomeProperties[selectedOutcome] = {
        ...this.DEFAULT_ORDER_PROPERTIES
      };
      this.setState({ selectedOutcomeProperties });
    } else {
      this.setState({
        selectedOrderProperties: selectedOutcomeProperties[selectedOutcome]
      });
    }
  }

  updateSelectedOrderProperties(selectedOrderProperties) {
    this.setState({
      selectedOrderProperties: {
        ...this.DEFAULT_ORDER_PROPERTIES,
        ...selectedOrderProperties
      }
    });

    if (this.state.selectedOutcome) {
      const { selectedOutcomeProperties } = this.state;
      selectedOutcomeProperties[this.state.selectedOutcome] = {
        ...this.DEFAULT_ORDER_PROPERTIES,
        ...selectedOrderProperties
      };
      this.setState({ selectedOutcomeProperties });
    }
  }

  updatePrecision(isIncreasing) {
    let { fixedPrecision } = this.state;

    if (isIncreasing) {
      fixedPrecision += 1;
    } else {
      fixedPrecision -= 1;
    }

    this.setState({ fixedPrecision: precisionClampFunction(fixedPrecision) });
  }

  clearSelectedOutcome() {
    this.setState({ selectedOutcome: null });
  }

  render() {
    const {
      currentTimestamp,
      isLogged,
      description,
      marketId,
      maxPrice,
      minPrice,
      location,
      isMobile,
      outcomes,
      market
    } = this.props;
    const s = this.state;

    if (isMobile) {
      return (
        <section
          ref={node => {
            this.node = node;
          }}
          className={Styles.MarketView}
          style={{marginTop: '25px'}}
        >
          <Helmet>
            <title>{parseMarketTitle(description)}</title>
          </Helmet>
          <ModuleTabs selected={0} fillWidth>
            <ModulePane label="Market Info">
              <div className={Styles['MarketView__paneContainer--mobile']}>
                <MarketHeader
                  marketId={marketId}
                  selectedOutcome={s.selectedOutcome}
                  updateSelectedOutcome={this.updateSelectedOutcome}
                  clearSelectedOutcome={this.clearSelectedOutcome}
                  location={location}
                  isMobile={isMobile}
                />
                <MarketOutcomesList
                  marketId={marketId}
                  outcomes={outcomes}
                  selectedOutcome={s.selectedOutcome}
                  updateSelectedOutcome={this.updateSelectedOutcome}
                  isMobile={isMobile}
                />
              </div>
            </ModulePane>
            <ModulePane label="Trade">
              <div className={Styles['MarketView__paneContainer--mobile']}>
                <ModuleTabs selected={0} fillForMobile>
                  <ModulePane label="Order Book">
                    <div className={Styles.MarketView__orders}>
                      <MarketOutcomeOrders
                        headerHeight={0}
                        isMobile={isMobile}
                        sharedChartMargins={this.sharedChartMargins}
                        fixedPrecision={4}
                        pricePrecision={4}
                        hoveredPrice={null}
                        updateHoveredPrice={null}
                        updatePrecision={null}
                        updateSelectedOrderProperties={null}
                        marketId={marketId}
                        selectedOutcome={s.selectedOutcome}
                      />
                    </div>
                  </ModulePane>
                  <ModulePane label="Trade History">
                    <div className={Styles.MarketView__history}>
                      <div className={Styles.MarketView__component__history}>
                        {marketId && (
                          <MarketTradeHistory
                            marketId={marketId}
                            outcome={s.selectedOutcome}
                            isMobile={isMobile}
                          />
                        )}
                      </div>
                    </div>
                  </ModulePane>
                </ModuleTabs>
              </div>
            </ModulePane>
            <ModulePane label="Orders">
              <div className={Styles['MarketView__paneContainer--mobile']}>
                <MarketOrdersPositionsTable marketId={marketId} />
              </div>
            </ModulePane>
          </ModuleTabs>
          <div className={Styles['MarketView__buySellButton--button']}>
            <div>
              <button>
                Buy / Sell
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section
        ref={node => {
          this.node = node;
        }}
        className={Styles.MarketView}
      >
        <Helmet>
          <title>{parseMarketTitle(description)}</title>
        </Helmet>
        <div className={Styles.Market__upper}>
          <MarketHeader
            marketId={marketId}
            selectedOutcome={s.selectedOutcome}
            updateSelectedOutcome={this.updateSelectedOutcome}
            clearSelectedOutcome={this.clearSelectedOutcome}
            location={location}
          />
        </div>
        <section className={Styles.MarketView__body}>
          <div className={Styles.MarketView__firstColumn}>
            <div className={Styles.MarketView__firstRow}>
              <div className={Styles.MarketView__innerFirstColumn}>
                <div className={Styles.MarketView__component}>
                  Trading
                </div>
              </div>
              <div className={Styles.MarketView__innerSecondColumn}>
                <div
                  className={Styles.MarketView__component}
                  style={{
                    marginBottom: "12px",
                    flexGrow: "unset"
                  }}
                >
                  <MarketOutcomesList
                    marketId={marketId}
                    outcomes={outcomes}
                    selectedOutcome={s.selectedOutcome}
                    updateSelectedOutcome={this.updateSelectedOutcome}
                    isMobile={isMobile}
                  />
                </div>
                <div className={Styles.MarketView__component}>
                  <MarketChartsPane
                    marketId={marketId}
                    selectedOutcome={s.selectedOutcome}
                    currentTimestamp={currentTimestamp}
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    updateSelectedOrderProperties={
                      this.updateSelectedOrderProperties
                    }
                  />
                </div>
              </div>
            </div>
            <div className={Styles.MarketView__secondRow}>
              <div
                className={Styles.MarketView__component}
                style={{ padding: "0px" }}
              >
                <MarketOrdersPositionsTable marketId={marketId} />
              </div>
            </div>
          </div>
          <div className={Styles.MarketView__secondColumn}>
            <div
              className={classNames(Styles.MarketView__component, Styles.MarketView__orders)}
            >
              <MarketOutcomeOrders
                headerHeight={0}
                isMobile={isMobile}
                sharedChartMargins={this.sharedChartMargins}
                fixedPrecision={4}
                pricePrecision={4}
                hoveredPrice={null}
                updateHoveredPrice={null}
                updatePrecision={null}
                updateSelectedOrderProperties={null}
                marketId={marketId}
                selectedOutcome={s.selectedOutcome}
              />
            </div>
            <div
              className={classNames(Styles.MarketView__component, Styles.MarketView__history)}
            >
              <div className={Styles.MarketView__component__history}>
                {marketId && (
                  <MarketTradeHistory
                    marketId={marketId}
                    outcome={s.selectedOutcome}
                    isMobile={isMobile}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
