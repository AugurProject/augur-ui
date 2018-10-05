import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import CreateMarketPreview from "modules/create-market/components/create-market-preview/create-market-preview";
import CreateMarketForm from "modules/create-market/components/create-market-form/create-market-form";

import Styles from "modules/create-market/components/create-market-view/create-market-view.styles";

const CreateMarketView = p => (
  <section className={Styles.CreateMarketView}>
    <Helmet>
      <title>Create Market</title>
    </Helmet>
    <div>
      <CreateMarketPreview
        newMarket={p.newMarket}
        currentTimestamp={p.currentTimestamp}
        universe={p.universe}
      />
      <CreateMarketForm
        newMarket={p.newMarket}
        updateNewMarket={p.updateNewMarket}
        categories={p.categories}
        meta={p.meta}
        availableEth={p.availableEth}
        availableRep={p.availableRep}
        addOrderToNewMarket={p.addOrderToNewMarket}
        removeOrderFromNewMarket={p.removeOrderFromNewMarket}
        submitNewMarket={p.submitNewMarket}
        isMobileSmall={p.isMobileSmall}
        history={p.history}
        universe={p.universe}
        currentTimestamp={p.currentTimestamp}
        estimateSubmitNewMarket={p.estimateSubmitNewMarket}
        gasPrice={p.gasPrice}
      />
    </div>
  </section>
);

CreateMarketView.propTypes = {
  categories: PropTypes.array.isRequired,
  isMobileSmall: PropTypes.bool.isRequired,
  currentTimestamp: PropTypes.number.isRequired,
  gasPrice: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  newMarket: PropTypes.object.isRequired,
  universe: PropTypes.object.isRequired,
  addOrderToNewMarket: PropTypes.func.isRequired,
  estimateSubmitNewMarket: PropTypes.func.isRequired,
  removeOrderFromNewMarket: PropTypes.func.isRequired,
  submitNewMarket: PropTypes.func.isRequired,
  updateNewMarket: PropTypes.func.isRequired,
  meta: PropTypes.object,
  availableEth: PropTypes.string,
  availableRep: PropTypes.string
};

CreateMarketView.defaultProps = {
  availableEth: "0",
  availableRep: "0"
};

export default CreateMarketView;
