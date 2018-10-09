import React from "react";
import PropTypes from "prop-types";
import Styles from "modules/modal/components/common/common.styles";
import ModalReview from "modules/modal/components/modal-review";

const ModalClaimTradingProceeds = p => {
  const buttons = [
    {
      label: "cancel",
      action: () => {
        p.closeModal();
      },
      type: "gray"
    },
    {
      label: "confirm",
      action: () => {
        p.closeModal();
        p.claimTradingProceeds(p.winningPosition.id);
      },
      type: "purple"
    }
  ];
  const items = [
    {
      label: "Market",
      value: p.winningPosition.description,
      denomination: ""
    },
    {
      label: "Returns",
      value: p.winningPosition.winnings.toString(),
      denomination: "ETH"
    },
    {
      label: "Gas Cost",
      value: p.gasCost,
      denomination: "ETH"
    }
  ];

  return (
    <section className={Styles.ModalContainer}>
      <ModalReview
        title="Claim Outstanding Returns"
        items={items}
        buttons={buttons}
        canClose
      />
    </section>
  );
};

ModalClaimTradingProceeds.propTypes = {
  closeModal: PropTypes.func.isRequired,
  claimTradingProceeds: PropTypes.func.isRequired,
  winningPosition: PropTypes.object.isRequired
};

export default ModalClaimTradingProceeds;
