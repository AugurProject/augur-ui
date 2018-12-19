import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Styles from "modules/market/components/common/module-tabs/module-tabs.style";

export default class ModuleTabs extends Component {
  static propTypes = {
    selected: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
      .isRequired
  };

  static defaultProps = {
    selected: 0
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
    e.preventDefault();
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
            [Styles.ModuleTabs__activeTab]: this.state.selected === index
          })}
        >
          <a
            href="#"
            onClick={e => {
              this.handleClick(e, index);
            }}
          >
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className={Styles.ModuleTabs__tab}>
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
      <div className={Styles.ModuleTabs}>
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}
