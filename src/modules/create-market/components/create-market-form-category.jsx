import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from 'modules/common/components/input';
import CreateMarketFormInputNotifications from 'modules/create-market/components/create-market-form-input-notifications';

import newMarketCreationOrder from 'modules/create-market/constants/new-market-creation-order';
import { NEW_MARKET_CATEGORY } from 'modules/create-market/constants/new-market-creation-steps';
import { TAGS_MAX_LENGTH } from 'modules/create-market/constants/new-market-constraints';

export default class CreateMarketFormCategory extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    keywords: PropTypes.array.isRequired,
    updateValidity: PropTypes.func.isRequired,
    updateNewMarket: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      warnings: [],
      category: ''
    };

    this.validateForm = this.validateForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentStep !== nextProps.currentStep && newMarketCreationOrder[nextProps.currentStep] === NEW_MARKET_CATEGORY) this.validateForm(nextProps.category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStep !== this.props.currentStep &&
      this.props.currentStep === newMarketCreationOrder.indexOf(NEW_MARKET_CATEGORY)
    ) {
      this.defaultFormToFocus.getElementsByTagName('input')[0].focus();
    }
  }

  validateForm(category) {
    const errors = [];
    const warnings = [];

    if (this.props.keywords.indexOf(category) !== -1) {
      errors.push('Category cannot be the same as a keyword');
    }

    // Error Check
    if (!category.length || errors.length) {
      this.props.updateValidity(false);
      this.props.updateNewMarket({ category: '' });
    } else {
      this.props.updateValidity(true);
      this.props.updateNewMarket({ category });
    }

    // Warnings Check
    if (category.length === TAGS_MAX_LENGTH) warnings.push(`Maximum tag length is: ${TAGS_MAX_LENGTH}`);

    this.setState({ errors, warnings, category });
  }

  render() {
    const p = this.props;
    const s = this.state;

    return (
      <article className={`create-market-form-part ${p.className || ''}`}>
        <div className="create-market-form-part-content">
          <div className="create-market-form-part-input">
            <aside>
              <h3>Event Category</h3>
              <span>Specify the general category of the event the market is for.</span>
            </aside>
            <div className="vertical-form-divider" />
            <form
              ref={(defaultFormToFocus) => { this.defaultFormToFocus = defaultFormToFocus; }}
              onSubmit={e => e.preventDefault()}
            >
              <Input
                type="text"
                value={s.category}
                debounceMS={0}
                maxLength={TAGS_MAX_LENGTH}
                onChange={category => this.validateForm(category)}
              />
              <CreateMarketFormInputNotifications
                errors={s.errors}
                warnings={s.warnings}
              />
            </form>
          </div>
        </div>
      </article>
    );
  }
}
