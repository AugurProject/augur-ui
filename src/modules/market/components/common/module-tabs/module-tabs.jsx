import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ModulePane from "modules/market/components/common/module-tabs/module-pane";
import Styles from "modules/market/components/common/module-tabs/module-tabs.style";

export default class ModuleTabs extends Component {
  static propTypes = {
    selected: PropTypes.number,
    children: PropTypes.arrayOf(ModulePane).isRequired,
    fillWidth: PropTypes.bool,
    fillForMobile: PropTypes.bool,
    id: PropTypes.string
  };

  static defaultProps = {
    selected: 0,
    fillWidth: false,
    fillForMobile: false,
    id: "id"
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleClick(e, index) {
    if (e) e.preventDefault();
    this.setState({
      selected: index
    });
  }

  renderTabs() {
    function labels(child, index) {
      return (
        <li
          key={index}
          className={classNames({
            [Styles.ModuleTabs__activeTab]: this.state.selected === index,
            [Styles.ModuleTabs__activeTabFill]:
              this.state.selected === index && this.props.fillWidth
          })}
        >
          <button
            onClick={e => {
              this.handleClick(e, index);
            }}
          >
            <span
              className={classNames({
                [Styles.ModuleTabs__activeSpanFill]:
                  this.state.selected === index && this.props.fillWidth
              })}
            >
              {child.props.label}
            </span>
          </button>
        </li>
      );
    }
    return (
      <ul
        className={classNames(Styles.ModuleTabs__tab, {
          [Styles.ModuleTabs__tabFill]: this.props.fillWidth,
          [Styles.ModuleTabs__tabFillWidth]:
            this.props.fillWidth || this.props.fillForMobile
        })}
      >
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  renderContent() {
    return (
      <div className={Styles.ModuleTabs__content}>
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  render() {
    return (
      <div className={Styles.ModuleTabs} id={"tabs_" + this.props.id}>
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}
