import React, { Component } from "react";
import PropTypes from "prop-types";
import determineMarketPhase from "utils/determine-market-phase";
import Styles from "modules/market/components/market-header/market-header-bar.styles";

export default class MarketHeaderBar extends Component {
  static propTypes = {
    category: PropTypes.string,
    reportingState: PropTypes.string,
    tags: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  addToFavorites() {
    // add to favorites and change button styling
    console.log("add to watchlist");
  }

  render() {
    const { category, reportingState, tags } = this.props;
    const phase = determineMarketPhase(reportingState);
    return (
      <section>
        <div className={Styles.MarketHeaderBar__container}>
          <div className={Styles.MarketHeaderBar__tag__container}>
            <div className={Styles.MarketHeaderBar__status}>{phase}</div>
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
            <button onClick={() => this.addToFavorites()}>
              Add to Watchlist
            </button>
          </div>
        </div>
      </section>
    );
  }
}
