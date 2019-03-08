import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import getValue from "utils/get-value";

import MarketPositionsListOrphanedOrder from "modules/market/components/market-positions-list--orphaned-order/market-positions-list--orphaned-order";
import MarketLink from "modules/market/components/market-link/market-link";
import {
  AWAITING_SIGNATURE,
  PENDING,
  TYPE_CLAIM_PROCEEDS,
  TYPE_FINALIZE_MARKET
} from "modules/common-elements/constants";
import { dateHasPassed } from "utils/format-date";
import CommonStyles from "modules/market/components/common/market-common.styles";
import PositionStyles from "modules/market/components/market-positions-list/market-positions-list.styles";
import Styles from "modules/portfolio/components/market-portfolio-card/market-portfolio-card.styles";
import MarketPortfolioCardFooter from "modules/portfolio/components/market-portfolio-card/market-portfolio-card-footer";
import determineMarketPhase from "utils/determine-market-phase";

export default class MarketPortfolioCard extends Component {
  static propTypes = {
    claimTradingProceeds: PropTypes.func.isRequired,
    currentTimestamp: PropTypes.number.isRequired,
    isMobile: PropTypes.bool.isRequired,
    linkType: PropTypes.string,
    market: PropTypes.object.isRequired,
    positionsDefault: PropTypes.bool,
    finalizeMarket: PropTypes.func.isRequired,
    orphanedOrders: PropTypes.array.isRequired,
    transactionsStatus: PropTypes.object.isRequired,
    cancelOrphanedOrder: PropTypes.func.isRequired,
    sellCompleteSets: PropTypes.func.isRequired,
    reportingState: PropTypes.string
  };

  static defaultProps = {
    positionsDefault: true,
    linkType: null,
    reportingState: ""
  };

  constructor(props) {
    super(props);
    const { positionsDefault, orphanedOrders } = props;
    this.state = {
      tableOpen: {
        myPositions: positionsDefault,
        openOrders: orphanedOrders.length > 0 // open if orphaned orders are present
      },
      claimClicked: false,
      disableFinalize: false
    };
  }

  toggleTable(tableKey) {
    const { tableOpen } = this.state;
    this.setState({
      tableOpen: {
        ...tableOpen,
        [tableKey]: !tableOpen[tableKey]
      }
    });
  }

  finalizeMarket = () => {
    const { finalizeMarket, market } = this.props;
    this.setState({ disableFinalize: true });
    finalizeMarket(market.id, err => {
      if (err) this.setState({ disableFinalize: false });
    });
  };

  claimProceeds = () => {
    const { claimTradingProceeds, market } = this.props;
    this.setState({ claimClicked: true });
    claimTradingProceeds(market.id, err => {
      if (err) this.setState({ claimClicked: false });
    });
  };

  render() {
    const {
      currentTimestamp,
      isMobile,
      linkType,
      market,
      orphanedOrders,
      cancelOrphanedOrder,
      sellCompleteSets,
      transactionsStatus,
      reportingState
    } = this.props;
    const { tableOpen, claimClicked, disableFinalize } = this.state;
    const myPositionsSummary = getValue(market, "myPositionsSummary");
    const numCompleteSets = getValue(myPositionsSummary, "numCompleteSets");
    let localButtonText;
    let buttonAction;
    let disabled = false;
    switch (linkType) {
      case TYPE_CLAIM_PROCEEDS:
        localButtonText = "Claim Proceeds";
        buttonAction = this.claimProceeds;
        disabled = claimClicked;
        break;
      case TYPE_FINALIZE_MARKET:
        localButtonText = "Finalize Market";
        buttonAction = this.finalizeMarket;
        disabled = disableFinalize;
        break;
      default:
        localButtonText = "View";
    }
    const pendingCompleteSetsHash = `pending-${market.id}-${numCompleteSets &&
      numCompleteSets.fullPrecision}`;
    const pendingCompleteSetsInfo = transactionsStatus[pendingCompleteSetsHash];
    const status = pendingCompleteSetsInfo && pendingCompleteSetsInfo.status;
    let completeSetButtonText = "Sell Complete Sets";
    switch (status) {
      case AWAITING_SIGNATURE:
        completeSetButtonText = "Awaiting Signature...";
        break;
      case PENDING:
        completeSetButtonText = "Pending transaction...";
        break;
      default:
        completeSetButtonText = "Sell Complete Sets";
        break;
    }
    const phase = determineMarketPhase(reportingState);

    return (
      <article className={CommonStyles.MarketCommon__container}>
        <section
          className={classNames(
            CommonStyles.MarketCommon__topcontent,
            Styles.MarketCard__topcontent
          )}
        >
          <div
            className={classNames(
              CommonStyles.MarketCommon__header,
              Styles.MarketCard__header
            )}
          >
            <div className={Styles.MarketCard__headertext}>
              <span className={Styles["MarketCard__expiration--mobile"]}>
                {dateHasPassed(currentTimestamp, market.endTime.timestamp)
                  ? "Expired "
                  : "Expires "}
                {isMobile
                  ? market.endTime.formattedLocalShort
                  : market.endTime.formattedLocal}
              </span>
              <h1 className={CommonStyles.MarketCommon__description}>
                <MarketLink id={market.id}>{market.description}</MarketLink>
              </h1>
            </div>
            {!isMobile && (
              <div className={Styles.MarketCard__status}>
                <span style={{ marginTop: "0.125rem" }}>{phase}</span>
                <span
                  className={classNames(
                    {
                      [Styles.MarketCard__underline__open]: phase === "Open"
                    },
                    {
                      [Styles.MarketCard__underline__resolved]:
                        phase === "Resolved"
                    },
                    {
                      [Styles.MarketCard__underline__reporting]:
                        phase !== "Resolved" && phase !== "Open"
                    }
                  )}
                />
              </div>
            )}
          </div>

          <div className={Styles.MarketCard__topstats}>
            <div className={Styles.MarketCard__leftstats}>
              <div className={Styles.MarketCard__stat}>
                <span className={Styles.MarketCard__statlabel}>
                  Realized P/L
                </span>
                <span className={Styles.MarketCard__statvalue}>
                  {getValue(myPositionsSummary, "realizedNet.formatted") || "0"}
                </span>
                <span className={Styles.MarketCard__statunit}>ETH</span>
              </div>
              <div className={Styles.MarketCard__stat}>
                <span className={Styles.MarketCard__statlabel}>
                  Unrealized P/L
                </span>
                <span className={Styles.MarketCard__statvalue}>
                  {getValue(myPositionsSummary, "unrealizedNet.formatted") ||
                    "0"}
                </span>
                <span className={Styles.MarketCard__statunit}>ETH</span>
              </div>
              <div className={Styles.MarketCard__stat}>
                <span className={Styles.MarketCard__statlabel}>Total P/L</span>
                <span className={Styles.MarketCard__statvalue}>
                  {getValue(myPositionsSummary, "totalValue.formatted") || "0"}
                </span>
                <span className={Styles.MarketCard__statunit}>ETH</span>
              </div>
            </div>
            <span className={Styles.MarketCard__expiration}>
              <span className={Styles.MarketCard__expirationlabel}>
                {market.endTimeLabel}
              </span>
              <span className={Styles.MarketCard__expirationvalue}>
                {getValue(market, "endTime.formattedLocal")}
              </span>
            </span>
          </div>
        </section>
        <section className={Styles.MarketCard__tablesection}>
          {tableOpen.myPositions &&
            numCompleteSets &&
            numCompleteSets.value > 0 && (
              <div
                className={PositionStyles.MarketPositionsList__completeSets}
                style={{ paddingLeft: "0.5rem" }}
              >
                <span>{`You currently have ${
                  numCompleteSets.full
                } of all outcomes.`}</span>
                <button
                  onClick={e => {
                    sellCompleteSets(market.id, numCompleteSets, () => {});
                  }}
                  disabled={!!pendingCompleteSetsInfo}
                >
                  {completeSetButtonText}
                </button>
              </div>
            )}
        </section>
        <section className={Styles.MarketCard__tablesection}>
          <div className={PositionStyles.MarketPositionsList__table}>
            <div className={PositionStyles.MarketPositionsList__table}>
              <div
                className={PositionStyles["MarketPositionsList__table-body"]}
              >
                {tableOpen.openOrders &&
                  (orphanedOrders || []).map(order => (
                    <MarketPositionsListOrphanedOrder
                      key={order.orderId}
                      outcomeName={order.outcomeName}
                      order={order}
                      pending={false}
                      isExtendedDisplay
                      isMobile={isMobile}
                      outcome={order}
                      isOrphaned
                      cancelOrphanedOrder={cancelOrphanedOrder}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
        {linkType &&
          ((linkType === TYPE_CLAIM_PROCEEDS && market.outstandingReturns) ||
            linkType === TYPE_FINALIZE_MARKET) && (
            <MarketPortfolioCardFooter
              linkType={linkType}
              localButtonText={localButtonText}
              buttonAction={buttonAction}
              outstandingReturns={market.outstandingReturns}
              finalizationTime={market.finalizationTime}
              currentTimestamp={currentTimestamp}
              marketId={market.id}
              claimClicked={linkType === TYPE_CLAIM_PROCEEDS && claimClicked}
              disabled={disabled}
            />
          )}
      </article>
    );
  }
}
