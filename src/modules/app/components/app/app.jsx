// TODO -- this component needs to be broken up
//         all logic related to sidebar(s) need to be housed w/in a separate component

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import classNames from "classnames";

import shouldComponentUpdatePure from "utils/should-component-update-pure";
import debounce from "utils/debounce";

import { tween } from "shifty";
import { isEqual } from "lodash";

import Modal from "modules/modal/containers/modal-view";
import TopBar from "modules/app/components/top-bar/top-bar";
import ForkingAlert from "modules/forking/components/forking-alert/forking-alert";
import AccountInnerNav from "modules/app/components/inner-nav/account-inner-nav";
import ReportingInnerNav from "modules/app/components/inner-nav/reporting-inner-nav";
import SideNav from "modules/app/components/side-nav/side-nav";
import Logo from "modules/app/components/logo/logo";
import Routes from "modules/routes/components/routes/routes";
import AlertsContainer from "modules/alerts/containers/alerts-view";
import PortfolioInnerNav from "modules/app/components/inner-nav/portfolio-inner-nav";

import MobileNavHamburgerIcon from "modules/common/components/mobile-nav-hamburger-icon";
import MobileNavCloseIcon from "modules/common/components/mobile-nav-close-icon";
import MobileNavBackIcon from "modules/common/components/mobile-nav-back-icon";

import NavLogoutIcon from "modules/common/components/nav-logout-icon";
import NavAccountIcon from "modules/common/components/nav-account-icon";
import NavCreateIcon from "modules/common/components/nav-create-icon";
import NavMarketsIcon from "modules/common/components/nav-markets-icon";
import NavPortfolioIcon from "modules/common/components/nav-portfolio-icon";
import { NavReportingIcon } from "modules/common/components/icons";
import { Link } from "react-router-dom";
import makePath from "modules/routes/helpers/make-path";
import parsePath from "modules/routes/helpers/parse-path";
import parseQuery from "modules/routes/helpers/parse-query";

import getValue from "utils/get-value";

import {
  MARKETS,
  ACCOUNT_DEPOSIT,
  ACCOUNT_WITHDRAW,
  ACCOUNT_REP_FAUCET,
  ACCOUNT_UNIVERSES,
  MY_MARKETS,
  MY_POSITIONS,
  FAVORITES,
  CREATE_MARKET,
  PORTFOLIO_REPORTS,
  REPORTING_DISPUTE_MARKETS,
  REPORTING_REPORT_MARKETS,
  REPORTING_RESOLVED_MARKETS,
  DEFAULT_VIEW
} from "modules/routes/constants/views";
import {
  MODAL_NETWORK_CONNECT,
  CATEGORY_PARAM_NAME
} from "modules/common-elements/constants";

import Styles from "modules/app/components/app/app.styles";
import MarketsInnerNavContainer from "modules/app/containers/markets-inner-nav";

export const mobileMenuStates = {
  CLOSED: 0,
  SIDEBAR_OPEN: 1,
  FIRSTMENU_OPEN: 2,
  SUBMENU_OPEN: 3
};

const SUB_MENU = "subMenu";
const MAIN_MENU = "mainMenu";

const navTypes = {
  [MARKETS]: MarketsInnerNavContainer,
  [MY_POSITIONS]: PortfolioInnerNav,
  [PORTFOLIO_REPORTS]: PortfolioInnerNav,
  [ACCOUNT_DEPOSIT]: AccountInnerNav,
  [ACCOUNT_WITHDRAW]: AccountInnerNav,
  [ACCOUNT_REP_FAUCET]: AccountInnerNav,
  [ACCOUNT_UNIVERSES]: AccountInnerNav,
  [REPORTING_DISPUTE_MARKETS]: ReportingInnerNav,
  [REPORTING_REPORT_MARKETS]: ReportingInnerNav,
  [REPORTING_RESOLVED_MARKETS]: ReportingInnerNav
};

export default class AppView extends Component {
  static propTypes = {
    blockchain: PropTypes.object.isRequired,
    coreStats: PropTypes.array.isRequired,
    env: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    initAugur: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    isMobileSmall: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    loginAccount: PropTypes.object.isRequired,
    markets: PropTypes.array.isRequired,
    modal: PropTypes.object.isRequired,
    universe: PropTypes.object.isRequired,
    updateIsMobile: PropTypes.func.isRequired,
    updateIsMobileSmall: PropTypes.func.isRequired,
    updateModal: PropTypes.func.isRequired,
    updateIsAnimating: PropTypes.func.isRequired,
    finalizeMarket: PropTypes.func.isRequired,
    augurNode: PropTypes.string,
    ethereumNodeHttp: PropTypes.string,
    ethereumNodeWs: PropTypes.string,
    useWeb3Transport: PropTypes.bool,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    augurNode: null,
    ethereumNodeHttp: null,
    ethereumNodeWs: null,
    useWeb3Transport: false
  };

  constructor(props) {
    super(props);

    this.state = {
      mainMenu: { scalar: 0, open: false, currentTween: null },
      subMenu: { scalar: 0, open: false, currentTween: null },
      mobileMenuState: mobileMenuStates.CLOSED,
      currentBasePath: MARKETS,
      currentInnerNavType: null,
      isAlertsVisible: false
    };

    this.sideNavMenuData = [
      {
        title: "Markets",
        icon: NavMarketsIcon,
        mobileClick: () =>
          this.setState({ mobileMenuState: mobileMenuStates.FIRSTMENU_OPEN }),
        route: MARKETS
      },
      {
        title: "Create",
        iconName: "nav-create-icon",
        icon: NavCreateIcon,
        route: CREATE_MARKET,
        requireLogin: true,
        disabled: this.props.universe.isForking
      },
      {
        title: "Portfolio",
        iconName: "nav-portfolio-icon",
        icon: NavPortfolioIcon,
        mobileClick: () =>
          this.setState({ mobileMenuState: mobileMenuStates.FIRSTMENU_OPEN }),
        route: MY_POSITIONS,
        requireLogin: true
      },
      {
        title: "Reporting",
        iconName: "nav-reporting-icon",
        icon: NavReportingIcon,
        mobileClick: () =>
          this.setState({ mobileMenuState: mobileMenuStates.FIRSTMENU_OPEN }),
        route: REPORTING_DISPUTE_MARKETS
      },
      {
        title: "Account",
        iconName: "nav-account-icon",
        icon: NavAccountIcon,
        route: ACCOUNT_DEPOSIT,
        requireLogin: true
      },
      {
        title: "Logout",
        iconName: "nav-logout-icon",
        icon: NavLogoutIcon,
        mobileClick: () => props.logout(),
        route: ACCOUNT_DEPOSIT,
        requireLogin: true,
        onlyForMobile: true
      }
    ];

    this.shouldComponentUpdate = shouldComponentUpdatePure;

    this.openSubMenu = this.openSubMenu.bind(this);
    this.handleWindowResize = debounce(this.handleWindowResize.bind(this));
    this.innerNavMenuMobileClick = this.innerNavMenuMobileClick.bind(this);
    this.checkIsMobile = this.checkIsMobile.bind(this);
    this.toggleAlerts = this.toggleAlerts.bind(this);
    this.mainSectionClickHandler = this.mainSectionClickHandler.bind(this);
  }

  componentWillMount() {
    const {
      augurNode,
      env,
      ethereumNodeHttp,
      ethereumNodeWs,
      history,
      initAugur,
      location,
      updateModal,
      useWeb3Transport
    } = this.props;
    initAugur(
      history,
      {
        ...env,
        augurNode,
        ethereumNodeHttp,
        ethereumNodeWs,
        useWeb3Transport
      },
      (err, res) => {
        if (err || (res && !res.ethereumNode) || (res && !res.augurNode)) {
          updateModal({
            type: MODAL_NETWORK_CONNECT,
            isInitialConnection: true
          });
        }
      }
    );

    const currentPath = parsePath(location.pathname)[0];
    this.setState({ currentBasePath: currentPath });

    this.changeMenu(currentPath);
    if (currentPath === MARKETS) {
      const selectedCategory = parseQuery(location.search)[CATEGORY_PARAM_NAME];
      if (selectedCategory) this.toggleMenuTween(SUB_MENU, true);
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);

    this.checkIsMobile();
  }

  componentWillReceiveProps(nextProps) {
    const { isMobile, location, universe } = this.props;
    if (isMobile !== nextProps.isMobile) {
      this.setState({
        mobileMenuState: mobileMenuStates.CLOSED
      });
    }

    if (!isEqual(universe.isForking, nextProps.universe.isForking)) {
      this.sideNavMenuData[1].disabled = nextProps.universe.isForking;
    }

    if (!isEqual(location, nextProps.location)) {
      const lastBasePath = parsePath(location.pathname)[0];
      const nextBasePath = parsePath(nextProps.location.pathname)[0];

      const selectedCategory = parseQuery(nextProps.location.search)[
        CATEGORY_PARAM_NAME
      ];

      if (lastBasePath !== nextBasePath) {
        this.setState({ currentBasePath: nextBasePath });
        this.changeMenu(nextBasePath);
      }

      if (nextBasePath === MARKETS && selectedCategory) {
        this.toggleMenuTween(SUB_MENU, true);
      }
    }
  }

  openSubMenu() {
    this.setState({ mobileMenuState: mobileMenuStates.SUBMENU_OPEN });
  }

  changeMenu(nextBasePath) {
    const { isLogged } = this.props;
    const oldType = this.state.currentInnerNavType
      ? navTypes[this.state.currentBasePath]
      : this.state.currentInnerNavType;
    const newType = navTypes[nextBasePath];

    // Don't show mainMenu/subMenu for Account Summary
    if (newType === AccountInnerNav) {
      return this.toggleMenuTween(SUB_MENU, false, () =>
        this.toggleMenuTween(MAIN_MENU, false)
      );
    }

    if ((newType === AccountInnerNav && !isLogged) || oldType === newType) {
      return;
    }

    const openNewMenu = () => {
      this.setState({ currentInnerNavType: newType });
      if (newType) this.toggleMenuTween(MAIN_MENU, true);
    };

    if (!oldType) {
      openNewMenu();
      return;
    }

    const menuExitPromise = new Promise(resolve => {
      this.toggleMenuTween(MAIN_MENU, false, () => resolve());
    });
    const submenuExitPromise = new Promise(resolve => {
      this.toggleMenuTween(SUB_MENU, false, () => resolve());
    });

    Promise.all([menuExitPromise, submenuExitPromise]).then(() => {
      switch (nextBasePath) {
        case MARKETS:
        case MY_MARKETS:
        case MY_POSITIONS:
        case FAVORITES:
        case REPORTING_DISPUTE_MARKETS:
        case REPORTING_REPORT_MARKETS:
        case REPORTING_RESOLVED_MARKETS:
          openNewMenu();
          break;
        default:
          this.setState({ currentInnerNavType: newType });
          openNewMenu();
      }
    });
  }

  handleWindowResize() {
    this.checkIsMobile();
  }

  checkIsMobile() {
    const { updateIsMobile, updateIsMobileSmall } = this.props;
    // This method sets up the side bar's state + calls the method to attach the touch event handler for when a user is mobile
    // CSS breakpoint sets the value when a user is mobile
    const isMobile =
      (
        window
          .getComputedStyle(document.body)
          .getPropertyValue("--is-mobile") || ""
      ).indexOf("true") !== -1;
    const isMobileSmall =
      (
        window
          .getComputedStyle(document.body)
          .getPropertyValue("--is-mobile-small") || ""
      ).indexOf("true") !== -1;

    updateIsMobile(isMobile);
    updateIsMobileSmall(isMobileSmall);
  }

  toggleAlerts() {
    if (this.props.isLogged) {
      this.setState({
        isAlertsVisible: !this.state.isAlertsVisible
      });
    }
  }

  toggleMenuTween(menuKey, forceOpen, cb) {
    if (getValue(this.state[menuKey], "currentTween.stop"))
      this.state[menuKey].currentTween.stop();

    let nowOpen = !this.state[menuKey].open;
    if (typeof forceOpen === "boolean") nowOpen = forceOpen;

    const setMenuState = newState => {
      this.setState({
        [menuKey]: {
          ...this.state[menuKey],
          ...newState
        }
      });
    };
    const { updateIsAnimating } = this.props;
    const alreadyDone =
      (!nowOpen && this.state[menuKey].scalar === 0) ||
      (nowOpen && this.state[menuKey].scalar === 1);
    if (alreadyDone) {
      if (cb && typeof cb === "function") cb();
      updateIsAnimating(false);
    } else {
      const baseMenuState = { open: nowOpen };
      const currentTween = tween({
        from: { value: this.state[menuKey].scalar },
        to: { value: nowOpen ? 1 : 0 },
        duration: 500,
        easing: "easeOutQuad",
        step: newState => {
          setMenuState(
            Object.assign({}, baseMenuState, { scalar: newState.value })
          );
        }
      }).then(() => {
        updateIsAnimating(false);
        if (cb && typeof cb === "function") cb();
        setMenuState({ locked: false, currentTween: null });
      });
      updateIsAnimating(true);
      setMenuState({ currentTween });
    }
  }

  mobileMenuButtonClick() {
    const menuState = this.state.mobileMenuState;

    switch (menuState) {
      case mobileMenuStates.CLOSED:
        this.setState({ mobileMenuState: mobileMenuStates.SIDEBAR_OPEN });
        break;
      default:
        this.setState({ mobileMenuState: menuState - 1 });
        break;
    }
  }

  mainSectionClickHandler = (e, testSideNav = true) => {
    const stateUpdate = {};
    const { isMobile } = this.props;
    let updateState = false;

    if (
      testSideNav &&
      isMobile &&
      this.state.mobileMenuState !== mobileMenuStates.CLOSED
    ) {
      stateUpdate.mobileMenuState = mobileMenuStates.CLOSED;
      updateState = true;
    }

    if (this.state.isAlertsVisible) {
      stateUpdate.isAlertsVisible = false;
      updateState = true;
    }

    if (updateState) {
      this.setState(stateUpdate);
    }
  };

  innerNavMenuMobileClick() {
    this.setState({ mobileMenuState: mobileMenuStates.SUBMENU_OPEN });
  }

  renderMobileMenuButton(unseenCount) {
    const menuState = this.state.mobileMenuState;

    let icon = null;
    if (menuState === mobileMenuStates.CLOSED)
      icon = <MobileNavHamburgerIcon />;
    else if (menuState === mobileMenuStates.SIDEBAR_OPEN)
      icon = <MobileNavCloseIcon />;
    else if (menuState >= mobileMenuStates.FIRSTMENU_OPEN)
      icon = <MobileNavBackIcon />;

    return (
      <button
        className={Styles["SideBar__mobile-bars"]}
        onClick={() => this.mobileMenuButtonClick()}
      >
        {icon}
      </button>
    );
  }

  render() {
    const {
      blockchain,
      coreStats,
      history,
      isLogged,
      isMobile,
      location,
      loginAccount,
      markets,
      modal,
      universe,
      finalizeMarket,
      isMobileSmall
    } = this.props;
    const s = this.state;

    const { mainMenu, subMenu } = this.state;
    const unseenCount = getValue(this.props, "alerts.unseenCount");
    const currentPath = parsePath(location.pathname)[0];

    const InnerNav = this.state.currentInnerNavType;
    let innerNavMenuMobileClick;
    if (InnerNav === MarketsInnerNavContainer) {
      innerNavMenuMobileClick = this.innerNavMenuMobileClick; // eslint-disable-line prefer-destructuring
    }

    let categoriesMargin;
    let tagsMargin;

    if (!isMobile) {
      if (currentPath === CREATE_MARKET && mainMenu.scalar === 1) {
        // NOTE -- quick patch ahead of larger refactor
        categoriesMargin = -110;
      } else {
        categoriesMargin = -110 + 110 * mainMenu.scalar;
      }

      tagsMargin = 110 * subMenu.scalar;
    }
    // console.log(coreStats);
    return (
      <main>
        <Helmet
          defaultTitle="Decentralized Prediction Markets | Augur"
          titleTemplate="%s | Augur"
        />
        {Object.keys(modal).length !== 0 && <Modal />}
        <div
          className={classNames(Styles.App, {
            [Styles[`App--blur`]]: Object.keys(modal).length !== 0,
            [Styles.windowsScrollBars]: navigator.platform.indexOf("Win") > -1 // Windows Machine, restyle scrollbars
          })}
        >
          <section className={Styles.App__loadingIndicator} />
          <section
            className={Styles.SideBar}
            onClick={e => this.mainSectionClickHandler(e, false)}
            role="presentation"
          >
            <div className={Styles.Logo}>
              <Link to={makePath(DEFAULT_VIEW)}>
                <Logo />
              </Link>
            </div>
            {this.renderMobileMenuButton(unseenCount)}
            <SideNav
              defaultMobileClick={() =>
                this.setState({ mobileMenuState: mobileMenuStates.CLOSED })
              }
              isMobile={isMobile}
              isLogged={isLogged}
              mobileShow={s.mobileMenuState === mobileMenuStates.SIDEBAR_OPEN}
              menuScalar={subMenu.scalar}
              menuData={this.sideNavMenuData}
              currentBasePath={this.state.currentBasePath}
            />
          </section>
          <section className={Styles.Main}>
            <section
              className={classNames(Styles.TopBar, Styles.TopBar__floatAbove)}
              onClick={this.mainSectionClickHandler}
              role="presentation"
            >
              <TopBar
                isMobileSmall={isMobileSmall}
                isLogged={isLogged}
                stats={coreStats}
                unseenCount={unseenCount}
                toggleAlerts={this.toggleAlerts}
                alertsVisible={isLogged && s.isAlertsVisible}
              />
            </section>
            <AlertsContainer
              alertsVisible={isLogged && s.isAlertsVisible}
              toggleAlerts={() => this.toggleAlerts()}
            />
            {universe.forkEndTime &&
              universe.forkEndTime !== "0" &&
              blockchain &&
              blockchain.currentAugurTimestamp && (
                <section className={Styles.TopBar}>
                  <ForkingAlert
                    location={location}
                    universe={universe}
                    currentTime={blockchain.currentAugurTimestamp}
                    doesUserHaveRep={loginAccount.rep > 0}
                    marginLeft={tagsMargin}
                    finalizeMarket={finalizeMarket}
                  />
                </section>
              )}
            <section
              className={Styles.Main__wrap}
              style={{ marginLeft: categoriesMargin }}
            >
              {InnerNav && (
                <InnerNav
                  currentBasePath={this.state.currentBasePath}
                  isMobile={isMobile}
                  location={location}
                  history={history}
                  mobileMenuState={s.mobileMenuState}
                  mobileMenuClick={innerNavMenuMobileClick}
                  subMenuScalar={subMenu.scalar}
                  markets={markets}
                  openSubMenu={this.openSubMenu}
                />
              )}
              {!InnerNav && <div className="no-nav-placehold" />}
              <section
                className={Styles.Main__content}
                style={{
                  marginLeft: tagsMargin
                }}
                onClick={this.mainSectionClickHandler}
                role="presentation"
              >
                <Routes />
              </section>
            </section>
          </section>
        </div>
      </main>
    );
  }
}
