import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import classnames from 'classnames';

import Header from 'modules/app/components/header';
import Footer from 'modules/app/components/footer';
import SideBar from 'modules/app/components/side-bar';
import CoreStats from 'modules/app/components/core-stats';
import Routes from 'modules/app/components/routes';
import ChatView from 'modules/chat/components/chat-view';

import shouldComponentUpdatePure from 'utils/should-component-update-pure';
import handleScrollTop from 'utils/scroll-top-on-change';

export default function (appElement, selectors) {
	render(<AppComponent {...selectors} />, appElement);
}

class AppComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSideBarAllowed: false,
			isSideBarCollapsed: false,
			isChatCollapsed: true,
			doScrollTop: false,
			currentRoute: null
		};

		this.shouldComponentUpdate = shouldComponentUpdatePure;

		this.toggleChat = this.toggleChat.bind(this);
		this.setSidebarAllowed = this.setSidebarAllowed.bind(this);
	}

	componentDidMount() {
		// Checks whether the app is currently in breakpoints 1 or 2 and will auto-hide the side-bar
		if (window.getComputedStyle(this.main).getPropertyValue('will-change') === 'contents') {
			this.main.style.willChange = 'auto'; // reset
			this.toggleSideBar();
		}
	}

	componentDidUpdate() {
		handleScrollTop(this.props.url);
	}

	// Sidebar display related methods
	setSidebarAllowed(isSideBarAllowed) {
		this.setState({ isSideBarAllowed });
	}
	toggleSideBar() {
		this.setState({ isSideBarCollapsed: !this.state.isSideBarCollapsed });
	}

	// chat display
	toggleChat() {
		this.setState({ isChatCollapsed: !this.state.isChatCollapsed });
	}

	render() {
		const p = this.props;
		const s = this.state;

		const navProps = {
			isSideBarAllowed: s.isSideBarAllowed,
			isSideBarCollapsed: s.isSideBarCollapsed,
			toggleSideBar: () => { this.toggleSideBar(); },
			activeView: p.activeView,
			loginAccount: p.loginAccount,
			positionsSummary: p.positionsSummary,
			transactionsTotals: p.transactionsTotals,
			isTransactionsWorking: p.isTransactionsWorking,
			marketsInfo: p.marketsHeader,
			marketsLink: (p.links && p.links.marketsLink) || undefined,
			favoritesLink: (p.links && p.links.favoritesLink) || undefined,
			pendingReportsLink: (p.links && p.links.pendingReportsLink) || undefined,
			transactionsLink: (p.links && p.links.transactionsLink) || undefined,
			authLink: (p.links && p.links.authLink) || undefined,
			accountLink: (p.links && p.links.accountLink) || undefined,
			accountLinkText: (p.loginAccount && p.loginAccount.linkText) || undefined,
			myPositionsLink: (p.links && p.links.myPositionsLink) || undefined,
			portfolioTotals: (p.portfolio && p.portfolio.totals) || undefined
		};

		const sideBarProps = {
			tags: p.tags,
			loginAccount: p.loginAccount
		};

		// NOTE -- A few implementation details:
		// An attention has been paid to avoid JS manipulation of app layout
		// As a result, you'll notice that both the `Header` + `CortStats` components are duplicated -- this is for layout purposes only in order to better preserve responsiveness w/out manual calculations
		// The duplicated components are `visibility: hidden` so that page flow is preserved since the actual elements are pulled from page flow via `position: fixed`
		return (
			<main id="main_responsive_state" ref={(main) => { this.main = main; }}>
				{!!p &&
					<div id="app_container" >
						<div id="app_header">
							<Header {...navProps} />
							<div className={classnames('sub-header', (!p.loginAccount || !p.loginAccount.address) && 'logged-out')} >
								{s.isSideBarAllowed && !s.isSideBarCollapsed &&
									<div className="core-stats-bumper" />
								}
								{p.loginAccount && p.loginAccount.id &&
									<CoreStats coreStats={p.coreStats} />
								}
							</div>
						</div>
						<div id="app_views" >
							<Header {...navProps} />
							<div id="app_view_container">
								{s.isSideBarAllowed && !s.isSideBarCollapsed &&
									<div id="side_bar" >
										<SideBar {...sideBarProps} />
									</div>
								}
								<div id="app_view">
									<div className={classnames('sub-header', (!p.loginAccount || !p.loginAccount.address) && 'logged-out')} >
										{p.loginAccount && p.loginAccount.id &&
											<CoreStats coreStats={p.coreStats} />
										}
									</div>
									<Routes
										{...p}
										setSidebarAllowed={this.setSidebarAllowed}
									/>
								</div>
							</div>
						</div>
						{!s.isChatCollapsed &&
							<ChatView
								{...p.chat.augur}
								toggleChat={() => { this.toggleChat(); }}
							/>
						}
						<button id="chat-button" onClick={() => { this.toggleChat(); }}>
							Chat
						</button>
						<Footer {...navProps} />
					</div>
				}
			</main>
		);
	}
}

AppComponent.propTypes = {
	url: PropTypes.string
};
