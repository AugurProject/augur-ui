import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SELL } from "modules/trades/constants/types";
import Styles from "modules/market/components/market-trade-history/market-trade-history.styles";

export default class MarketTradeHistory extends Component {
  static propTypes = {
    isMobile: PropTypes.boolean,
    isMobileSmall: PropTypes.boolean,
    // todo figure out how to do keyed objects shape prop type
    groupedTradeHistoryVolume: PropTypes.object.isRequired,
    groupedTradeHistory: PropTypes.object.isRequired
  };

  static defaultProps = {
    isMobile: false,
    isMobileSmall: false
  };

  constructor(props) {
    super(props);

    this.state = {
      // misc: false
    };
  }

  render() {
    const { groupedTradeHistory, groupedTradeHistoryVolume } = this.props;

    return (
      <section className={Styles.MarketTradeHistory__container}>
        <div className={Styles.MarketTradeHistory__heading}>Trade History</div>
        <div>
          <div className={Styles.MarketTradeHistory__table}>
            <ul className={Styles["MarketTradeHistory__table-header"]}>
              <li>Quantity</li>
              <li>Price</li>
              <li>Time</li>
            </ul>
          </div>
        </div>
        <div className={Styles.MarketTradeHistory__table__data}>
          {groupedTradeHistory &&
            Object.keys(groupedTradeHistory).map(date => (
              <div>
                <div className={Styles.MarketTradeHistory__table}>
                  <ul
                    key={date}
                    className={Styles.MarketTradeHistory__table__header__day}
                  >
                    <li>{groupedTradeHistoryVolume[date]} Shares</li>
                    <li />
                    <li>{date}</li>
                  </ul>
                </div>
                <div className={Styles.MarketTradeHistory__table__price}>
                  {groupedTradeHistory[date].map(priceTime => (
                    <ul
                      key={priceTime.key}
                      className={Styles.MarketTradeHistory__table__trade__data}
                    >
                      <li
                        className={classNames(
                          Styles.MarketTradeHistory__trade__bar,
                          {
                            [Styles.MarketTradeHistory__trade__barNeg]:
                              priceTime.type === SELL
                          }
                        )}
                      />
                      <li>{priceTime.amount}</li>
                      <li
                        className={classNames({
                          [`${Styles.MarketTradeHistory__buy}`]:
                            priceTime.type !== SELL,
                          [`${Styles.MarketTradeHistory__sell}`]:
                            priceTime.type === SELL
                        })}
                      >
                        {priceTime.price}
                        <span
                          className={classNames({
                            [Styles.MarketTradeHistory__trade__indicatorUp]:
                              priceTime.type !== SELL,
                            [Styles.MarketTradeHistory__trade__indicatorDown]:
                              priceTime.type === SELL
                          })}
                        />
                      </li>
                      <li>{priceTime.time}</li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    );
  }
}
