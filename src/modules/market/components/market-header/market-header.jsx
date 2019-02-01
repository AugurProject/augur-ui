import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  starIconOutline,
  starIconOpen,
  starIconFilled,
  ChevronDown,
  ChevronUp,
  BackArrow
} from "modules/common/components/icons";
import MarkdownRenderer from "modules/common/components/markdown-renderer/markdown-renderer";
import MarketHeaderBar from "modules/market/containers/market-header-bar";
import { SCALAR } from "modules/markets/constants/market-types";
import { BigNumber } from "bignumber.js";
import Styles from "modules/market/components/market-header/market-header.styles";
import CoreProperties from "modules/market/components/core-properties/core-properties";
import TimeRange from "modules/market/components/market-header/market-header-time-range";
import { createBigNumber } from "utils/create-big-number";
import { convertUnixToFormattedDate } from "utils/format-date";
import ChevronFlip from "modules/common/components/chevron-flip/chevron-flip";
import { MarketHeaderCollapsed } from "modules/market/components/market-header/market-header-collapsed";
import toggleHeight from "utils/toggle-height/toggle-height";

import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";

const OVERFLOW_DETAILS_LENGTH = 89; // in px, matches additional details label max-height
const MIN_COLLAPSED_MARKET_HEADER = 80;
export default class MarketHeader extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    market: PropTypes.object.isRequired,
    currentTime: PropTypes.number,
    marketType: PropTypes.string,
    scalarDenomination: PropTypes.string,
    resolutionSource: PropTypes.any,
    isLogged: PropTypes.bool,
    isMobile: PropTypes.bool,
    isMobileSmall: PropTypes.bool,
    toggleFavorite: PropTypes.func,
    isFavorite: PropTypes.bool,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    isLogged: false,
    scalarDenomination: null,
    resolutionSource: "General knowledge",
    marketType: null,
    currentTime: 0,
    isFavorite: false,
    toggleFavorite: () => {},
    isMobile: false,
    isMobileSmall: false
  };

  constructor(props) {
    super(props);
    this.state = {
      showReadMore: false,
      detailsHeight: 0,
      headerCollapsed: false
    };

    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.updateDetailsHeight = this.updateDetailsHeight.bind(this);
    this.toggleMarketHeader = this.toggleMarketHeader.bind(this);
  }

  componentDidMount() {
    this.updateDetailsHeight();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) this.updateDetailsHeight();
  }

  updateDetailsHeight() {
    if (this.detailsContainer)
      this.setState({
        detailsHeight: this.detailsContainer.scrollHeight
      });
  }

  toggleReadMore() {
    if (this.state.showReadMore && this.detailsContainer) {
      this.detailsContainer.scrollTop = 0;
    }
    this.setState({ showReadMore: !this.state.showReadMore });
  }

  toggleMarketHeader(headerCollapsed, currentHeight) {
    this.setState({
      headerCollapsed
    });
  }

  addToFavorites() {
    this.props.toggleFavorite(this.props.market.id);
  }

  render() {
    const {
      description,
      marketType,
      resolutionSource,
      minPrice,
      maxPrice,
      scalarDenomination,
      market,
      currentTime,
      isLogged,
      isMobileSmall,
      isMobile,
      isFavorite,
      history
    } = this.props;
    let { details } = this.props;
    const { headerCollapsed } = this.state;

    const endTimestamp = market.endTime ? market.endTime.timestamp : 0;
    const detailsTooLong = this.state.detailsHeight > OVERFLOW_DETAILS_LENGTH;
    const formattedEndTime =
      (endTimestamp && convertUnixToFormattedDate(endTimestamp)) || {};
    const hasPassed = createBigNumber(currentTime).gt(
      createBigNumber(endTimestamp)
    );

    if (marketType === SCALAR) {
      const denomination = scalarDenomination ? ` ${scalarDenomination}` : "";
      const warningText =
        (details.length > 0 ? `\n\n` : ``) +
        `If the real-world outcome for this market is above this market's maximum value, the maximum value (${maxPrice.toNumber()}${denomination}) should be reported. If the real-world outcome for this market is below this market's minimum value, the minimum value (${minPrice.toNumber()}${denomination}) should be reported.`;
      details += warningText;
    }

    return (
      <section
        ref={marketHeaderContainer => {
          this.marketHeaderContainer = marketHeaderContainer;
        }}
        className={classNames(
          Styles.MarketHeader,
          ToggleHeightStyles["toggle-height-target"],
          ToggleHeightStyles["start-open"],
          ToggleHeightStyles["toggle-height-target-quick"],
          {
            [Styles.MarketHeader__container__collapsed]: headerCollapsed
          }
        )}
      >
        <button
          className={Styles[`MarketHeader__back-button`]}
          onClick={() => history.goBack()}
        >
          {BackArrow}
          <span> back</span>
        </button>
        {headerCollapsed && (
          <MarketHeaderCollapsed
            description={description}
            market={market}
            currentTime={currentTime}
            marketType={marketType}
            toggleFavorite={this.addToFavorites}
            isFavorite={isFavorite}
          />
        )}
        {!headerCollapsed && (
          <div className={Styles[`MarketHeader__main-values`]}>
            <div
              className={classNames(Styles.MarketHeader__descContainer, {
                [Styles.MarketHeader__collapsed]: headerCollapsed
              })}
            >
              {market.id && (
                <MarketHeaderBar
                  marketId={market.id}
                  category={market.category}
                  reportingState={market.reportingState}
                  tags={market.tags}
                  addToFavorites={this.addToFavorites}
                  isMobile={isMobile}
                  isFavorite={isFavorite}
                  collapsedView={headerCollapsed}
                  marketType={marketType}
                  description={description}
                />
              )}

              <h1 className={Styles.MarketHeader__description}>
                {description}
              </h1>

              <div className={Styles.MarketHeader__descriptionContainer}>
                <div
                  className={Styles.MarketHeader__details}
                  style={{ paddingBottom: "1rem" }}
                >
                  <h4>Resolution Source</h4>
                  <span>{resolutionSource}</span>
                </div>
                {details.length > 0 && (
                  <div className={Styles.MarketHeader__details}>
                    <label
                      ref={detailsContainer => {
                        this.detailsContainer = detailsContainer;
                      }}
                      className={classNames(
                        Styles["MarketHeader__AdditionalDetails-text"],
                        {
                          [Styles["MarketHeader__AdditionalDetails-tall"]]:
                            detailsTooLong && this.state.showReadMore
                        },
                        {
                          [Styles["MarketHeader__AdditionalDetails-fade"]]:
                            detailsTooLong && !this.state.showReadMore
                        }
                      )}
                    >
                      <MarkdownRenderer text={details} hideLabel />
                    </label>

                    {detailsTooLong && (
                      <button
                        className={Styles.MarketHeader__readMoreButton}
                        onClick={this.toggleReadMore}
                      >
                        {!this.state.showReadMore
                          ? ChevronDown({ stroke: "#FFFFFF" })
                          : ChevronUp()}
                        <span>
                          {!this.state.showReadMore ? "More..." : "Less"}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={Styles.MarketHeader__properties}>
              <CoreProperties
                market={market}
                isMobile={isMobile}
                isMobileSmall={isMobileSmall}
              />
            </div>

            <div className={Styles.MarketHeader__timeStuff}>
              {!isMobile && (
                <div className={Styles.MarketHeader__watchlist__container}>
                  <button
                    onClick={() => this.addToFavorites()}
                    className={Styles.MarketHeader__watchlist}
                    disabled={!isLogged}
                  >
                    <span>
                      {isFavorite ? (
                        <span className={Styles.MarketHeader__hoverContainer}>
                          <span className={Styles.MarketHeader__filledIcon}>
                            {starIconFilled}
                          </span>
                        </span>
                      ) : (
                        <span className={Styles.MarketHeader__hoverContainer}>
                          <span className={Styles.MarketHeader__iconDefault}>
                            {starIconOpen}
                          </span>
                          <span className={Styles.MarketHeader__iconHover}>
                            {starIconOutline}
                          </span>
                        </span>
                      )}
                      {isFavorite
                        ? "Remove from watchlist"
                        : "Add to watchlist"}
                    </span>
                  </button>
                </div>
              )}
              <TimeRange
                currentTime={currentTime}
                startTime={market.creationTime}
                endTimestamp={endTimestamp}
                hasPassed={hasPassed}
                formattedEndTime={formattedEndTime}
                isMobile={isMobile}
              />
            </div>
          </div>
        )}
        <button
          className={classNames({
            [Styles.MarketHeader__button__collapsed]: headerCollapsed
          })}
          onClick={() => {
            toggleHeight(
              this.marketHeaderContainer,
              !headerCollapsed,
              MIN_COLLAPSED_MARKET_HEADER,
              () => {
                setTimeout(() => {
                  this.toggleMarketHeader(!headerCollapsed);
                }, 200);
              }
            );
          }}
        >
          <ChevronFlip pointDown={headerCollapsed} hover />
        </button>
      </section>
    );
  }
}
