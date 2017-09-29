import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { mobileMenuStates } from 'modules/app/components/app/app'

import Styles from 'modules/app/components/inner-nav/inner-nav.styles'

import MenuItem from 'modules/app/components/inner-nav/menu-item'

export default class BaseInnerNav extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    mobileMenuState: PropTypes.number.isRequired,
    subMenuScalar: PropTypes.number.isRequired
  }

  getMainMenuData() {
    return [];
  }

  getSubMenuData() {
    return [];
  }

  render() {
    const showMainMenu = this.props.mobileMenuState >= mobileMenuStates.SUBMENU_OPEN
    const showSubMenu = this.props.mobileMenuState === mobileMenuStates.MAINMENU_OPEN

    let subMenuAnimatedStyle
    if (!this.props.isMobile) {
      subMenuAnimatedStyle = { left: (110 * this.props.subMenuScalar) }
    }

    const dataToItem = (item) => (
      <MenuItem
        isSelected={item.isSelected}
        key={item.label}
        visible={item.visible}
      >
        {item.link &&
          <Link
            to={item.link}
            onClick={item.onClick}
          >
            {item.label}
          </Link>
        }
        {!item.link &&
          <button onClick={item.onClick}>
            {item.label}
          </button>
        }
      </MenuItem>
    );

    return (
      <aside
        className={classNames(
          Styles.InnerNav,
          { [Styles.mobileShow]: showMainMenu }
        )}
      >
        <ul
          className={classNames(
            Styles.InnerNav__menu,
            Styles['InnerNav__menu--submenu'],
            { [Styles['InnerNav__menu--submenu--mobileshow']]: showSubMenu }
          )}
          style={subMenuAnimatedStyle}
        >
          {this.getSubMenuData().map(dataToItem)}
        </ul>
        <ul
          className={classNames(
            Styles.InnerNav__menu, Styles['InnerNav__menu--main']
          )}
        >
          {this.getMainMenuData().map(dataToItem)}
        </ul>
      </aside>
    )
  }
}
