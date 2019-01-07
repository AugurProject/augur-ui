import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  starIconOpen,
  starIconFilled,
  ChevronDown,
  ChevronUp,
  ChevronLeft
} from "modules/common/components/icons";
import MarkdownRenderer from "modules/common/components/markdown-renderer/markdown-renderer";
import MarketHeaderBar from "modules/market/containers/market-header-bar";
import { SCALAR } from "modules/markets/constants/market-types";
import { BigNumber } from "bignumber.js";
import Styles from "modules/market/components/market-header/market-header.styles";
import CoreProperties from "modules/market/components/core-properties/core-properties";
import TimeRange from "modules/market/components/market-header/market-header-time-range";

const OVERFLOW_DETAILS_LENGTH = 89; // in px, matches additional details label max-height

export default class MarketHeader extends Component {
  static propTypes = {
    clearSelectedOutcome: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    maxPrice: PropTypes.instanceOf(BigNumber).isRequired,
    minPrice: PropTypes.instanceOf(BigNumber).isRequired,
    market: PropTypes.object.isRequired,
    currentTime: PropTypes.number,
    marketType: PropTypes.string,
    scalarDenomination: PropTypes.string,
    resolutionSource: PropTypes.any,
    selectedOutcome: PropTypes.any,
    isLogged: PropTypes.bool,
    isMobile: PropTypes.bool,
    isMobileSmall: PropTypes.bool,
    isForking: PropTypes.bool,
    toggleFavorite: PropTypes.func,
    isFavorite: PropTypes.bool,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    isLogged: false,
    scalarDenomination: null,
    resolutionSource: "General knowledge",
    selectedOutcome: null,
    marketType: null,
    isForking: false,
    currentTime: 0,
    isFavorite: false,
    toggleFavorite: () => {},
    isMobile: false,
    isMobileSmall: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showReadMore: false,
      detailsHeight: 0
    };

    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.updateDetailsHeight = this.updateDetailsHeight.bind(this);
  }

  componentDidMount() {
    this.updateDetailsHeight();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) this.updateDetailsHeight();
  }

  updateDetailsHeight() {
    if (this.detailsContainer)
      this.setState({ detailsHeight: this.detailsContainer.scrollHeight });
  }

  toggleReadMore() {
    if (this.state.showReadMore && this.detailsContainer) {
      this.detailsContainer.scrollTop = 0;
    }
    this.setState({ showReadMore: !this.state.showReadMore });
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
    const detailsTooLong = this.state.detailsHeight > OVERFLOW_DETAILS_LENGTH;

    if (marketType === SCALAR) {
      const denomination = scalarDenomination ? ` ${scalarDenomination}` : "";
      const warningText =
        (details.length > 0 ? `\n\n` : ``) +
        `If the real-world outcome for this market is above this market's maximum value, the maximum value (${maxPrice.toNumber()}${denomination}) should be reported. If the real-world outcome for this market is below this market's minimum value, the minimum value (${minPrice.toNumber()}${denomination}) should be reported.`;
      details += warningText;
    }

    return (
      <section className={Styles.MarketHeader}>
        <button
          className={Styles[`MarketHeader__back-button`]}
          onClick={() => history.goBack()}
        >
          {ChevronLeft}
          <span> back</span>
        </button>
        <div className={Styles[`MarketHeader__main-values`]}>
          <div className={Styles.MarketHeader__descContainer}>
            {market.id && (
              <MarketHeaderBar
                marketId={market.id}
                category={market.category}
                reportingState={market.reportingState}
                tags={market.tags}
                addToFavorites={this.addToFavorites}
                isMobile={isMobile}
              />
            )}
            <h1 className={Styles.MarketHeader__description}>{description}</h1>
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
                  <h4>Additional Details</h4>
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
            <CoreProperties market={market} isMobile={isMobile} isMobileSmall={isMobileSmall} />
          </div>
          <div className={Styles.MarketHeader__timeStuff}>
            {!isMobile && 
              <div className={Styles.MarketHeader__watchlist__container}>
                <button
                  onClick={() => this.addToFavorites()}
                  className={Styles.MarketHeader__watchlist}
                  disabled={!isLogged}
                >
                  <span>
                    {isFavorite ? starIconFilled : starIconOpen}
                    {isFavorite ? "Remove from watchlist" : "Add to watchlist"}
                  </span>
                </button>
              </div>
            }
            <TimeRange
              currentTime={currentTime}
              startTime={market.creationTime}
              endTime={market.endTime}
              isMobile={isMobile}
            />
          </div>
        </div>
      </section>
    );
  }
}
