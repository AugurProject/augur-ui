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

export default class MarketHeaderBar extends Component {
  static propTypes = {
    category: PropTypes.string,
    reportingState: PropTypes.string,
    tags: PropTypes.array,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired
  };

  static defaultProps = {
    category: "",
    tags: [],
    reportingState: ""
  };

  constructor(props) {
    super(props);

    this.gotoFilter = this.gotoFilter.bind(this);
  }

  gotoFilter(type, value) {
    const { history } = this.props;
    let query = null;
    if (type === "category") {
      query = {
        [CATEGORY_PARAM_NAME]: value
      };
    } else {
      query = {
        [TAGS_PARAM_NAME]: value
      };
    }

    history.push({
      pathname: "markets",
      search: makeQuery(query)
    });
  }

  render() {
    const { category, reportingState, tags } = this.props;
    const phase = determineMarketPhase(reportingState);
    return (
      <section>
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
      </section>
    );
  }
}
