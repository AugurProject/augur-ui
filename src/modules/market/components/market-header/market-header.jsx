import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  ChevronDown,
  ChevronUp,
  BackArrow
} from "modules/common/components/icons";
import MarkdownRenderer from "modules/common/components/markdown-renderer/markdown-renderer";
import MarketHeaderBar from "modules/market/containers/market-header-bar";
import { BigNumber } from "bignumber.js";
import Styles from "modules/market/components/market-header/market-header.styles";
import CoreProperties from "modules/market/components/core-properties/core-properties";
import ChevronFlip from "modules/common/components/chevron-flip/chevron-flip";
import { MarketHeaderCollapsed } from "modules/market/components/market-header/market-header-collapsed";
import toggleHeight from "utils/toggle-height/toggle-height";
import makeQuery from "modules/routes/helpers/make-query";
import { CategoryTagTrail } from "src/modules/common/components/category-tag-trail/category-tag-trail";
import { compact } from "lodash";
import {
  CATEGORY_PARAM_NAME,
  TAGS_PARAM_NAME,
  SCALAR
} from "modules/common-elements/constants";
import MarketHeaderReporting from "modules/market/containers/market-header-reporting";
import { MarketTimeline } from "modules/common-elements/progress";

import ToggleHeightStyles from "utils/toggle-height/toggle-height.styles";

const OVERFLOW_DETAILS_LENGTH = 89; // in px, matches additional details label max-height
const MIN_COLLAPSED_MARKET_HEADER = 100;
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
    isMobile: PropTypes.bool,
    toggleFavorite: PropTypes.func,
    isFavorite: PropTypes.bool,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    scalarDenomination: null,
    resolutionSource: "General knowledge",
    marketType: null,
    currentTime: 0,
    isFavorite: false,
    toggleFavorite: () => {},
    isMobile: false
  };

  constructor(props) {
    super(props);
    this.state = {
      showReadMore: false,
      detailsHeight: 0,
      headerCollapsed: false
    };

    this.gotoFilter = this.gotoFilter.bind(this);
    this.toggleReadMore = this.toggleReadMore.bind(this);
    this.updateDetailsHeight = this.updateDetailsHeight.bind(this);
    this.toggleMarketHeader = this.toggleMarketHeader.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
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

  toggleMarketHeader() {
    if (this.state.headerCollapsed) {
      this.setState({ headerCollapsed: !this.state.headerCollapsed }, () => {
        toggleHeight(
          this.marketHeaderContainer,
          this.state.headerCollapsed,
          MIN_COLLAPSED_MARKET_HEADER
        );
      });
    } else {
      toggleHeight(
        this.marketHeaderContainer,
        !this.state.headerCollapsed,
        MIN_COLLAPSED_MARKET_HEADER,
        () => {
          setTimeout(() => {
            this.setState({ headerCollapsed: !this.state.headerCollapsed });
          }, 200);
        }
      );
    }
  }

  addToFavorites() {
    this.props.toggleFavorite(this.props.market.id);
  }

  gotoFilter(type, value) {
    const { history } = this.props;
    const query =
      type === "category"
        ? {
            [CATEGORY_PARAM_NAME]: value
          }
        : {
            [TAGS_PARAM_NAME]: value
          };

    history.push({
      pathname: "markets",
      search: makeQuery(query)
    });
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
      isMobile,
      isFavorite,
      history
    } = this.props;
    let { details } = this.props;
    const { headerCollapsed } = this.state;
    const detailsTooLong = this.state.detailsHeight > OVERFLOW_DETAILS_LENGTH;

    if (marketType === SCALAR) {
      const denomination = scalarDenomination ? ` ${scalarDenomination}` : "";
      const warningText =
        (details.length > 0 ? `\n\n` : ``) +
        `If the real-world outcome for this market is above this market's maximum value, the maximum value (${maxPrice.toNumber()}${denomination}) should be reported. If the real-world outcome for this market is below this market's minimum value, the minimum value (${minPrice.toNumber()}${denomination}) should be reported.`;
      details += warningText;
    }

    const process = (...arr) =>
      compact(arr).map(label => ({
        label,
        onClick: () => {
          this.gotoFilter("category", label);
        }
      }));

    const categoriesWithClick = process(market.category);
    const tagsWithClick = compact(market.tags).map(tag => ({
      label: tag,
      onClick: () => {
        this.gotoFilter("tag", tag);
      }
    }));

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
        <div className={Styles.MarketHeader__topContainer}>
          {!isMobile && (
            <button
              className={Styles[`MarketHeader__back-button`]}
              onClick={() => history.goBack()}
            >
              {BackArrow}
            </button>
          )}
          <CategoryTagTrail
            categories={categoriesWithClick}
            tags={tagsWithClick}
          />
        </div>
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
              <h1 className={Styles.MarketHeader__description}>
                {description}
              </h1>

              <div className={Styles.MarketHeader__descriptionContainer}>
                <div
                  className={Styles.MarketHeader__details}
                  style={{ paddingBottom: "1rem" }}
                >
                  <h4>Resolution Source</h4>
                  <span className={Styles.Marketheader__resolutionSource}>
                    {resolutionSource}
                  </span>
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
              {market.id && (
                <MarketHeaderBar
                  marketId={market.id}
                  marketStatus={market.marketStatus}
                  addToFavorites={this.addToFavorites}
                  isMobile={isMobile}
                  isFavorite={isFavorite}
                  collapsedView={headerCollapsed}
                  marketType={marketType}
                  description={description}
                />
              )}
              <div className={Styles.MarketHeader__properties__reporting}>
                <MarketHeaderReporting marketId={market.id} />
              </div>
              <div className={Styles.MarketHeader__properties__core}>
                {market.id && <CoreProperties market={market} />}
                <div className={Styles.MarketHeader__timeStuff}>
                  <MarketTimeline
                    startTime={market.creationTime || 0}
                    currentTime={currentTime || 0}
                    endTime={market.endTime || 0}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {!isMobile && (
          <div className={Styles.MarketHeader__buttonContainer}>
            <button
              className={classNames(Styles.MarketHeader__button, {
                [Styles.MarketHeader__button__collapsed]: headerCollapsed
              })}
              onClick={() => this.toggleMarketHeader()}
            >
              <ChevronFlip pointDown={headerCollapsed} stroke="white" />
            </button>
          </div>
        )}
      </section>
    );
  }
}
