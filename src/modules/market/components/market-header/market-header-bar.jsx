import React, { Component } from "react";
import PropTypes from "prop-types";
import determineMarketPhase from "utils/determine-market-phase";
import Styles from "modules/market/components/market-header/market-header-bar.styles";
import classNames from "classnames";
import makeQuery from "modules/routes/helpers/make-query";
import {
  CATEGORY_PARAM_NAME,
  TAGS_PARAM_NAME
} from "modules/filter-sort/constants/param-names";
import { starIconOpen, starIconFilled } from "modules/common/components/icons";

export default class MarketHeaderBar extends Component {
  static propTypes = {
    category: PropTypes.string,
    reportingState: PropTypes.string,
    tags: PropTypes.array,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired,
    isLogged: PropTypes.bool,
    isFavorite: PropTypes.bool,
    addToFavorites: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    category: "",
    tags: [],
    reportingState: "",
    isLogged: false,
    isFavorite: false,
    isMobile: false
  };

  constructor(props) {
    super(props);

    this.gotoFilter = this.gotoFilter.bind(this);
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
      category,
      reportingState,
      tags,
      addToFavorites,
      isLogged,
      isFavorite,
      isMobile
    } = this.props;
    const phase = determineMarketPhase(reportingState);
    return (
      <section className={Styles.MarketHeaderBar}>
        <div className={Styles.MarketHeaderBar__container}>
          <div className={Styles.MarketHeaderBar__tag__container}>
            <div className={Styles.MarketHeaderBar__status}>
              <span style={{ marginTop: "0.125rem" }}>{phase}</span>
              <span
                className={classNames(
                  {
                    [Styles.MarketHeaderBar__underline__open]: phase === "Open"
                  },
                  {
                    [Styles.MarketHeaderBar__underline__resolved]:
                      phase === "Resolved"
                  },
                  {
                    [Styles.MarketHeaderBar__underline__reporting]:
                      phase !== "Resolved" && phase !== "Open"
                  }
                )}
              />
            </div>
            <div
              className={Styles.MarketHeaderBar__tags}
              role="Button"
              tabIndex="-1"
              onClick={() => this.gotoFilter("category", category)}
            >
              {category}
            </div>
            {tags &&
              tags.length > 0 &&
              tags.map(tag => (
                <div
                  className={Styles.MarketHeaderBar__tags}
                  role="Button"
                  tabIndex="-1"
                  key={tag}
                  onClick={() => this.gotoFilter("tag", tag)}
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
        {isMobile && addToFavorites && (
          <div className={Styles.MarketHeaderBar__watchlist__container}>
            <button
              onClick={() => addToFavorites()}
              className={Styles.MarketHeaderBar__watchlist}
              disabled={!isLogged}
            >
              <span>{isFavorite ? starIconFilled : starIconOpen}</span>
            </button>
          </div>
        )}
      </section>
    );
  }
}
