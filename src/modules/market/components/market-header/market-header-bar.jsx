import React, { Component } from "react";
import PropTypes from "prop-types";
import determineMarketPhase from "utils/determine-market-phase";
import Styles from "modules/market/components/market-header/market-header-bar.styles";
import { starIconOpen, starIconFilled } from "modules/common/components/icons";

export default class MarketHeaderBar extends Component {
  static propTypes = {
    marketId: PropTypes.string.isRequired,
    isLogged: PropTypes.bool,
    isFavorite: PropTypes.bool,
    category: PropTypes.string,
    reportingState: PropTypes.string,
    tags: PropTypes.array,
    finalizeMarket: PropTypes.func,
    toggleFavorite: PropTypes.func
  };

  static defaultProps = {
    category: "",
    isFavorite: false,
    isLogged: false,
    tags: [],
    reportingState: "",
    finalizeMarket: () => {},
    toggleFavorite: () => {}
  };

  constructor(props) {
    super(props);

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  addToFavorites() {
    this.props.toggleFavorite(this.props.marketId);
  }

  render() {
    const { category, reportingState, tags, isFavorite } = this.props;
    const phase = determineMarketPhase(reportingState);
    return (
      <section>
        <div className={Styles.MarketHeaderBar__container}>
          <div className={Styles.MarketHeaderBar__tag__container}>
            <div className={Styles.MarketHeaderBar__status}>
              <span style={{ marginTop: "0.125rem" }}>{phase}</span>
              <span className={Styles.MarketHeaderBar__underline__open} />
            </div>
            <div className={Styles.MarketHeaderBar__tags}>{category}</div>
            {tags &&
              tags.length > 0 &&
              tags.map(tag => (
                <div className={Styles.MarketHeaderBar__tags} key={tag}>
                  {tag}
                </div>
              ))}
          </div>
          <div>
            <button
              onClick={() => this.addToFavorites()}
              className={Styles.MarketHeaderBar__watchlist}
            >
              <span>
                {isFavorite ? starIconFilled : starIconOpen}
                Add to watchlist
              </span>
            </button>
          </div>
        </div>
      </section>
    );
  }
}
